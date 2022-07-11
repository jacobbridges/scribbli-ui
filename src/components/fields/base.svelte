<script>
  // Component props
  export let cClass = '' // container class
  export let label = ''
  export let field
  export let slug
  
  // Local variables

  console.log(field)
</script>

<div class="{cClass}">
  <label for="{slug}">{label}</label>
  <slot name="input"></slot>
  {#if $field.errors}
    <ul>
      {#if $field.errors.includes('required')}
        <li>This is a required field!</li>
      {/if}
    </ul>
  {/if}
</div>
