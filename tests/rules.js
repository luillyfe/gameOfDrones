'use strict';

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised');
const ajv = require("ajv");
const ruleSchema = require('../common/rule.json')
const gameSchema = require('../common/game.json')


describe('All feactures', () => {
  var request = supertest('http://localhost:4040/api')
  var rules = []

  before((done) => {
    return request
      .get("/rules.json")
      .expect(200)
      .then(function (res) {
         rules = res.body
         done()
      });
  });


  describe('Feature: Existent rules should be retrieved with all the mandatory information', () => {
    context('When the GET rules endpoint is invoked', () => {
      const validate = new ajv().compile(ruleSchema);

      it('Then it should get all the expected rules', () => {
        rules.forEach((rule) => {
          expect(validate(rule)).to.be.true;
        })
      });
    });
  });

  describe('Feature: The right moves', () => {
    context('The moves should be one of the required', () => {
      it('PAPER, ROCK, SCISSOR are the only ones movements allowed', () => {
        rules.forEach((rule) => {
          expect(rule.name).to.be.oneOf(['PAPER', 'ROCK', 'SCISSOR'])
        })
      })
    });
  });

}); 