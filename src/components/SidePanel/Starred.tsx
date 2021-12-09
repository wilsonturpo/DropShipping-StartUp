import React, { useContext, useEffect, useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
import { ChannelType, IChannel } from '../../models/channels'
import ChannelItem from './ChannelItem'
const Starred = () => {
  const rootStore = useContext(RootStoreContext)
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  )
  const {
    starredChannels,
    setActiveChannel,
    getCurrentChannel,
    loadChannels,
  } = rootStore.channelStore
  const { loadMessages } = rootStore.messageStore
  const changeChannel = (channel: IChannel) => {
    setActiveChannel(channel)
    let currentChannelId = getCurrentChannel()?.id!
    loadMessages(currentChannelId)
    setSelectedChannelId(currentChannelId)
  }

  useEffect(() => {
    loadChannels(ChannelType.Starred)
  }, [loadChannels])
  const displayChannels = (channels: IChannel[]) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <ChannelItem
        key={channel.id}
        channel={channel}
        changeChannel={changeChannel}
        active={selectedChannelId == channel.id}
        getNotificationCount={() => undefined}
      />
    ))
  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> STARRED
          </span>{' '}
          ({starredChannels.length}){' '}
        </Menu.Item>
        {displayChannels(starredChannels)}
      </Menu.Menu>
    </React.Fragment>
  )
}

export default observer(Starred)
