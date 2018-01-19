const fn = require('../index.js');

test('exports a promise with menu data', () => {
    expect.assertions(4);
    return fn().then(data => {
      expect(data.en).toBeTruthy();
      expect(data.de).toBeTruthy();

      expect(data.en[0].title).toBe('Yummy');
      expect(data.de[0].title).toBe('Yummy');
    });
})
