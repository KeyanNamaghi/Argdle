import { data } from './src/data'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

shuffleArray(data)

await Bun.write(`./src/data/shuffled.js`, 'export const data = ' + JSON.stringify(data))
