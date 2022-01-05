<script>
  import { link  } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
  
  export let links
</script>

<div class="nav">
  {#each links as link_}
    <a href="{link_.href}" use:link use:active>{link_.title}</a>
  {/each}
</div>

<style>
  .nav {
    display: flex;
  }
  
  a {
    padding: 0.5em  1em;
  }
  a, a:visited, a:hover, a:active {
    color: hsl(206,100%,40%);
  }

  :global(a.active) {
    pointer-events: none;
    cursor: default;
    text-decoration: underline;
    filter: brightness(40%);
  }
</style>
