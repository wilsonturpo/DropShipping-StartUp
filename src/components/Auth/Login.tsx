import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../Common/Form/TextInput'
import { RootStoreContext } from '../../stores/rootStore'
import { IUserFormValues } from '../../models/users'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import ErrorMessage  from '../Common/Form/ErrorMessage'

const Login = () => {

  const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
  })
  const rootStore = useContext(RootStoreContext)
  const { login } = rootStore.userStore
  const handleSubmitForm = async (values: IUserFormValues) => {
    return login(values).catch((error) => ({ [FORM_ERROR]: error }))
  }
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to NetChat
        </Header>
        <FinalForm
          onSubmit={handleSubmitForm}
          validate={validate}
          render={({ handleSubmit, submitting, form, submitError}) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
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
                {submitError && (<ErrorMessage error={submitError} text="Invalid email or password" />)}

                <Button color="violet" fluid size="large" disabled={submitting}>
                  Submit
            </Button>
                
           
              </Segment>
            </Form>
          )}>
        </FinalForm>
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
