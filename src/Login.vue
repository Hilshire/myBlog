<template lang="html">
    <div class="container wrapper valign-wrapper row" @keyup.enter="submit">
    <div class="valign col s12">
        <input-group :label="userName.label" :value.sync="userName.value" div-class="s12" div-id="userName"></input-group>
        <input-group :label="passWord.label" :value.sync="passWord.value" div-class="s12" div-id="passWord" type="password"></input-group>
        <button @click="submit" text='Login'></button>
    </div>
    </div>
</template>

<script>
import {login} from './transform'
import InputGroup from './components/InputGroup'
import Button from './components/Button'
export default {
  data: function () {
    return {
        userName: {label: 'userName:', value: ''},
        passWord: {label: 'passWord:', value: ''}
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    submit() {
      login(this.userName.value, this.passWord.value)
    }
  },
  components: {
      InputGroup,
      Button
  }
}

</script>

<style lang="sass">
    html, body {
      height: 100%;
      .wrapper {
        height: 100%;
      }
    }
</style>
