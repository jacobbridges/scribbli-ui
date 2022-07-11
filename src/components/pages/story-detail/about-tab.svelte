<script>
  import { createEventDispatcher } from 'svelte'
  import { createMutator } from '@scribbli-client'
  import { STORY_EDIT } from '@scribbli-client/queries'
  import { User } from '@stores/user-store.js'
  import MDEditor from '@cp/md-editor.svelte'

  // Props
  export let story

  // Local variables
  const MODE = {
    VIEW: Symbol('view'),
    EDIT: Symbol('edit'),
  }
  let currentBlurbMode = MODE.VIEW
  let currentRulesMode = MODE.VIEW
  const editStory = createMutator(STORY_EDIT)
  const dispatch = createEventDispatcher()

  // Event handlers
  const handleShowBlurbEditor = () => currentBlurbMode = MODE.EDIT
  const handleCancelBlurbEdit = () => currentBlurbMode = MODE.VIEW
  const handleSaveBlurbChange = () => { /* ... */ }
  const handleShowRulesEditor = () => currentRulesMode = MODE.EDIT
  const handleCancelRulesEdit = () => currentRulesMode = MODE.VIEW
  const handleSaveRulesChange = () => { /* ... */ }
</script>

<h3>About</h3>

{#if currentBlurbMode === MODE.VIEW}
  {#if story.blurb}
    <div>{story.blurb}</div>
  {:else}
    <div class="italics">No description provided.</div>
  {/if}
  {#if $User == story.author.email}
    <div>
      <a href="." on:click|preventDefault={handleShowBlurbEditor}>Edit</a>
    </div>
  {/if}
{:else if currentBlurbMode === MODE.EDIT}
  <MDEditor
    value={story.blurb}
    on:save={handleSaveBlurbChange}
    on:cancel={handleCancelBlurbEdit} />
{/if}

<h3>Characters</h3>

<ul>
  <li>Not implemented yet</li>
</ul>

<h3>Rules</h3>

{#if currentRulesMode === MODE.VIEW}
  {#if story.rules}
    <div>{story.rules}</div>
  {:else}
    <div class="italics">No rules added yet.</div>
  {/if}
  {#if $User == story.author.email}
    <div>
      <a href="." on:click|preventDefault={handleShowRulesEditor}>Edit</a>
    </div>
  {/if}
{:else if currentRulesMode === MODE.EDIT}
  <MDEditor
    value={story.rules}
    on:save={handleSaveRulesChange}
    on:cancel={handleCancelRulesEdit} />
{/if}
