#!/usr/bin/env node
'use strict';
const meow = require('meow');
const boxen = require('boxen');
const chalk = require('chalk');
const ora = require('ora');
const zp = require('simple-zeropad');
const werdinoCli = require('.');

const today = new Date();
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(
	today.getDate()
)}`;

const spinner = ora(`Fetching menu for ${chalk.yellow(todaysItem)}`).start();

const cli = meow(`
	Usage
	  $ werdino-daily
`);

werdinoCli().then(data => {
	const options = cli.input[0];

	const markdown = options === 'md';
	const pad = markdown ? '*' : '';
	const block = markdown ? '>' : '';
	const em = markdown ? '_' : '';

	spinner.succeed();

	console.log();

	const {de, en} = data;
	let str = '';

	if (markdown) {
		console.log(`:uk: :us: Werdino menu for ${todaysItem}\n`);
	}

	de.forEach((item, i) => {
		if (markdown) {
			str += `${block} *${chalk.gray(en[i].title)}*`;
		} else {
			str += boxen(`${chalk.gray(en[i].title)}`, {
				padding: 0,
				margin: 0,
				dimBorder: true
			});
		}

		str += '\n';

		str += chalk.cyan(`${block} ${pad}${en[i].mealTitle}${pad}\n`);
		str += chalk.white(`${block} ${en[i].description}\n`);

		if (!markdown) {
			str += chalk.magenta(` ${pad}${item.mealTitle}${pad}\n`);
			str += chalk.white(` ${item.description}\n`);
		}

		str += chalk.gray(`${block} ${em}${item.price}${em}`);
		str += '\n\n';
	});

	console.log(str);
});
