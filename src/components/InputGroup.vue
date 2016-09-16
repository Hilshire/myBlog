<template>
  <div class="row">
    <div id="{{divId}}" class="input-field col {{divClass}}">
      <input v-model="value" type={{type}} class="validate">
      <label class={{active}} for={{divId}}>{{label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {},
  props: {
      divClass: {
        type: String,
        default: 's12'
      },
      divId: String,
      value: {
        type: String,
        twoWay: true
      },
      type: {
          type: String,
          default: 'text'
      },
      isActive: {
          type: Boolean,
          default: false
      },
      label: {
          type: String,
          require: true
      },
  }
}
</script>

<style lang="css">
</style>
