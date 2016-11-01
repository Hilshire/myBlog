<template>
   <div id="tag-list">
      <div class="tag-list-item" v-for='(key, content) in tagList'>
          <p>{{key}}</p>
          <p v-for='item in content'>{{item.title}}</p>
      </div> 
   </div> 
</template>
<script>
import {app} from '../../transform'
export default {
    data() {
        return {
            tagList: []
        }
    },
    ready() {
        let id = this.id = this.$route.params.id,
            ep = this.ep = app.tag.ep

        app.tag.query({id: id})

        ep.on('queryContentByTag', data => {
            this.tagList = data
        })
    }
}
</script>
<style lang="sass">
    
</style>