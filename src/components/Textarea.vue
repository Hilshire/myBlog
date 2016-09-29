<template>
  <div class="input-field col {{width}}">
    <textarea v-model="value" class="materialize-textarea"></textarea>
    <label>{{label}}</label>
  </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: 's12'
        },
        label: {
            type: String,
            require: true
        },
        value: String
    }
}
</script>

<style lang="css">
</style>
