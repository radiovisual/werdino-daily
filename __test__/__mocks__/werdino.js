const zp = require('simple-zeropad');

const today = new Date();
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(
	today.getDate()
)}`;
const otherItem = `${today.getFullYear() + 1}-${zp(today.getMonth() + 1)}-${zp(
	today.getDate()
)}`;

console.log(todaysItem);
module.exports = () =>
	Promise.resolve([
		{
			title: 'Brasserie',
			meals: {
				[todaysItem]: {
					title: 'Grilliertes Zanderfilet',
					description:
						'(Russland) mit Joghurtdip und Kräuter auf Quinoa mit Tomaten und Butterbohnen',
					prices: ['CHF 9.50', 'CHF 13.50']
				},
				[otherItem]: {
					title: 'Rindfleischvogel (Schweiz)',
					description: 'mit Kräuterjus, Ofenkartoffeln und Apfel-Rotkraut',
					prices: ['CHF 9.50', 'CHF 13.50']
				}
			}
		},
		{
			title: 'Grün und natürlich',
			meals: {
				[todaysItem]: {
					title: 'Walliser Chääshörnli',
					description: 'mit Petersilie und Raclettekäse dazu Apfelmus',
					prices: ['CHF 9.50', 'CHF 13.50']
				},
				[otherItem]: {
					title: 'Jurasischer Risotto',
					description:
						'mit Lauch und Tête de Moine garniert mit Friséesalat,  Baumnüssen und Apfel',
					prices: ['CHF 9.50', 'CHF 13.50']
				}
			}
		},
		{
			title: 'Feuer und Flamme',
			meals: {
				[todaysItem]: {
					title: 'Grilliertes Schweinssteak',
					description:
						'(Schweiz) mit Schalotten-Senf- Butter, Weisse Polenta und Peperonata',
					prices: ['CHF 13.50', 'CHF 17.50']
				},
				[otherItem]: {
					title: 'Lammfilet (Neuseeland)',
					description:
						'mit Knoblauch-Thymiansauce, feine Nudeln mit Mohn und Mini-Karotten',
					prices: ['CHF 10.00', 'CHF 14.00']
				}
			}
		}
	]);
