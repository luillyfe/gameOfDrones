'use strict';

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised');
const ajv = require("ajv");
const gameSchema = require('../common/game.json')


describe('All feactures', () => {
  var request = supertest('http://localhost:4040/api')

  describe('Feature: The game should be have three required properties: playerOne, playerTwo and winner', () => {
    context('When the user create a new pokemon with the required properties', () => {
      const validate = new ajv().compile(gameSchema);

      it('Then it should be get back the pokemon with its ID', (done) => {
        return request.post('/games')
          .send({"playerOne":"camila", "playerTwo":"jose", "winner":"camila"})
          .expect(200)
          .then((res) => {
            expect( res.body.message ).to.be.equal('Game saved successfully')
            done();
          });
      })
    });
    context('When a request is missing the an required property', () => {
      it('playerOne is a required property', (done) => {
        return request.post('/games')
          .send({"playerTwo":"jose", "winner":"camila"})
          .expect(400)
          .then((res) => {
            expect(res.body[0][0].params.missingProperty).to.equal('playerOne');
            done();
          });
      })
      it('playerTwo is a required property', (done) => {
        return request.post('/games')
          .send({"playerOne":"camila", "winner":"camila"})
          .expect(400)
          .then((res) => {
            expect(res.body[0][0].params.missingProperty).to.equal('playerTwo');
            done();
          });
      })
      it('winner is a required property', (done) => {
        return request.post('/games')
          .send({"playerOne":"camila", "playerTwo":"jose"})
          .expect(400)
          .then((res) => {
            expect(res.body[0][0].params.missingProperty).to.equal('winner');
            done();
          });
      })
      it('Just one player could be the winner', (done) => {
        return request.post('/games')
          .send({"playerOne":"camila", "playerTwo":"jose", "winner":"tatiana"})
          .expect(400)
          .then((res) => {
            expect(res.body[0].message).to.equal('winner should be a player');
            done();
          });
      })
    }); 
  });
}); 