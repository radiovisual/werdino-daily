const werdino = require('werdino')
const translate = require('google-translate-api')
const condense = require('condense-whitespace')
const getDayKey = require('./helpers/getDayKey')
const todaysItemKey = getDayKey();

function objectify (text) {
  const parts = text.split('---\n')

  const meals = []

  parts.forEach(section => {
    const obj = {}

    section.split('\n').forEach(s => {
      const title = '[TITLE] '
      const price = '[MEAL PRICES] '
      const descr = '[MEAL DESCRIPTION] '
      const mealTitle = '[MEAL TITLE] '

      if (s.indexOf(title) === 0) {
        obj.title = s.replace(title, '')
      } else if (s.indexOf(mealTitle) === 0) {
        obj.mealTitle = s.replace(mealTitle, '')
      } else if (s.indexOf(descr) === 0) {
        obj.description = s.replace(descr, '')
      } else if (s.indexOf(price) === 0) {
        obj.price = s.replace(price, '')
      }
    })

    if (obj.title && obj.title !== '') {
      meals.push(obj)
    }
  })
  return meals
}

const getWerdinoData = () => {
  let german = ''

  return new Promise(resolve => {
    werdino().then(data => {
      data.forEach(item => {
        // Don't break the JSON formatting when a single quote is present
        const title = condense(item.title)

        german += `[TITLE] ${title}\n`

        const mealTitle = condense(item.meals[todaysItemKey].title)
        const mealDescription = condense(item.meals[todaysItemKey].description)

        german += `[MEAL TITLE] ${mealTitle}\n`

        if (mealDescription) {
          german += `[MEAL DESCRIPTION] ${mealDescription}\n`
        }

        german += `[MEAL PRICES] ${item.meals[todaysItemKey].prices
          .map(s => condense(s))
          .join(' | ')}\n`
        german += '---\n'
      })

      translate(german).then(translated => {
        const germanObject = objectify(german)
        const englishObject = objectify(translated.text)

        // Merga the english translations with the German to make the block building easier
        englishObject.forEach((obj, index) => {
          if (obj.title) {
            germanObject[index].titleEn = obj.title
          }
          if (obj.mealTitle) {
            germanObject[index].mealTitleEn = obj.mealTitle
          }
          if (obj.description) {
            germanObject[index].descriptionEn = obj.description
          }
        })

        resolve(germanObject)
      }).catch(err => console.log(`Error translating: ${err}`));
    })
  })
}

module.exports = getWerdinoData