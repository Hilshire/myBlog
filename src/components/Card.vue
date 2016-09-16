<template>
  <div class="row {{class}}">
    <div class="col s12 {{width}}">
      <div class="card-panel {{color}}">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
      class: {
          type: String,
          default: ''
      },
      width: {
          type: String,
          default: 's12'
      },
      color: {
          type: String,
          default: 'white'
      }
  }
}
</script>

<style lang="css">
</style>
