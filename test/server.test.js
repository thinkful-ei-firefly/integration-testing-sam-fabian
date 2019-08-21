const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../server');

describe('Test /frequency', () => {
  it('should return 400 if empty query', () => {
      return supertest(app)
      .get('/frequency')
      .expect(400);
  });

  it('should return 400 with wrong query', () => {
      return supertest(app)
      .get('/frequency')
      .query({d:'dfsdfsdf'})
      .expect(400);
  });

  it('Test with just one number in query', () => {
      return supertest(app)
      .get('/frequency')
      .query({s:'4'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object');
        }
      );
  });

  it('should return a object with valid query', () => {
      return supertest(app)
      .get('/frequency')
      .query({s:'aaBBAAbbaa'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object');
        }
      );
  });

  it('should return a object with neccesary keys', () => {
      return supertest(app)
      .get('/frequency')
      .query({s:'aaBBAAbbaa'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object').that.to.include.all.keys('unique', 'average', 'highest');
        }
      );
  });

  it('should return a object equal to another', () => {
      const expected = {
        unique: 2,
        average: 5,
        highest: 'a',
        'a': 6,
        'b': 4
      }
      return supertest(app)
      .get('/frequency')
      .query({s:'aaBBAAbbaa'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object').that.eql(expected);
        }
      );
  });

  it('test with mix of numbers and strings', () => {
      const expected = {
        unique: 6,
        average: 2,
        highest: '6',
        '6': 3,
        'a': 1,
        'd': 2,
        's': 2,
        'g': 2,
        '3': 2
      }
      return supertest(app)
      .get('/frequency')
      .query({s:'666addssgg33'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object').that.eql(expected);
        }
      );
  });

  it('test with multiple highest values', () => {
      const expected = {
        unique: 3,
        average: 4,
        highest: 'a',
        'a': 4,
        'b': 4,
        'c': 4
      }
      return supertest(app)
      .get('/frequency')
      .query({s:'aaaabbbbcccc'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(
        res => {
          expect(res.body).to.be.an('object').that.eql(expected);
        }
      );
  });


})

app.listen(8000, () => console.log('Server running..'))
