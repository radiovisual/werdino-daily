#!/usr/bin/env node
'use strict';
const meow = require('meow');
const boxen = require('boxen');
const chalk = require('chalk');
const ora = require('ora');
const zp = require('simple-zeropad');
const werdinoCli = require('.');

const today = new Date();
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(today.getDate())}`;

const spinner = ora(`Fetching menu for ${chalk.yellow(todaysItem)}`).start();

const cli = meow(`
	Usage
	  $ werdino-daily
`);

werdinoCli().then(data => {

	var options = cli.input[0];

	const pad = options === 'md' ? '*' : '';

	spinner.succeed();

	console.log();

	const {de, en} = data;
	let str = '';

	de.forEach((item, i) => {
		str += boxen(`${chalk.gray(en[i].title)}`, {padding: 0, margin: 0, dimBorder: true});
		str += '\n\n';

		str += chalk.cyan(`  ${pad}${en[i].mealTitle}${pad}`);
		str += chalk.white(` ${en[i].description}\n`);

		str += chalk.magenta(`  ${pad}${item.mealTitle}${pad}`);
		str += chalk.white(` ${item.description}\n`);

		str += chalk.gray(`  ${item.price}`);
		str += '\n\n';
	});

	console.log(str);
});
