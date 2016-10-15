var express = require('express'),
    should = require('should'),
    request = require('supertest')
var app = require('../server')



describe('test/app', () => {
    it('should / status 200', (done) => {
        request(app).get('/').end((err, res) => {
            res.status.should.equal(200)
            res.text.should.containEql("Hilshire's blog")
            done()
        })
    })
})

describe('Blog.vue', () => {
    it('should get ')
})



