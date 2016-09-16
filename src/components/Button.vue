<template>
    <a class="waves-effect waves-light btn {{class}}" @click='click'>{{text}}</a>
</template>

<script>
    export default {
        props: {
            class:{
                type: String,
                default:''
            },
            text: String,
            click: Function
        }
    }
</script>