import React from 'react'
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 800 }}>
        <Segment>
          <Header>
            <Icon name="search" />
             404 - Page Not Found
          </Header>
          <Segment.Inline>
            <Button as={Link} to="/login" primary >
               Return to login page
            </Button>
          </Segment.Inline>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}


export default NotFound