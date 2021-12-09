import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { UserPanel } from './UserPanel'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import { observer } from 'mobx-react-lite'
import Starred from './Starred'
import { RootStoreContext } from '../../stores/rootStore'
const SidePanel = () => {
  const rootStore = useContext(RootStoreContext)
  const { isChannelLoaded, channels } = rootStore.channelStore
  const { appUserColors } = rootStore.userStore
  const { primaryAppColor } = appUserColors
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: primaryAppColor, fontSize: '1.2rem' }}
    >
      <UserPanel />
      <Starred />
      <Channels />
      {isChannelLoaded && channels.length > 0 && <DirectMessages />}
    </Menu>
  )
}

export default observer(SidePanel)
