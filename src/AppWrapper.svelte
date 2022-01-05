<!-- Jank method of getting CSRF token into the app -->

<script context="module">
  import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client/core';
  import { appContextQuery } from './query'

  // Create GraphQL client
  const graphqlLink = new HttpLink({ uri: '/server/graphql' })
  const addHeaders = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, 'X-Custom': 'test'  }
    }))
    return forward(operation)
  })
  const client = new ApolloClient({
    link: concat(addHeaders, graphqlLink),
    cache: new InMemoryCache(),
  })

  // Get Scribbli context from backend
  const appContextPromise = client
        .query({query: appContextQuery, fetchPolicy: 'no-cache'})
        .then(result => ({
          universeId: result.data.appContext.universeId,
          csrftoken: result.data.appContext.csrftoken,
          isLoggedIn: result.data.appContext.isLoggedIn,
          userdata: result.data.appContext.userdata,
        }))
  

  // Get CSRF token
  //const csrfTokenPromise = fetch('/server/csrf/')
  //      .then(response => response.text())
  //      .then(text => /value="([A-Za-z0-9]+)"/.exec(text)[1])
</script>

<script>
  import App from './App.svelte'
  import { setClient } from '@scribbli-client'

  setClient(client)
</script>

{#await appContextPromise}
  <p>..loading</p>
{:then appContext}
  <App {appContext} />
{:catch error}
  <p style="color: red">Error</p>
  <pre>{error}</pre>
{/await}
