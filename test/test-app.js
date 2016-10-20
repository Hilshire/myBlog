var express = require('express'),
    should = require('should'),
    request = require('supertest')
var app = require('../server'),
    agent = request.agent(app),
    path = require('../src/const.js')



describe('test/app', () => {
    it('should / status 200', (done) => {
        agent.get('/').end((err, res) => {
            res.status.should.equal(200)
            res.text.should.containEql("Hilshire's blog")
            done()
        })
    })
})

describe('test login', () => {
    it('should not success when username is wrong', (done) => {
        agent.post(path.base.LOGIN).send({}).end((err, res) => {
            res.status.should.equal(200)
            res.body.msg.should.equal('No such user')
            done()
        })
    })

    it('should not success when password is wrong', (done) => {
        agent.post(path.base.LOGIN).send({username: 'admin'}).end((err, res) => {
            res.status.should.equal(200)
            res.body.msg.should.equal('Password error')
            done()
        })
    })

    it('should success when username and password is correct', (done) => {
        agent.post(path.base.LOGIN).send({username: 'admin', password: '123456'}).end((err, res) => {
            res.status.should.equal(200)
            res.body.passValidate.should.equal(true)
            done()
        })
    })
})

describe('test blog', () => {
    var id = 999,
        title = 'test',
        content = 'this record was created by mocha test',
        title_update = 'test_update'

    it('should success when add a row', (done) => {
        agent.post(path.blog.ADD).send({
            id: id,
            title:title,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })
    
    it('should contain the test record when query list', (done) => {
        agent.get(path.app.QUERY_BLOG_LIST).end((err, res) => {
            res.status.should.equal(200)
            res.body.should.be.a.Array()
            res.text.should.containEql(title)
            done()
        })
    })

    it('should contain the test content when query by id', (done) => {
        agent.get(path.blog.QUERY_BY_ID).query({id: 999}).end((err, res) => {
            res.status.should.equal(200)
            res.body.content.should.equal(content)
            done()
        })
    })

    it('should success when update', (done) => {
        agent.post(path.blog.UPDATE).send({
            id: id,
            title: title_update,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after update', (done) => {
        agent.get(path.app.QUERY_BLOG_LIST).end((err, res) => {
            res.text.should.containEql(title_update)
            done()
        })
    })

    it('should success when delete', (done) => {
        agent.get(path.blog.DEL).query({
            id: id,
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after delete', (done) => {
        agent.get(path.app.QUERY_BLOG_LIST).end((err, res) => {
            res.text.should.not.containEql(title_update)
            done()
        })
    })

})

describe('test article', () => {
    var id = 999,
        title = 'test',
        content = 'this record was created by mocha test',
        title_update = 'test_update'

    it('should success when add a row', (done) => {
        agent.post(path.article.ADD).send({
            id: id,
            title:title,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should contain the test record when query list', (done) => {
        agent.get(path.app.QUERY_ARTICLE_LIST).end((err, res) => {
            res.status.should.equal(200)
            res.body.should.be.a.Array()
            res.text.should.containEql(title)
            done()
        })
    })

    it('should contain the test content when query by id', (done) => {
        agent.get(path.article.QUERY_BY_ID).query({id: 999}).end((err, res) => {
            res.status.should.equal(200)
            res.body.content.should.equal(content)
            done()
        })
    })

    it('should success when update', (done) => {
        agent.post(path.article.UPDATE).send({
            id: id,
            title: title_update,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after update', (done) => {
        agent.get(path.app.QUERY_ARTICLE_LIST).end((err, res) => {
            res.text.should.containEql(title_update)
            done()
        })
    })

    it('should success when delete', (done) => {
        agent.get(path.article.DEL).query({
            id: id,
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after delete', (done) => {
        agent.get(path.app.QUERY_ARTICLE_LIST).end((err, res) => {
            res.text.should.not.containEql(title_update)
            done()
        })
    })

})

describe('test tips', () => {
    var id = 999,
        title = 'test',
        content = 'this record was created by mocha test',
        title_update = 'test_update'

    it('should success when add a row', (done) => {
        agent.post(path.tips.ADD).send({
            id: id,
            title:title,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should contain the test record when query list', (done) => {
        agent.get(path.app.QUERY_TIPS_LIST).end((err, res) => {
            res.status.should.equal(200)
            res.body.should.be.a.Array()
            res.text.should.containEql(title)
            done()
        })
    })

    it('should contain the test content when query by id', (done) => {
        agent.get(path.tips.QUERY_BY_ID).query({id: 999}).end((err, res) => {
            res.status.should.equal(200)
            res.body.content.should.equal(content)
            done()
        })
    })

    it('should success when update', (done) => {
        agent.post(path.tips.UPDATE).send({
            id: id,
            title: title_update,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after update', (done) => {
        agent.get(path.app.QUERY_TIPS_LIST).end((err, res) => {
            res.text.should.containEql(title_update)
            done()
        })
    })

    it('should success when delete', (done) => {
        agent.get(path.tips.DEL).query({
            id: id,
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after delete', (done) => {
        agent.get(path.app.QUERY_TIPS_LIST).end((err, res) => {
            res.text.should.not.containEql(title_update)
            done()
        })
    })

})

describe('test About', () => {
    agent.get(path.app.QUERY_ABOUT).end((err, res) => {
        var content = 'test',
            origin;
        origin = res.body

        it('should success when change \'about me\'', (done) => {
            agent.post(path.about.UPDATE).send({content: content}).end((err, res) => {
                res.body.should.have.property('success')
                done()
            })
        })

        it('should change after update', (done) => {
            agent.get(path.app.QUERY_ABOUT).end((err, res) => {
                res.text.should.containEql(content)
                done()
            }) 
        })

        agent.post(path.about.UPDATE).send(origin)
    })
})

describe('test banner', () => {
    var id = 999,
        content = 'this record was created by mocha test',
        content_update = 'test_update'

    it('should success when add a row', (done) => {
        agent.post(path.banner.ADD).send({
            id: id,
            content: content
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should contain the test record when query list', (done) => {
        agent.get(path.banner.QUERY_LIST).end((err, res) => {
            res.status.should.equal(200)
            res.body.should.be.a.Array()
            res.text.should.containEql(content)
            done()
        })
    })

    it('should get a banner when query', (done) => {
        agent.get(path.app.QUERY_BANNER).end((err, res) => {
            res.status.should.equal(200)
            res.body.should.have.property('content')
            done()
        })
    })

    it('should success when update', (done) => {
        agent.post(path.banner.UPDATE).send({
            id: id,
            content: content_update
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after update', (done) => {
        agent.get(path.banner.QUERY_LIST).end((err, res) => {
            res.text.should.containEql(content_update)
            done()
        })
    })

    it('should success when delete', (done) => {
        agent.get(path.banner.DEL).query({
            id: id,
        }).end((err, res) => {
            res.body.should.have.property('success')
            done()
        })
    })

    it('should change after delete', (done) => {
        agent.get(path.banner.QUERY_LIST).end((err, res) => {
            res.text.should.not.containEql(content_update)
            done()
        })
    })

})
