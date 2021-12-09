import ChannelStore from './channelStore'
import UserStore from './userStore'
import { createContext } from 'react'
import { configure} from 'mobx'
import CommonStore from './commonStore'
import MessageStore from './messageStore'
configure({ enforceActions: 'always' })
export class RootStore {
  channelStore: ChannelStore
  userStore: UserStore
  commonStore: CommonStore
  messageStore: MessageStore
  constructor()
  { 
    this.channelStore = new ChannelStore(this)
    this.userStore = new UserStore(this)
    this.commonStore = new CommonStore(this)
    this.messageStore = new MessageStore(this)
  }
}
export const RootStoreContext =  createContext(new RootStore())