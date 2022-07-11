<script>
  import { kebabCase } from 'lodash'
  import { style } from '@scribbli-forms'
  import BaseField from './base.svelte'
  
  // Component props
  export let cClass = ''
  export let iClass = ''
  export let label = ''
  export let field

  // Local variables
  const slug = kebabCase(label)
  const props = { cClass, iClass, label, field, slug }
</script>

<BaseField {...props}>
  <input
    slot="input"
    type="text"
    id="{slug}"
    class="{iClass}"
    bind:value={$field.value}
    on:blur={field.validate}
    use:style={{field}} />
</BaseField>

<style>
  .invalid { border: 1px solid red;  }
</style>
