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

    <card-panel>
        <pagination :total=total :current=current :set-page="query"></pagination>
    </card-panel>
</template>

<script type='text/babel'>
    import Button from '../Button.vue'
    import CardPanel from '../CardPanel'
    import CardReveal from '../CardReveal.vue'
    import Pagination from '../Pagination.vue'
    import {manager} from '../../transform'

    var blog = manager.blog

    export default {
        data() {
            return {
                table:[],
                total: 1,
                current: 1
            }
        },
        methods: {
            add: function() {
                this.$router.go('/blog/add')
            },
            query: function(page) {
                blog.queryList(page)
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
            let ep = this.ep = blog.ep

            ep.on('queryList', data => {
                this.table = data.list
                this.total = data.total
                this.current = data.current
            })

            this.query()
        },
        components: {
            Button,
            CardPanel,
            CardReveal,
            Pagination
        }
    }
</script>
