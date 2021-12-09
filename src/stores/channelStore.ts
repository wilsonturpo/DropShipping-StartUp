import {
  observable,
  action,
  makeObservable,
  runInAction,
  computed,
  toJS,
} from 'mobx'

import { ChannelType, IChannel, IChannelNotification } from '../models/channels'
import agent from '../api/agent'
import { RootStore } from './rootStore'
import { IMessage } from '../models/messages'

export default class ChannelStore {
  @observable channels: IChannel[] = []
  @observable isModalVisible: boolean = false
  @observable activeChannel: IChannel | null = null
  @observable isChannelLoaded: boolean = false
  @observable starredChannels: IChannel[] = []
  @observable channelNotification: IChannelNotification[] = []
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore
  }

  @action loadChannels = async (channelType: ChannelType) => {
    try {
      this.channels = channelType === ChannelType.Channel ? [] : this.channels
      this.starredChannels =
        channelType === ChannelType.Starred ? [] : this.starredChannels
      var response = await agent.Channels.list(channelType)

      if (channelType == ChannelType.Channel)
        await this.rootStore.messageStore.loadMessages(response[0].id)

      runInAction(() => {
        response.forEach((channel) =>
          channelType === ChannelType.Starred
            ? this.starredChannels.push(channel)
            : this.channels.push(channel),
        )

        this.isChannelLoaded = true
      })
    } catch (err) {
      console.log(err)
    }
  }
  @action showModal = (show: boolean) => {
    this.isModalVisible = show
  }

  @action setActiveChannel = (channel: IChannel) => {
    this.activeChannel = channel
  }

  @action getCurrentChannel = () => {
    if (this.activeChannel !== null) return toJS(this.activeChannel)
    this.activeChannel = this.channels[0]
    return toJS(this.activeChannel)
  }

  @action detail = async (channelId: string): Promise<IChannel> => {
    try {
      return await agent.Channels.detail(channelId)
    } catch (err) {
      throw err
    }
  }

  @action createChannel = async (channel: IChannel) => {
    try {
      await agent.Channels.create(channel)
      runInAction(() => {
        this.channels.push(channel)
      })
    } catch (err) {
      console.log(err)
    }
  }

  @action setChannelStarred = async (channel: IChannel) => {
    try {
      channel.channelType =
        channel.channelType !== ChannelType.Starred
          ? ChannelType.Starred
          : ChannelType.Channel

      await agent.Channels.update(channel)

      await this.loadChannels(ChannelType.Starred)
      await this.loadChannels(ChannelType.Channel)
    } catch (err) {
      throw err
    }
  }

  @action changePrivateChannel = async (userId: string) => {
    try {
      let currentChannel = await agent.Channels.privateChannel(userId)
      runInAction(() => {
        this.setActiveChannel(currentChannel)
      })
    } catch (err) {
      throw err
    }
  }

  @action addNotification = (channelId: string, message: IMessage) => {
    let notification = this.channelNotification.filter((x) => x.id == channelId)

    if (notification.length === 0) {
      this.channelNotification.push({
        id: channelId,
        newMessages: 1,
        sender: message.sender,
      })

      return
    }
    console.log(JSON.stringify(this.channelNotification, undefined, 2))
    notification[0].newMessages = notification[0].newMessages + 1
  }

  @action cleanNotification = (channelId: string) => {
    let notification = this.channelNotification.filter(
      (x) => x.id === channelId,
    )

    if (notification.length !== 0) {
      notification[0].newMessages = 0
    }
  }
}
