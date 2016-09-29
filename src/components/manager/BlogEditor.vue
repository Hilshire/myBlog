<template>
    <card>
        <input-group :value.sync='title' label='标题'></input-group>
        <pagedown :md-val='text'></pagedown>
        <button class="indigo" @click='submit' text="确定"></button>
    </card>
</template>

<script lang="babel">
import Card from '../Card'
import InputGroup from '../InputGroup'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'
import Pagedown from '../PageDown'

import {blog} from '../../api'

export default {
    data: () => {
        return {
            title: '',
            text: '',
        }
    },
    ready() {
        this.query()
    },
    methods: {
        query() {
            //这里其实可以用$set，让vue来代理id，但是vue会发出一条警告
            var id = this.$route.params.id
            this.id = id
            if(this.id) {
                blog.queryById({id: id}, this)
            }
        },
        submit() {
            if(this.id) this.update()
                else this.add()
        },
        add() {
            blog.add(this.$router, this.$data)
        },
        update() {
            blog.update(this.$router, Object.assign({}, this.$data , {id: this.id}))
            this.query()
        }
    },
    components: {
        InputGroup,
        Card,
        Textarea,
        Button,
        Pagedown,
    }
}
</script>
