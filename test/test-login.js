var express = require('express'),
    should = require('should'),
    request = require('supertest')
var app = require('../server')
var path = require('../src/const')

describe('test login', () => {
    it('should not success when username is wrong', (done) => {
        request(app).post(path.base.LOGIN).send({}).end((err, res) => {
            res.status.should.equal(200)
            res.body.msg.should.equal('No such user')
            done()
        })
    })

    it('should not success when password is wrong', (done) => {
        request(app).post(path.base.LOGIN).send({username: 'admin'}).end((err, res) => {
            res.status.should.equal(200)
            res.body.msg.should.equal('Password error')
            done()
        })
    })

    it('should success when username and password is correct', (done) => {
        request(app).post(path.base.LOGIN).send({username: 'admin', password: '123456'}).end((err, res) => {
            res.status.should.equal(200)
            res.body.passValidate.should.equal(true)
            done()
        })
    })
})



