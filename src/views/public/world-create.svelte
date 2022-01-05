<script>
  import { push } from 'svelte-spa-router'
  import { form, field, style, validators } from '@scribbli-forms'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import { createMutator } from '@scribbli-client'
  import { WORLD_CREATE } from '@scribbli-client/queries'
  import PublicLayout from '@layouts/public.svelte'

  let loading = false

  const name = field('name', '', [validators.required()])
  const worldCreateForm = form(name)

  const createWorld = createMutator(WORLD_CREATE)

  const worldCreateHandler = async () => {
    await worldCreateForm.validate()

    if (!$worldCreateForm.valid) return
    
    try {
      loading = true
      const res = await createWorld({
        variables: {
          worldName: $name.value,
          universeId: $scribbliContext.universeId,
        }
      })
      push('/worlds/' + res.data.createWorld.world.slug)
    } catch (error) {
      console.error(error) 
    } finally {
      loading = false
    }
      
  }
</script>

<PublicLayout>

  <h1>Create World</h1>

  <section>
    <div>
      <label for="name">Name</label>
      <input type="text" bind:value={$name.value} on:blur={name.validate} use:style={{field: name}} />
      {#if $name.errors}
        <ul>
        {#if $worldCreateForm.hasError('name.required')}
          <li>Name is required!</li>
        {/if}
        </ul>
      {/if}
    </div>
    <button disabled={!$worldCreateForm.valid} on:click|preventDefault={worldCreateHandler}>Create</button>
  </section>

</PublicLayout>

<style>
  :global(.invalid) {
    border: 1px solid red;
  }
</style>
