<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
    </card-panel>

    <tags-editor :tags='tags' :alltags='alltags' :add-tag='addTag' :del-tag='delTag'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='content'></pagedown>
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

var EventProxy = require('eventproxy')

export default {
    data: () => {
        return {
            ep: new EventProxy(),
            title: '',
            content: '',
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
            var id = this.id = this.$route.params.id,
                ep = this.ep

            if(id) {
                blog.queryById({id: id}, ep)

                ep.on('queryById', data => {
                    this.title = data.title
                    this.content = data.content
                    this.tags = data.tags
                    this.$nextTick(() => {
                        Materialize.updateTextFields()
                    })
                })
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
            blog.update(this.$router, {
                id: this.id,
                title: this.title,
                content: this.content,
                contentHTML: this.contentHTML
            })
            this.query()
        },
        tagInit() {
            blog.tagInit({id: this.id}, this)
        },
        addTag(newTag) {
            blog.addTag({text: newTag, blogId: this.id})
        },
        delTag(tag) {
            blog.delTag({TagId})
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
