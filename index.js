'use strict'
const werdino = require('werdino')
const translate = require('google-translate-api')
const condense = require('condense-whitespace')
const fetch = require('fetch-everywhere')
const zp = require('simple-zeropad');
const messageBuilder = require('./messageBuilder')

// A key in the form of 2018-01-17
const today = new Date()
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(
  today.getDate()
)}`

function objectify (text) {
  const parts = text.split('---\n')

  const meals = []

  parts.forEach(section => {
    console.log({ section })
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

const run = () => {
  let german = ''

  return new Promise(resolve => {
    werdino().then(data => {
      data.forEach(item => {
        // Don't break the JSON formatting when a single quote is present
        const title = condense(item.title)

        german += `[TITLE] ${title}\n`

        const mealTitle = condense(item.meals[todaysItem].title)
        const mealDescription = condense(item.meals[todaysItem].description)

        german += `[MEAL TITLE] ${mealTitle}\n`

        if (mealDescription) {
          german += `[MEAL DESCRIPTION] ${mealDescription}\n`
        }

        german += `[MEAL PRICES] ${item.meals[todaysItem].prices
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
      })
    })
  })
}

run().then(data => {
  const blocks = messageBuilder(data)

  fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blocks })
    }
  )
    .then(response => {
      console.log(response)
    })
    .catch(error => console.error('Error:', error))
})

module.exports = run
