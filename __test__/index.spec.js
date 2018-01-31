/* global expect, test */
const fn = require('../index.js');

test('exports a promise with menu data', () => {
	expect.assertions(16);
	return fn().then(data => {
		expect(data.en).toBeTruthy();
		expect(data.de).toBeTruthy();

		expect(data.de[0].title).toBe('Brasserie');
		expect(data.de[0].mealTitle).toBe('Grilliertes Zanderfilet');
		expect(data.de[0].description).toBe(
			'(Russland) mit Joghurtdip und Kräuter auf Quinoa mit Tomaten und Butterbohnen'
		);
		expect(data.de[0].price).toBe('CHF 9.50');

		expect(data.en[0].title).toBe('Brasserie');
		expect(data.en[0].mealTitle).toBe('Grilled Zander Fillet');
		expect(data.en[0].description).toBe(
			'(Russia) with yoghurt dip and herbs on quinoa with tomatoes and butter beans'
		);
		expect(data.en[0].price).toBe('CHF 9.50 | CHF 13.50');

		expect(data.de[1].title).toBe('Grün Und Natürlich');
		expect(data.de[1].mealTitle).toBe('Walliser Chääshörnli');
		expect(data.de[1].description).toBe(
			'mit Petersilie und Raclettekäse dazu Apfelmus'
		);
		expect(data.de[1].price).toBe('CHF 9.50 | CHF 13.50');

		expect(data.de.length).toBe(3);
		expect(data.en.length).toBe(3);
	});
});
