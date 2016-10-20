<template>
    <card>
        <input-group div-id='banner-input' label='content' :value.sync='input' @keyup.enter='add()'></input-group>
        <button text='ADD' @click='add()'></button>
    </card>
    <card>
        <table class="">
            <tbody>
                <tr v-if="table.length === 0"><td  colspan = 8>No Data</td></tr>
                <tr v-for = 'item in table'>
                    <td><input v-on:change='update(item.id, item.content)'
                               :value.sync='item.content'></td>
                    <td>{{item.time}}</td>
                    <td>
                        <button text='删除' class='' color='grey lighten-2 black-text' @click='del(item.id)'></button>
                        <!-- <button text='修改' class='' color='indigo' @click='changeToUpdate(item.id, item.content)'></button> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </card>
</template>
<script>
    import {manager} from '../../transform.js'
    import Card from '../CardPanel'
    import InputGroup from '../InputGroup.vue'
    import Button from '../Button'

    let banner = manager.banner

    export default {
        data() {
            return {
                input: '',
                table: ''
            }
        },
        ready() {
            let ep = this.ep = banner.ep

            ep.on('queryList', result => this.table = result)
            ep.on('add', () => {
                this.query()
                this.input = ''
            })
            ep.on('update', () => this.query())
            ep.on('del', () => this.query())

            this.query()
        },
        methods: {
            query() {
                banner.queryList()
            },
            add() {
                banner.add({content: this.input})
            },
            del(id) {
                banner.del({id: id})
            },
            update(id, content) {
                var data = {
                    id: id,
                    content: content
                }
                
                banner.update(data)
            },
        },
        components: {
            Card,
            InputGroup,
            Button
        }
    }
</script>
