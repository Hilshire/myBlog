<template>
    <card-panel title='tags'>
        <div>
            <br>
            <div class="row">
                <span class="col s1">已有标签：</span>
                <tags :tags=tags :can-close=true :del-tag=delTag></tags>
            </div>
            <div class="row">
                <span class="col s1">全部标签：</span>
                <tags :tags=alltags></tags>
            </div>
            <input-group label='新增标签' :value.sync='newTag' div-class='s9'><button text='添加' @click="addTag(newTag)"></button></input-group>
        </div>
    </card-panel>
</template>
<style>
</style>
<script>
    import CardPanel from './CardPanel.vue'
    import Tags from './Tags.vue'
    import InputGroup from './InputGroup.vue'
    import Button from './Button.vue'

    export default{
        data(){
            return{}
        },
        props: {
            tags: Array,
            alltags: Array,
            addTag: Function,
            delTag: Function,
            newTag: String
        },
        components:{
            CardPanel,
            Tags,
            InputGroup,
            Button,
        }
    }
</script>
