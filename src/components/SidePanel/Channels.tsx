import React, { useEffect, useContext, useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { ChannelType, IChannel } from '../../models/channels'
import ChannelItem from './ChannelItem'
import ChannelForm from './ChannelForm'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
const Channels = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  )
  const rootStore = useContext(RootStoreContext)
  const {
    channels,
    loadChannels,
    showModal,
    setActiveChannel,
    getCurrentChannel,
    channelNotification,
    cleanNotification,
  } = rootStore.channelStore
  const { loadMessages } = rootStore.messageStore
  const { user } = rootStore.userStore
  useEffect(() => {
    loadChannels(ChannelType.Channel)
  }, [loadChannels, setActiveChannel])

  const changeChannel = (channel: IChannel) => {
    setActiveChannel(channel)
    let currentChannelId = getCurrentChannel()?.id!
    loadMessages(currentChannelId)
    setSelectedChannelId(currentChannelId)
    cleanNotification(currentChannelId)
  }

  const displayChannels = (channels: IChannel[]) => {
    return (
      channels.length > 0 &&
      channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          changeChannel={changeChannel}
          active={selectedChannelId == channel.id}
          getNotificationCount={getNotificationCount}
        />
      ))
    )
  }

  const getNotificationCount = (channel: IChannel) => {
    let count = 0
    channelNotification.forEach((notification) => {
      if (
        notification.id === channel.id &&
        notification.sender.userName !== user?.userName
      ) {
        count = notification.newMessages
      }
    })

    if (count > 0) return count
  }
  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{' '}
          ({channels.length}){' '}
          <Icon name="add" onClick={() => showModal(true)} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>
      <ChannelForm />
    </React.Fragment>
  )
}

export default observer(Channels)
