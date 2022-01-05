<script>
  import { publicNavLinks } from '@stores/nav-store'
  import Nav from '@cp/nav.svelte'
</script>

<div class="layout--public">

  <Nav links={$publicNavLinks} />

  <slot></slot>

</div>
