<template>
    <card-panel>
        <button @click='add' text='新增'></button>
    </card-panel>

    <card-panel>
        <table class="bordered striped">
            <thead>
                <tr>
                    <th>标题</th>
                    <th>标签</th>
                    <th>时间</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="table.length === 0"><td  colspan = 8>No Data</td></tr>
                <tr v-for = 'item in table'>
                    <td>{{item.title}}</td>
                    <td></td>
                    <td>{{item.time}}</td>
                    <td>
                        <button text='修改' class='btn-flat' color='indigo-text' @click='update(item.id)'></button>
                        <button text='删除' class='btn-flat' color='indigo-text' @click='del(item.id)'></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </card-panel>
</template>

<script lang='babel'>
    import Button from '../Button.vue'
    import CardPanel from '../CardPanel'
    import CardReveal from '../CardReveal.vue'
    import Tags from '../Tags.vue'
    import {blog} from '../../api'

    let EventProxy = require('eventproxy')

    export default {
        data() {
            this.ep = new EventProxy()
            return {
                table:[]
            }
        },
        methods: {
            add: function() {
                this.$router.go('/blog/add')
            },
            query: function() {
                var ep = this.ep
                blog.queryList(ep)
                ep.on('queryList', data => {
                    this.table = data
                })
            },
            update: function(id) {
                this.$router.go({name: 'updateBlog', params: {id: id}})
            },
            del: function(id) {
                blog.del({id: id})
                this.query()
            }
        },
        ready() {
            this.query()
        },
        components: {
            Button,
            CardPanel,
            CardReveal,
            Tags
        }
    }
</script>
