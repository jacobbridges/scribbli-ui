<script>
  import { publicNavLinks } from '@stores/nav-store'
  import Nav from '@cp/nav.svelte'
</script>

<div class="layout--sidebar-public">

  <Nav links={$publicNavLinks} />

  <div class="heading">
    <slot name="heading"></slot>
  </div>

  <div class="flexbox">

    <aside class="sidebar">
      <slot name="sidebar"></slot>
    </aside>

    <div class="main">
      <slot name="main"></slot>
    </div>

  </div>

</div>

<style>
  .layout--sidebar-public {
    padding: 0 1em;
  }
  
  .flexbox {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .sidebar {
    flex-basis: 20rem;
    flex-grow: 1;
  }

  .main {
    flex-basis: 0;
    flex-grow: 999;
    min-width: 75%;
  }
</style>
