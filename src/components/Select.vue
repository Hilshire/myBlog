<template>
<div>
    <label>{{label}}</label>
    <select v-model="value" class="browser-default">
        <option v-for='item in option' value="item.value">item.text</option>
    </select>
</div>
</template>

<script>
export default {
  components: {},
  props: ['label', 'option', 'value']
}
</script>

<style lang="css">
</style>
