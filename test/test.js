'use strict';

import chai from 'chai';
const { expect } = chai;

import revSort from '../index.js';
import sort from '../top-sort.js';

describe('revSort', () => {
  describe('given an array sorted twice', () => {
    it('returns a set sorted once', () => {
      const coinMap = {
        'penny': 1,
        'nickel': 5,
        'dime': 10, 'Roosevelt Dime': 10, 'Mercury Dime': 10,
        'quarter': 25, 'Standing Liberty Quarter': 25,
        'Half Dollar': 50, 'Kennedy Half Dollar': 50,
        'Peace Dollar': 100, 'Morgan Dollar': 100, 'Eisenhower Dollar': 100, 'Silver Eagle': 100, 'Liberty Gold Dollar Type 1': 100, 'Liberty Gold Dollar Type 2': 100, 'Liberty Gold Dollar Type 3': 100,
        'Indian Quarter Eagle': 250, 'Liberty Quarter Eagle': 250,
        'Indian Half Eagle': 500, 'Liberty Half Eagle': 500,
        'Indian Eagle': 1_000, 'Liberty Eagle': 1_000,
        'Saint Gaudens Double Eagle': 2_000, 'Liberty Double Eagle': 2_000
      };
      const coinFaces = Object.keys(coinMap);
      const randomCoin = () => coinFaces[~~(Math.random() * coinFaces.length)];
      const randomCoinObject = (coin, age) => ({ coin, age });
      const sortByValue = ({ coin: a }, { coin: b }) => coinMap[a] - coinMap[b];
      const randomList = () => new Array(10)
        .fill()
        .map(randomCoin)
        .map(randomCoinObject)
        .sort(sortByValue);

      const lists = new Array(100)
        .fill()
        .map(randomList);
      
      const sorted = revSort(lists);
      
      expect(sorted).to.have.deep.members([
        { value: 'Saint Gaudens Double Eagle', order: 1 },
        { value: 'Liberty Double Eagle', order: 1 },
        { value: 'Liberty Eagle', order: 2 },
        { value: 'Indian Eagle', order: 2 },
        { value: 'Liberty Half Eagle', order: 3 },
        { value: 'Indian Half Eagle', order: 3 },
        { value: 'Liberty Quarter Eagle', order: 4 },
        { value: 'Indian Quarter Eagle', order: 4 },
        { value: 'Eisenhower Dollar', order: 5 },
        { value: 'Peace Dollar', order: 5 },
        { value: 'Morgan Dollar', order: 5 },
        { value: 'Liberty Gold Dollar Type 3', order: 5 },
        { value: 'Liberty Gold Dollar Type 1', order: 5 },
        { value: 'Silver Eagle', order: 5 },
        { value: 'Liberty Gold Dollar Type 2', order: 5 },
        { value: 'Half Dollar', order: 6 },
        { value: 'Kennedy Half Dollar', order: 6 },
        { value: 'quarter', order: 7 },
        { value: 'Standing Liberty Quarter', order: 7 },
        { value: 'dime', order: 8 },
        { value: 'Mercury Dime', order: 8 },
        { value: 'Roosevelt Dime', order: 8 },
        { value: 'nickel', order: 9 },
        { value: 'penny', order: 10 }
      ]);
      
    });
  });
});