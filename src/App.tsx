import React, { Component, useContext, useEffect } from 'react'
import './App.css'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import SidePanel from './components/SidePanel/SidePanel'
import ColorPanel from './components/ColorPanel/ColorPanel'
import Messages from './components/Messages/Messages'
import MetaPanel from './components/MetaPanel/MetaPanel'
import { RootStoreContext } from './stores/rootStore'
import { LoadingComponent } from './components/LoadingComponent'
import { observer } from 'mobx-react-lite'
const App = () => {
  const rootStore = useContext(RootStoreContext)
  const { setAppLoaded, appLoaded, token } = rootStore.commonStore
  const { getUser } = rootStore.userStore
  const { createHubConnection, stopHubConnection } = rootStore.messageStore
  const { appUserColors } = rootStore.userStore
  const { secondaryAppColor } = appUserColors
  const { isChannelLoaded, channels } = rootStore.channelStore
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }

    createHubConnection()

    return () => {
      stopHubConnection()
    }
  }, [getUser, setAppLoaded, token, appLoaded])

  if (!appLoaded) return <LoadingComponent content="Loading app..." />
  return (
    <Grid
      columns="equal"
      className="app"
      style={{ background: secondaryAppColor }}
    >
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        {isChannelLoaded && channels.length > 0 && <Messages />}
      </Grid.Column>
      <Grid.Column width={4}>
        {isChannelLoaded && channels.length > 0 && <MetaPanel />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(App)
