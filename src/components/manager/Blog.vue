<template>
    <card>
        <button :click='create' text='新增'></button>
    </card>
</template>

<script>
    import Button from '../Button.vue'
    import Card from '../Card'
    export default {
        methods: {
            create() {
                this.$router.go('/blog/add')
            }
        },
        components: {
            Button,
            Card
        }
    }
</script>
