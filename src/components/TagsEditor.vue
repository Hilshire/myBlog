<template>
    <card-reveal title='tags' cr-title='all tags'>
        <div slot='cardContent'>
            <br>
            <tags :tags=tags :can-close=true></tags>
            <br>
            <input-group label='新增标签'></input-group>
            <button text='添加'></button>
        </div>
        <div slot='cardReveal'>
            <br>
            <tags :tags=alltags></tags>
            <br>
            <button text='添加'></button>
        </div>
    </card-reveal>
</template>
<style>
</style>
<script>
    import CardReveal from './CardReveal.vue'
    import Tags from './Tags.vue'
    import InputGroup from './InputGroup.vue'
    import Button from './Button.vue'

    export default{
        data(){
            return{
            }
        },
        props: ['tags', 'alltags'],
        components:{
            CardReveal,
            Tags,
            InputGroup,
            Button,
        }
    }
</script>
