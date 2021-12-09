import React, { useContext, useState } from 'react'
import {
  Accordion,
  Header,
  Icon,
  List,
  Segment,
  Image,
} from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
import { ChannelType } from '../../models/channels'
export const MetaPanel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const rootStore = useContext(RootStoreContext)
  const { activeChannel, isChannelLoaded } = rootStore.channelStore
  const { userPosts } = rootStore.messageStore
  const setCurrentIndex = (event: any, props: any) => {
    const { index } = props
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const displayTopPosters = (posts: {
    [name: string]: { avatar: string; count: number }
  }) => {
    return Object.entries(posts)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} className="user__posts" />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 2)
  }

  const formatCount = (num: number) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`

  if (activeChannel?.channelType !== ChannelType.Channel) return null
  return (
    <Segment loading={!isChannelLoaded}>
      <Header as="h3" attached="top">
        About # {activeChannel && activeChannel.name}
      </Header>
      <Accordion styled attached="true">
        <Accordion.Title
          onClick={setCurrentIndex}
          active={activeIndex == 0}
          index={0}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel details
        </Accordion.Title>
        <Accordion.Content active={activeIndex == 0}>
          {activeChannel && activeChannel.description}
        </Accordion.Content>
        <Accordion.Title
          onClick={setCurrentIndex}
          active={activeIndex == 1}
          index={1}
        >
          <Icon name="dropdown" />
          <Icon name="user circle" />
          Top Posters
        </Accordion.Title>
        <Accordion.Content active={activeIndex == 1}>
          {userPosts && displayTopPosters(userPosts)}
        </Accordion.Content>
      </Accordion>
    </Segment>
  )
}
export default observer(MetaPanel)
