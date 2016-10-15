<template>
    <card>
        <button @click='add' text='新增'></button>
    </card>

    <card>
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
    </card>
</template>

<script type="text/babel">
    import EventProxy from 'eventproxy'
    import Button from '../Button.vue'
    import Card from '../CardPanel'
    import {article} from '../../api'

    export default {
        data() {
            return {
                table:[]
            }
        },
        methods: {
            add: function() {
                this.$router.go('/article/add')
            },
            query: function() {
                var ep = this.ep
                article.queryList(ep)
                ep.on('queryList', data => {
                    this.table = data
                })
            },
            update: function(id) {
                this.$router.go({name: 'updateArticle', params: {id: id}})
            },
            del: function(id) {
                article.del({id: id})
                this.query()
            }
        },
        ready() {
            this.ep = new EventProxy()
            this.query()
        },
        components: {
            Button,
            Card
        }
    }
</script>