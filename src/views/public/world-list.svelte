<script>
  import { link, push } from 'svelte-spa-router'
  import { query } from '@scribbli-client'
  import { WORLD_LIST } from '@scribbli-client/queries'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import PublicLayout from '@layouts/public.svelte'

  const worlds = query(WORLD_LIST, {
    variables: { universeId: $scribbliContext.universeId }
  })
</script>

<PublicLayout>

  <button on:click={() => push('/new-world')}>Create New World</button>

  <ul>
    {#if $worlds.loading}
      <li>Loading..</li>
    {:else if $worlds.error}
      <li>ERROR: {$worlds.error.message}</li>
    {:else if $worlds.data}
      {#each $worlds.data.worldList.edges as edge (edge.world.id)}
        <li><a href='/worlds/{edge.world.slug}' use:link>{edge.world.name}</a></li>
      {/each}
    {:else}
      <li>No worlds found</li>
    {/if}
</ul>

</PublicLayout>
