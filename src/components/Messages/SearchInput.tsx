import React from 'react'
import { Header, Input } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
interface IProps {
  handleSearchChange: (event: any) => void
}
export const SearchInput: React.FC<IProps> = ({ handleSearchChange }) => {
  return (
    <Header floated="right">
      <Input
        size="mini"
        icon="search"
        name="searchTerm"
        placeholder="search messages"
        onChange={handleSearchChange}
      ></Input>
    </Header>
  )
}

export default observer(SearchInput)
