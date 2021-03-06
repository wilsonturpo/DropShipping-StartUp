import { computed, observable, action, makeObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { IUser, IUserAppColors, IUserFormValues } from '../models/users'
import { RootStore } from './rootStore'
import { history } from '../index'
import md5 from 'md5'

export default class UserStore {
  @observable user: IUser | null = null
  rootStore: RootStore
  @observable users: IUser[] = []
  @observable isTyping: boolean = false
  @observable appUserColors: IUserAppColors = {
    primaryAppColor: '#4c3c4c',
    secondaryAppColor: '#eee',
  }
  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore
  }

  @computed get IsLoggedIn() {
    return !!this.user
  }

  @action loadUsers = async () => {
    try {
      this.users = []
      const response = await agent.User.list()
      runInAction(() => {
        response.forEach((user) => this.users.push(user))
      })
    } catch (error) {
      throw error
    }
  }

  @action login = async (values: IUserFormValues) => {
    try {
      var user = await agent.User.login(values)

      runInAction(() => {
        this.user = user
        history.push('/')
        this.rootStore.commonStore.setToken(user.token)
      })
    } catch (error) {
      throw error
    }
  }

  @action register = async (values: IUserFormValues) => {
    try {
      values.avatar = `http://gravatar.com/avatar/${md5(
        values.email,
      )}?d=identicon`
      var user = await agent.User.register(values)

      runInAction(() => {
        this.user = user
        history.push('/')
        this.rootStore.commonStore.setToken(user.token)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @action logout = async (id: string) => {
    try {
      await agent.User.logout(id)

      runInAction(() => {
        this.rootStore.commonStore.setToken(null)
        this.user = null
        history.push('/login')
      })
    } catch (error) {
      throw error
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current()
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      throw error
    }
  }

  @action SaveAppColors = async (colors: IUserAppColors) => {
    try {
      const user = await agent.User.UpdateColors(colors)
      runInAction(() => {
        this.user!.primaryAppColor = colors.primaryAppColor
        this.user!.secondaryAppColor = colors.secondaryAppColor
      })
    } catch (error) {
      throw error
    }
  }

  @action SetAppColor = (colors: IUserAppColors) => {
    this.appUserColors = colors
  }
}
