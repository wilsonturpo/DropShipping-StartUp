import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { IUserFormValues } from '../../models/users'
import TextInput from '../Common/Form/TextInput'
import { RootStoreContext } from '../../stores/rootStore'
import {combineValidators, isRequired, matchesField} from 'revalidate'
import { FORM_ERROR } from 'final-form'
import ErrorMessage from '../Common/Form/ErrorMessage'

export const Register = () => {

  const rootStore = useContext(RootStoreContext)
  const { register } = rootStore.userStore
  
  const handleSubmitForm = async (values: IUserFormValues) => {
      return register(values).catch((error) => ({ [FORM_ERROR]: error}))
  }

  const validate = combineValidators({
    username: isRequired('UserName'),
    email: isRequired('Email'),
    password: isRequired('Password'),
    passwordConfirmation: matchesField(
      'password',
      'password Confirmation'
    )({
      message: 'Password do not match'
    })

  })
  
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for NetChat
        </Header>
        <FinalForm
          onSubmit={handleSubmitForm}
          validate={validate}
          render={({ handleSubmit,
                    submitting,
                    submitError,
                    invalid,
                    dirtyFieldsSinceLastSubmit,
                    pristine }) => (
            <Form size="large" onSubmit={handleSubmit} error>
              <Segment stacked>
                <Field
                  name="username"
                  placeholder="Username"
                  type="text"
                  icon="user icon"
                  component={TextInput}
                />
                <Field
                  name="email"
                  placeholder="Email Address"
                  type="text"
                  icon="mail icon"
                  component={TextInput}
                />

                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  icon="lock icon"
                  component={TextInput}
                />

                <Field
                  name="passwordConfirmation"
                  placeholder="Password Confirmation"
                  type="password"
                  icon="lock icon"
                  component={TextInput}
                />
                {submitError && (
                  <ErrorMessage
                    error={submitError}
                    
                  />)}

                <Button
                  color="orange"
                  fluid
                  size="large"
                  disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}>
                  Submit
            </Button>
              </Segment>
            </Form>
          )} />
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
export default Register
