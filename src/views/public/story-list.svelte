<script>
  import { push } from 'svelte-spa-router'
  import { query } from '@scribbli-client'
  import { STORY_LIST } from '@scribbli-client/queries'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import PublicLayout from '@layouts/public.svelte'

  const stories = query(STORY_LIST, {
    variables: { universe: $scribbliContext.universeId }
  })

  // Event handlers -----------------------------------------------------------
  const handleStartBtnClick = () => {
    push('/new-story')
  }
</script>

<PublicLayout>

  <button on:click|preventDefault={handleStartBtnClick}>
    Start Story
  </button>

  <ul>
    {#if $stories.loading}
      <li>Loading..</li>
    {:else if $stories.error}
      <li>ERROR: {$stories.error.message}</li>
    {:else if $stories.data}
      {#each $stories.data.storyList.edges as edge (edge.node.id)}
        <li>{edge.node.name}</li>
      {/each}
    {:else}
      <li>No stories found</li>
    {/if}
  </ul>

</PublicLayout>
