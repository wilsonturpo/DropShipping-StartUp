import React, { useState, useContext } from 'react'
import {
  Button,
  Divider,
  Menu,
  Sidebar,
  Modal,
  Segment,
  Label,
  Icon,
} from 'semantic-ui-react'
import { SliderPicker } from 'react-color'
import { RootStoreContext } from '../../stores/rootStore'
import { IUser, IUserAppColors } from '../../models/users'
import { observer } from 'mobx-react-lite'

interface IState {
  modal?: boolean
  primary?: string
  secondary?: string
}
export const ColorPanel = () => {
  const rootStore = useContext(RootStoreContext)
  const { SaveAppColors, user, SetAppColor } = rootStore.userStore
  const initialState: IState = {
    modal: false,
    primary: '',
    secondary: '',
  }
  const [state, setState] = useState<IState>(initialState)

  const openModal = () => setState({ modal: true })
  const closeModal = () => setState({ modal: false })

  const handleChangePrimary = (color: any) =>
    setState({ primary: color.hex, secondary: state.secondary })

  const handleChangeSecondary = (color: any) =>
    setState({ primary: state.primary, secondary: color.hex })

  const handleSaveColors = async () => {
    if (state.primary && state.secondary) {
      let colors: IUserAppColors = {
        primaryAppColor: state.primary,
        secondaryAppColor: state.secondary,
      }
      await SaveAppColors(colors)
      closeModal()
    }
  }

  const displayUserColors = (user: IUser) => {
    return (
      <React.Fragment>
        <Divider />
        <div className="color__container">
          <div
            className="color__square"
            style={{ background: user.primaryAppColor }}
            onClick={() =>
              SetAppColor({
                primaryAppColor: user.primaryAppColor,
                secondaryAppColor: user.secondaryAppColor,
              })
            }
          >
            <div
              className="color__overlay"
              style={{ background: user.secondaryAppColor }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  const { modal, primary, secondary } = state
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" side="small" color="blue" onClick={openModal} />
      {displayUserColors(user!)}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment inverted>
            <Label content="Primary color"></Label>
            <SliderPicker color={primary} onChange={handleChangePrimary} />
          </Segment>
          <Segment inverted>
            <Label content="Secondary color"></Label>
            <SliderPicker color={secondary} onChange={handleChangeSecondary} />
          </Segment>
          <Modal.Actions>
            <Button color="green" inverted onClick={handleSaveColors}>
              <Icon name="checkmark" /> Save Colors
            </Button>
            <Button color="red" inverted onClick={closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </Sidebar>
  )
}

export default observer(ColorPanel)
