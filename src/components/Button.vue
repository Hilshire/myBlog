<template>
    <a class="waves-effect waves-light btn {{class}} {{color}}">{{text}}</a>
</template>

<script>
    export default {
        props: {
            class:{
                type: String,
                default:''
            },
            color: {
                type: String,
                default: 'indigo'
            },
            text: String,
        }
    }
</script>
