<template>
    <div class="tags app">
        <i class="material-icons left">label</i><span class='tag' v-for='tag in tags'>{{tag.type}}</span>
    </div>
</template>
<script>
    export default {
        props: ['tags']
    }
</script>
<style lang="sass">
        
</style>