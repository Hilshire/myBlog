<template>
    <div class="tags app">
        <i class="material-icons left" v-if="tags.length !== 0">label</i>
        <span class='tag' 
              v-for='tag in tags' 
              v-link="{name: 'tag', params: {id: tag.tag_id}}">{{tag.type}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            tags: Array
        }
    }
</script>
<style lang="sass">
        
</style>
