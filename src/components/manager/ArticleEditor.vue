<template>
    <card-panel>
        <input-group :value.sync='title' label='标题'></input-group>
    </card-panel>


    <tags-editor :tags='tags' :add-tag='addTag' :del-tag='delTag' :alltags='alltags' :new-tag.sync='newTag'></tags-editor>

    <card-panel>
        <pagedown :md-val.sync='content'></pagedown>
        <button text='编辑全文'>&nbps;<button text='全屏'></button>
    </card-panel>

    <card-panel>
        <button class="indigo" @click='submit' text="确定"></button>
    </card-panel>

</template>

<script type="text/babel">
    import EventProxy from 'eventproxy'
    import {manager} from '../../transform'
    import url from '../../const'

    import CardPanel from '../CardPanel'
    import InputGroup from '../InputGroup'
    import Select from '../Select'
    import Textarea from '../Textarea'
    import Button from '../Button'
    import Pagedown from '../PageDown'
    import TagsEditor from './TagsEditor.vue'

    var article = manager.article
    export default {
        data: () => {
            return {
                title: '',
                content: '',
                tags: [],
                alltags: [],
                newTag: ''
            }
        },
        ready() {
            var ep = this.ep = article.ep

            ep.on('queryById', (data) => {
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

            ep.on('update', () => {
                this.$router.go(url.article.VUE_ROOT)
            })

            ep.on('add', () => {
                this.$router.go(url.article.VUE_ROOT)
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
                var id = this.$route.params.id
                this.id = id
                if(this.id) {
                    var ep = this.ep
                    article.queryById({id: id})
                }
            },
            submit() {
                if(this.id) this.update()
                    else this.add()
            },
            add() {
                article.add(this.$data)
            },
            update() {
                article.update(Object.assign({}, this.$data , {id: this.id}))
            },
            addTag(newTag) {
                article.addTag({text: newTag, relatedId: this.id})
            },
            delTag(tagId) {
                article.delTag({tagId: tagId, relatedId: this.id})
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
