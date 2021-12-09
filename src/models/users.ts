export interface IUser {
  id: string
  userName: string
  email: string
  token: string
  avatar?: string
  isOnline?: boolean
  primaryAppColor: string
  secondaryAppColor: string
}

export interface IUserFormValues {
  userName: string
  email: string
  password: string
  avatar?: string
}

export interface IUserAppColors {
  primaryAppColor: string
  secondaryAppColor: string
}
