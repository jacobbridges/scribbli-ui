<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { query } from '@scribbli-client'
  import { REGION_LIST } from '@scribbli-client/queries'

  // Props
  export let parent

  // Local variables
  const dispatch = createEventDispatcher()
  let regions = query(REGION_LIST, {
    variables: {
      parentId: parent.id,
      level: parent.level + 1,
    }
  })

  // Event handlers
  const handleRegionClick = (region) => () => {
    dispatch('regionClick', { region })
  }
</script>

{#if $regions.data}
  <ul>
    {#each $regions.data.regionList.edges as edge (edge.node.id)}
      <li>
        <a
          href="."
          on:click|preventDefault={handleRegionClick(edge.node)}>
          {edge.node.name}
        </a>
      </li>
    {/each}
  </ul>
{/if}

<style>
</style>
