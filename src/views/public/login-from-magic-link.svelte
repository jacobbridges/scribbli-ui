<script>
  import { push, querystring } from 'svelte-spa-router'
  import { parse } from 'qs'
  import { scribbliContext } from '@src/stores/scribbli-context-store'
  import { User } from '@src/stores/user-store'

  const getParams = parse($querystring)

  const checkToken = async () => {
    if (!getParams?.token) {
      console.log(getParams)
      console.error("no token found")
      throw "no token found"
    }

    if (!getParams?.email) {
      console.log(getParams)
      console.error("no email found")
      throw "no email found"
    }
    
    const resp = await fetch('/server/api/verify-magic-link/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': $scribbliContext.csrftoken,
      },
      body: JSON.stringify({token: getParams.token, email: getParams.email, dev: true})
    })
    const data = await resp.json()

    if (resp.ok) {
      User.signin(data)
      push('/')
    } else {
      console.error(data)
      throw data
    }
  }
  let checkTokenPromise = checkToken()
</script>

{#await checkTokenPromise}
  <p>Logging in...</p>
{:then _}
  <p>Success! Redirecting to home...</p>
{:catch error}
  {#if error["_"]}
    <p style="color:red">{error["_"]}</p>
  {:else}
    <p style="color: red">Login failed!</p>
  {/if}
{/await}
