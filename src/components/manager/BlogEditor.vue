<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
    </card-panel>

    <tags-editor :tags='tags' :alltags='alltags' :add-tag='addTag' :del-tag='delTag' :new-tag.sync='newTag'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='content'></pagedown>
        <button text='编辑全文'></button><button text='全屏'></button>
    </card-panel>

    <card-panel>
        <button class="indigo" @click='submit' text="确定"></button>
    </card-panel>
</template>

<script type="text/babel">
import CardPanel from '../CardPanel'
import InputGroup from '../InputGroup'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'
import Pagedown from '../PageDown'
import TagsEditor from '../TagsEditor.vue'

import {manager} from '../../transform'
import url from '../../const'

var EventProxy = require('eventproxy')
var blog = manager.blog

export default {
    data: () => {
        return {
            title: '',
            content: '',
            tags: ['JavaScript'],
            alltags: [],
            newTag: ''
        }
    },
    created() {
        var ep = this.ep = blog.ep

        ep.on('queryById', data => {
            var main = data.main,
                tags = data.tags,
                alltags = data.allTags

            this.title = main.title
            this.content = main.content
            this.tags = tags || []
            this.alltags = alltags || []
            this.newTag = ''

            this.$nextTick(() => {
                Materialize.updateTextFields()
            })
        })

        ep.on('add', () => {
            this.$router.go(url.blog.VUE_ROOT)
        })

        ep.on('update', () => {
            this.$router.go(url.blog.VUE_ROOT)
        })

        ep.on('delTag', () => {
            this.query()
        })

        ep.on('addTag', () => {
            this.query()
        })

        this.query()
    },
    methods: {
        query() {
            //这里其实可以用$set，让vue来代理id，但是vue会发出一条警告
            var id = this.id = this.$route.params.id

            if(id) {
                blog.queryById({id: id})
            }
        },
        submit() {
            if(this.id) this.update()
                else this.add()
        },
        add() {
            blog.add(this.$data)
        },
        update() {
            blog.update({
                id: this.id,
                title: this.title,
                content: this.content,
            })
        },
        addTag(newTag) {
            blog.addTag({text: newTag, relatedId: this.id})
        },
        delTag(tagId) {
            blog.delTag({tagId: tagId, relatedId: this.id})
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
