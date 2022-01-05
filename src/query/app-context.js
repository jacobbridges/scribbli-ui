import { gql } from '@apollo/client/core'

export const appContextQuery = gql`
query {
  appContext {
    csrftoken
    universeId
    isLoggedIn
    userdata {
      email
    }
  }
}
`
