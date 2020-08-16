# Reverse Engineer Double Sort

Given doubly-sorted arrays, return a singly-sorted array of unique values.

## Installation

```
npm i reverse-engineer-double-sort
```

## Usage

```javascript
import revSort from 'reverse-engineer-double-sort';

const input = [
  [
    { name: 'Chuck', order: 5 },
    { name: 'Chuck', order: 6 },
    { name: 'Eve', order: 7 },
    { name: 'Oscar', order: 1 },
    { name: 'Oscar', order: 2 },
    { name: 'Dave', order: 4 },
    { name: 'Oscar', order: 8 },
    { name: 'Alice', order: 3 },
    { name: 'Alice', order: 9 },
    { name: 'Faythe', order: 10 }
  ],
  [
    { name: 'Mallory', order: 5 },
    { name: 'Chuck', order: 7 },
    { name: 'Eve', order: 8 },
    { name: 'Chuck', order: 9 },
    { name: 'Dave', order: 3 },
    { name: 'Dave', order: 6 },
    { name: 'Faythe', order: 1 },
    { name: 'Bob', order: 2 },
    { name: 'Bob', order: 4 },
    { name: 'Trent', order: 10 }
  ]
];

const output = revSort(input);

console.log(output);

/*
[
  { value: 'Alice', order: 1 },
  { value: 'Faythe', order: 1 },
  { value: 'Bob', order: 1 },
  { value: 'Trent', order: 1 },
  { value: 'Oscar', order: 2 },
  { value: 'Dave', order: 2 },
  { value: 'Chuck', order: 3 },
  { value: 'Eve', order: 3 },
  { value: 'Mallory', order: 3 }
]
*/
```

It's really hard for me to explain this.

Basically if you have some objects with a `string` property and a `number` property, sorted first by one and then by the other, and you only know how one of the sortings works, and want to discover the other, this may or may not be useful to you.

It's not efficient.

Honestly, it barely works.

But there doesn't appear to be any competition ...