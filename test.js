/* global test, expect */
/* eslint indent:0 */
const fn = require('./index');

test('returns data', () => {
    expect.assertions(2);
    return fn().then(data => {
        expect(data.en).toBeTruthy();
        expect(data.de).toBeTruthy();
    });
});
