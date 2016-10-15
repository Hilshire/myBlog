<template>
    <div class="app-prev section">
        <p class="title" v-link="{name: 'article', params: {id: this.id}}">{{title}}</p>
        <p class="time">{{time}}</p>
    </div>
    <div v-if='divider' class="divider"></div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        components:{
        },
        props: {
            'title': String,
            'time': String,
            'id': Number,
            'divider': {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="sass">
</style>
