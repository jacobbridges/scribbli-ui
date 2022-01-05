<script>
  import { push } from 'svelte-spa-router'
  import { User } from '@src/stores/user-store'
  import { scribbliContext } from '@src/stores/scribbli-context-store'

  let done = false
  let loading = false
  let email
  let errorMessages = {
    _: [],
    email: [],
  }

  const handleFormSubmit = async () => {
    if (!email) {
      errorMessages = {
        _: [],
        email: ["This is a required field."],
      }
      return
    }

    try {
      loading = true
      const resp = await fetch("/server/api/create-magic-link/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': $scribbliContext.csrftoken,
        },
        body: JSON.stringify({email, dev: true}),
      });
      if (resp.ok) {
        // create notification
        errorMessages = {
          _: [],
          email: [],
        }
        done = true
      } else {
        errorMessages = await resp.json()
      }
    } catch(error) {
      console.log(error)
      errorMessages = {
        _: ["Something went wrong, please try again in a few minutes.."],
        email: [],
      }
    } finally {
      loading = false
    }
  }
</script>

{#if done}
  <div>
    &#x1F389; Check your email for a signin link.
  </div>
{:else}
<div>
  <form on:submit|preventDefault={handleFormSubmit}>
    <div>
      <label for="email">Email</label>
      <input type="text" name="email" bind:value={email} />
      {#if errorMessages.email}
        {#each errorMessages.email as m}
          <li>{m}</li>
        {/each}
      {/if}
    </div>
    <input type="submit" name="submit" value="Sign In" disabled={loading} />
    {#if errorMessages["_"]}
      {#each errorMessages["_"] as m}
        <li>{m}</li>
      {/each}
    {/if}
  </form>
</div>
{/if}
