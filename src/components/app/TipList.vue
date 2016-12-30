<template>
    <div class='container'>
        <tip v-for='tip in tips'
                   :title='tip.title' :time='tip.time' :id='tip.id' :content='tip.content'
                   :divider='$index !== tips.length - 1'></tip>
        <p class="error" v-if="!hasContent">这里什么都没有哦。</p>
        <pagination :total=total :current=current :set-page="query"></pagination>
    </div>
</template>

<script type="text/babel">
    import Tip from './Tip.vue'
    import Pagination from '../Pagination.vue'
    import {app} from '../../transform.js'
    import * as utils from '../../utils.js'

    let tips = app.tips

    export default {
        data() {
           return {
               tips: [],
               hasContent: true,
               total: 1,
               current: 1
           }
        },
        ready() {
            var ep = this.ep = tips.ep

            ep.on('queryList', result => {
                this.tips = result.list
                this.total = result.total
                this.current = result.current

                this.$nextTick(() => {
                    // utils.highLight()
                    this.hasContent = utils.hasContent(result.list)
                })
            })

            this.query()
        },
        methods: {
            query(page) {
                tips.queryList(page)
            }
        },
        components: {
           Tip,
           Pagination
        }
    }
</script>
