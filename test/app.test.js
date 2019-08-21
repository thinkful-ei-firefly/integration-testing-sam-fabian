const app = require('../app');
const {expect} = require('chai');
const supertest = require('supertest');

describe('sort list', () => {
  it('should sort the list in ascending order', () => {
    const arr = [1, 5, 3, 0, 7, -1];
    const sorted = app(arr);
    const expectedArr = [-1, 0, 1, 3, 5, 7]
    expect(sorted).to.be.an('array')
    .that.deep.equal(expectedArr);
  })
  it('should work with decimals', () => {
    const arr = [1.1, 2.2, 1.3, .9]
    const expectedArr = [.9, 1.1, 1.3, 2.2]
    expect(app(arr)).to.eql(expectedArr);
  })
  it('should work with strings', () => {
    const arr = ['apple', 'pear', 'banana'];
    const expectedArr = ['apple', 'banana', 'pear'];
    expect(app(arr)).to.deep.equal(expectedArr);
  })
  it('should work with a mix of numbers and words', () => {
    const arr = [1, 'pear', 'banana'];
    const expectedArr = [1, 'banana', 'pear'];
    expect(app(arr)).to.deep.equal(expectedArr);
  })
  it('should work with duplicate values', () => {
    const arr = [1, 1, 2, 0, 2];
    const expectedArr = [0, 1, 1, 2, 2];
    expect(app(arr)).to.deep.equal(expectedArr);
  })
  it('should work with any number of values', () => {
    const arr1 = [1, 1];
    const expectedArr1= [1, 1];
    const arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,14,13];
    const expectedArr2= [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    expect(app(arr1)).to.deep.equal(expectedArr1);
    expect(app(arr2)).to.deep.equal(expectedArr2);
  })
})
