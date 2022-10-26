const { getPerfectCycles, checkCycleValidity } = require('../src/cycler.js')

let list1, list2, list3, list4, json;

beforeAll(async () => {
  // Initializing all the assertion variables. If any global resources were needed, they'd be initialized here.
  list1 = [1, 2, 3];
  list2 = [0, 2, 5];
  list3 = [3, 0, 1, 2];
  list4 = [2, 0, 1]
  json = {
    "list1": list1,
    "list2": list2,
    "list3": list3,
    "list4": list4
  }

});

// afterAll(async () => {
// If any open resources existed, they'd be closed here.
// });

describe('individual arrays', () => {
  test('list1 = [1, 2, 3] -> returns: false', () => {
    let result = checkCycleValidity(list1);
    expect(result).toEqual(false);
  });

  test('list2 = [0, 2, 5] -> returns: false', () => {
    let result = checkCycleValidity(list2);
    expect(result).toEqual(false);
  });

  test('list3 = [3, 0, 1, 2] -> returns: true', () => {
    let result = checkCycleValidity(list3);
    expect(result).toEqual(true);
  });

  test('list4 = [2, 0, 1] -> returns: true', () => {
    let result = checkCycleValidity(list4);
    expect(result).toEqual(true);
  });

});

describe('arrays in a json', () => {
  test('json -> returns: \n{\n\t"list1": false, \n\t"list2": false, \n\t"list3": true, \n\t"list4": true\n}', () => {
    let result = getPerfectCycles(json);
    expect(result).toEqual({
      "list1": false,
      "list2": false,
      "list3": true,
      "list4": true
    })
  })
})