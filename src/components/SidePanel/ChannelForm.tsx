import React, { ChangeEvent, useContext, useState } from 'react'
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react'
import { ChannelType, IChannel } from '../../models/channels'
import { v4 as uuid } from 'uuid'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
const ChannelForm: React.FC = () => {
  const initialChannel = {
    id: '',
    name: '',
    description: '',
    channelType: ChannelType.Channel,
  }
  const [channel, setChannel] = useState<IChannel>(initialChannel)
  const rootStore = useContext(RootStoreContext)
  const { isModalVisible, showModal, createChannel } = rootStore.channelStore
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setChannel({ ...channel, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    let newChannel = {
      ...channel,
      id: uuid(),
    }
    createChannel(newChannel)
    showModal(false)
  }
  return (
    <Modal basic open={isModalVisible}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              fluid
              label="Channel Name"
              onChange={handleInputChange}
              name="name"
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              label="Description"
              onChange={handleInputChange}
              name="description"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="green" onClick={() => handleSubmit()} inverted>
          <Icon name="checkmark" /> Add
        </Button>
        <Button color="red" inverted onClick={() => showModal(false)}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default observer(ChannelForm)
