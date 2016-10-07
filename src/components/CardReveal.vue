<template>
    <div class="card {{class}}">
        <div class="card-image waves-effect waves-block waves-light">
            <img v-if='img' class="activator" :src="img">
        </div>
        <div class="card-content">
            <span v-if="title" class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
            <slot name='cardContent'></slot>
        </div>
        <div class="card-reveal">
            <span v-if='crTitle' class="card-title grey-text text-darken-4">{{crTitle}}<i class="material-icons right">close</i></span>
            <slot name='cardReveal'></slot>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {}
        },
        components:{
        },
        props: {
            class: {
                type: String,
                default: ''
            },
            img: String,
            title: {
                type: String
            },
            crTitle: {
                type: String,
                difault: ''
            }
        }
    }
</script>
