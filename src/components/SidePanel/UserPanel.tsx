import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Grid, Header, Icon, Message, Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

export const UserPanel = () => {
  const rootStore = useContext(RootStoreContext)
  const { user, logout, IsLoggedIn } = rootStore.userStore
  const { appUserColors } = rootStore.userStore
  const { primaryAppColor } = appUserColors
  const dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Logged as: <strong>{user?.email}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: 'avatar',
      text: <span>Change avatar</span>,
      disabled: true,
    },
    {
      key: 'signout',
      text: <span onClick={() => logout(user?.id!)}>Sign out</span>,
    },
  ]
  return (
    <Grid style={{ background: primaryAppColor, margin: 0 }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>NetChat</Header.Content>
          </Header>
        </Grid.Row>
        <Header style={{ padding: '0.25em' }} as="h4" inverted>
          {IsLoggedIn && user ? (
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={
                      user.avatar ??
                      'http://www.gravatar.com/avatar/?=identicon'
                    }
                    spaced="right"
                    avatar
                  />
                  {user?.userName}
                </span>
              }
              options={dropdownOptions()}
            ></Dropdown>
          ) : (
            <Message>
              Don't han an account? <Link to="/register">Register</Link>
            </Message>
          )}
        </Header>
      </Grid.Column>
    </Grid>
  )
}
