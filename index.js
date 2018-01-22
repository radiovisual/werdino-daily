'use strict';
const werdino = require('werdino');
const translate = require('google-translate-api');
const condense = require('condense-whitespace');
const titleize = require('titleize');
const zp = require('simple-zeropad');

const today = new Date();

// A key in the form of 2018-01-17
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(today.getDate())}`;

function objectify(text) {
	const parts = text.split('---\n');

	const meals = [];

	parts.forEach(section => {
		const obj = {};

		section.split('\n').forEach(s => {
			const title = '[TITLE] ';
			const price = '[MEAL PRICES] ';
			const descr = '[MEAL DESCRIPTION] ';
			const mealTitle = '[MEAL TITLE] ';

			if (s.indexOf(title) === 0) {
				obj.title = titleize(s.replace(title, ''));
			} else if (s.indexOf(mealTitle) === 0) {
				obj.mealTitle = titleize(s.replace(mealTitle, ''));
			} else if (s.indexOf(descr) === 0) {
				obj.description = s.replace(descr, '');
			} else if (s.indexOf(price) === 0) {
				obj.price = s.replace(price, '');
			}
		});

		if (obj.title && obj.title !== '') {
			meals.push(obj);
		}
	});
	return meals;
}

module.exports = () => {
	let german = '';

	return new Promise(resolve => {
		werdino().then(data => {
			data.forEach(item => {
				const title = condense(item.title);

				german += `[TITLE] ${title}\n`;

				const mealTitle = condense(item.meals[todaysItem].title);
				const mealDescription = condense(item.meals[todaysItem].description);

				german += `[MEAL TITLE] ${mealTitle}\n`;
				german += `[MEAL DESCRIPTION] ${mealDescription}\n`;
				german += `[MEAL PRICES] ${item.meals[todaysItem].prices.map(s => condense(s)).join(' | ')}\n`;
				german += '---\n';
			});

			translate(german).then(translated => {
				resolve({
					de: objectify(german),
					en: objectify(translated.text)
				});
			});
		});
	});
};
