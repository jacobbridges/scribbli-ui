<script>
  import { createEventDispatcher } from 'svelte'
  import { User } from '@stores/user-store.js'
  import MDEditor from '@cp/md-editor.svelte'
  import { createMutator } from '@scribbli-client'
  import { REGION_EDIT_BLURB } from '@scribbli-client/queries'
  
  // Props
  export let region

  // Local variables
  const MODE = {
    VIEW: Symbol('view'),
    EDIT: Symbol('edit'),
  }
  let currentBlurbMode = MODE.VIEW
  const editRegionBlurb = createMutator(REGION_EDIT_BLURB)
  const dispatch = createEventDispatcher()

  // Handlers
  const handleShowBlurbEditor = () => {
    currentBlurbMode = MODE.EDIT
  }
  const handleBlurbCancel = () => {
    currentBlurbMode = MODE.VIEW
  }
  const handleBlurbSave = async (e) => {
    const blurb = e.detail.value
    if (blurb == region.blurb) {
      // nothing to save
      handleBlurbCancel()
      return
    }
    
    try {
      const res = await editRegionBlurb({
        variables: {
          regionId: region.id,
          blurb,
        }
      })
      dispatch('regionChange', {})
    } catch(e) {
      console.error(e)
    } finally {
      currentBlurbMode = MODE.VIEW
    }
  }
</script>

<h3>About</h3>

{#if currentBlurbMode === MODE.VIEW}
  {#if region.blurb}
    <div>{region.blurb}</div>
  {:else}
    <div class="italics">No description provided.</div>
  {/if}
  {#if $User == region.author.email}
    <div>
      <a href="." on:click|preventDefault={handleShowBlurbEditor}>Edit</a>
    </div>
  {/if}
{:else if currentBlurbMode === MODE.EDIT}
  <MDEditor
    value={region.blurb}
    on:save={handleBlurbSave}
    on:cancel={handleBlurbCancel} />
{/if}

<style>
  h3 { margin-top: 0; }
  .italics { font-style: italic; }
</style>
