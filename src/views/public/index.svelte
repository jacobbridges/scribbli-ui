<script>
  import { onDestroy } from 'svelte'
  import { link } from 'svelte-spa-router'

  import { User } from '@stores/user-store'
  import PublicLayout from '@layouts/public.svelte'

  let user
  const unUser = User.subscribe(v => user = v)
  
  onDestroy(unUser)

  $: isLoggedIn = !!user

  let loginStatus
  
  const checkLoginStatus = async () => {
    const res = await fetch("/server/home/")
    const text = await res.text()

    console.log(text)
    if (text.includes("Hello World")) {
      loginStatus = "Nope"
    } else {
      loginStatus = "Yup"
    }
  }

</script>

<PublicLayout>

  <h1>Hello {isLoggedIn ? $User : "World"}</h1>

  {#if isLoggedIn}
    <a on:click={() => User.signout()}>Sign Out</a>
  {:else}
    <a href="/login" use:link>Sign In</a>
  {/if}

  <button on:click={checkLoginStatus}>Check login status</button>

  {#if loginStatus}
    <p>{loginStatus}</p>
  {/if}

</PublicLayout>
