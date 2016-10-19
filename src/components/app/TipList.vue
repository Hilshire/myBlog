<template>
    <div class='container'>
        <tip v-for='tip in tips'
                   :title='tip.title' :time='tip.time' :id='tip.id' :content='tip.content'
                   :divider='$index !== tips.length - 1'></tip>
        <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
    </div>
</template>

<script type="text/babel">
    import Tip from './Tip.vue'
    import {app} from '../../transform.js'

    let tips = app.tips

    export default {
        data() {
           return {
               tips: [],
               hasContent: true
           }
        },
        ready() {
            var ep = this.ep = tips.ep

            ep.on('queryList', result => {
                this.tips = result
                this.$nextTick(() => {
                    if(result.length === 0) this.hasContent = false
                        else this.hasContent = true
                })
            })

            this.query()
        },
        methods: {
            query() {
                tips.queryList()
            }
        },
        components: {
           Tip,
        }
    }
</script>
