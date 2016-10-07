<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
    </card-panel>

    <tags-editor :tags='tags' :alltags='alltags'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='text'></pagedown>
        <button text='编辑全文'></button><button text='全屏'></button>
    </card-panel>

    <card-panel>
        <button class="indigo" @click='submit' text="确定"></button>
    </card-panel>
</template>

<script lang="babel">
import CardPanel from '../CardPanel'
import InputGroup from '../InputGroup'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'
import Pagedown from '../PageDown'
import TagsEditor from '../TagsEditor.vue'

import {blog} from '../../api'

export default {
    data: () => {
        return {
            title: '',
            text: '',
            tags: ['JavaScript'],
            alltags: ['js']
        }
    },
    ready() {
        this.query()
//        $('pre code').each(function(i, block) {
//            hljs.highlightBlock(block);
//        });
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
        CardPanel,
        Textarea,
        Button,
        Pagedown,
        TagsEditor,
    }
}
</script>

<style media="screen">
    .pagedown + a {
        margin-right: 20px;
    }
</style>
