<script>
  import { User } from '@stores/user-store.js'
  import MDEditor from '@cp/md-editor.svelte'
  
  export let world

  const handleWorldBlurbChange = (value) => {
    console.log(value)
  }
</script>

<h2>About</h2>

{#if world.blurb}
  {world.blurb}
{:else}
  {#if $User == world.author.email}
    <MDEditor callback={handleWorldBlurbChange} value={'Nothing to see here'}/>
  {:else}
    <p class="italics">
      No world description provided.
    </p>
  {/if}
{/if}

<style>
  .italics {
    font-style: italic;
  }
</style>
