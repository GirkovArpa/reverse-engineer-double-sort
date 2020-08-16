'use strict';

import sort from './top-sort.js';

export default function revSort(lists, debug = false) {
  lists = JSON.parse(JSON.stringify(lists));
  const rankings = {};
  const newRanking = () => ({ inferiors: new Set, superiors: new Set });
  lists.forEach(list => list.forEach((o, i) => {
    const string = Object.values(o).filter(v => typeof v == 'string')[0];
    const number = Object.values(o).filter(v => typeof v == 'number')[0];
    list[i] = { coin: string, age: number };
  }));
  lists.forEach(list => list.forEach(({ coin }) => rankings[coin] = newRanking()));
  const faces = Object.keys(rankings);
  lists.forEach(list => {
    const coins = Object.entries(list);
    for (const [orderA, { coin: coinA, age: ageA }] of coins) {
      for (const [orderB, { coin: coinB, age: ageB }] of coins) {
        if ((+orderA < +orderB) && (+ageA > +ageB)) {
          for (const [orderC, { coin: coinC, age: ageC }] of coins.slice(orderB)) {
            rankings[coinA].superiors.add(coinC);
          }
        }
        if ((+orderA > +orderB) && (+ageA < +ageB)) {
          rankings[coinA].inferiors.add(coinB);
          for (const [orderC, { coin: coinC, age: ageC }] of coins.slice(0, orderB)) {
            rankings[coinA].inferiors.add(coinC);
          }
        }
      }
    }
  });

  faces.forEach(coinA => {
    faces.forEach(coinB => {
      if (rankings[coinA].inferiors.has(coinB)) {
        rankings[coinB].superiors.add(coinA);
        rankings[coinB].inferiors.forEach(inferior => rankings[coinA].inferiors.add(inferior));
      }
      if (rankings[coinB].inferiors.has(coinA)) {
        rankings[coinA].superiors.add(coinB);
        rankings[coinA].inferiors.forEach(inferior => rankings[coinB].inferiors.add(inferior));
      }
      if (rankings[coinA].superiors.has(coinB)) {
        rankings[coinB].inferiors.add(coinA);
        rankings[coinB].superiors.forEach(superior => rankings[coinA].superiors.add(superior));
      }
      if (rankings[coinB].superiors.has(coinA)) {
        rankings[coinA].inferiors.add(coinB);
        rankings[coinA].superiors.forEach(superior => rankings[coinB].superiors.add(superior));
      }
    });
  });

  const sorted = sort(faces, rankings);

  if (debug) {
    for (const [i, { value: A, order: a }] of Object.entries(sorted)) {
      for (const [j, { value: B, order: b }] of Object.entries(sorted)) {
        if (a < b) {
          if (!rankings[A].inferiors.has(B)) {
            console.log('uncertain:', B, '[below]', A);
          }
        }
        if (a > b) {
          if (!rankings[A].superiors.has(B)) {
            console.log('uncertain:', B, '[above]', A);
          }
        }
      }
    }
  }

  return sorted;
}