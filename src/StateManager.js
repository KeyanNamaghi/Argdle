export const gameNumber = () => {
  const startDate = new Date('2024-01-01')
  const currentDate = new Date()
  const timeDifference = currentDate - startDate
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 530
}

export const saveGameState = ({ day, guesses, state }) => {
  localStorage.setItem('gameState', JSON.stringify({ day, guesses, state }))

  if (state !== 'PLAYING') {
    const stats = JSON.parse(localStorage.getItem('stats')) || {
      numGames: 0,
      numWins: 0,
      winsRecord: [0, 0, 0, 0, 0, 0],
      currentStreak: 0,
      maxStreak: 0,
    }
    stats.numGames++
    if (state === 'WON') {
      stats.numWins++
      stats.winsRecord[guesses.filter(guess => guess !== null).length - 1]++
      stats.currentStreak++
      if (stats.currentStreak > stats.maxStreak) {
        stats.maxStreak = stats.currentStreak
      }
    } else {
      stats.currentStreak = 0
    }
    localStorage.setItem('stats', JSON.stringify(stats))
  }
}

export const loadGameState = () => {
  const day = gameNumber()
  const defaultState = { day, guesses: [null, null, null, null, null, null], state: 'PLAYING' }
  const gameState = localStorage.getItem('gameState')

  if (!gameState || JSON.parse(gameState).day !== day) {
    saveGameState(defaultState)
    return defaultState
  }

  return JSON.parse(gameState)
}

export const loadStats = () => {
  return (
    JSON.parse(localStorage.getItem('stats')) || {
      numGames: 0,
      numWins: 0,
      winsRecord: [0, 0, 0, 0, 0, 0],
      currentStreak: 0,
      maxStreak: 0,
    }
  )
}

export default { saveGameState, loadGameState, gameNumber }
