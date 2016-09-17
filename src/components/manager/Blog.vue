<template>
    <card>
        <button :click='create' text='新增'></button>
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
                <tr v-for = 'item in table'>
                    <td>{{item.title}}</td>
                    <td></td>
                    <td>{{item.time}}</td>
                    <td>
                        <button text='修改' class='btn-flat' color='indigo-text'></button>
                        <button text='删除' class='btn-flat' color='indigo-text'></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </card>
</template>

<script>
    import Button from '../Button.vue'
    import Card from '../Card'
    import {blog} from '../../api'
    export default {
        data() {
            return {
                table:[]
            }
        },
        methods: {
            create() {
                this.$router.go('/blog/add')
            }
        },
        ready() {
            blog.queryList(this)
        },
        components: {
            Button,
            Card
        }
    }
</script>
