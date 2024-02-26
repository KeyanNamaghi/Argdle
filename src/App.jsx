import { createSignal } from 'solid-js'
import { EvaluatedGuess, calculatePercentageDifference } from './EvaluatedGuess'
import { Result } from './Result'
import { Logo } from './Logo'
import styles from './App.module.css'
import { loadGameState, loadStats, saveGameState } from './StateManager'
import { data } from './data/shuffled'
import { Stats } from './Stats'
import { IconHelp, IconStatsChart } from './Icons'
import { Help } from './Help'

const App = () => {
  const savedState = loadGameState()
  const [guess, setGuess] = createSignal('')
  const [guesses, setGuesses] = createSignal(savedState.guesses)
  const [gameState, setGameState] = createSignal(savedState.state)
  const [showStats, setShowStats] = createSignal(false)
  const [showHelp, setShowHelp] = createSignal(false)

  const save = (newGuesses, state) => {
    setGuesses(newGuesses)
    setGameState(state || gameState())
    saveGameState({ guesses: guesses(), day: savedState.day, state: gameState() })
    setGuess('')
  }

  const { title: name, price, sku } = data[savedState.day]
  const imageSrc = `https://media.4rgos.it/i/Argos/${sku}_R_Z001A?w=1000&h=1000&qlt=70&fmt=webp`

  const handleStatsClose = e => {
    if (e.target.classList.contains(styles.ModalBackground)) {
      setShowStats(false)
    }
  }

  const handleHelpClose = e => {
    if (e.target.classList.contains(styles.ModalBackground)) {
      setShowHelp(false)
    }
  }

  return (
    <div class={styles.App}>
      <div class={styles.Container}>
        {showStats() && <Stats handleClose={handleStatsClose} {...loadStats()} />}
        {showHelp() && <Help handleClose={handleHelpClose} />}
        <div className={styles.Icons}>
          <IconHelp width={25} height={25} onClick={() => setShowHelp(true)} />
          <Logo />
          <IconStatsChart width={25} height={25} onClick={() => setShowStats(true)} />
        </div>
        <h2 class={styles.Heading}>{name}</h2>
        <img src={imageSrc} class={styles.logo} alt={name} />

        {guesses().map(guess => (
          <EvaluatedGuess price={price} guess={guess} />
        ))}

        {gameState() === 'PLAYING' ? (
          <form
            class={styles.Form}
            onSubmit={e => {
              e.preventDefault()
              const difference = calculatePercentageDifference(price, guess())
              const updatedGuesses = [...guesses()]
              const index = updatedGuesses.findIndex(g => g === null)
              updatedGuesses[index] = guess()
              save(updatedGuesses, difference <= 5 ? 'WON' : index === 5 ? 'LOST' : 'PLAYING')
            }}>
            <input
              required
              inputmode="decimal"
              name="guess"
              autocomplete="off"
              autofocus={true}
              value={guess()}
              onInput={e => {
                if (e.target.value.match(/^\d*((\.|\,)\d{0,2})?$/)) {
                  setGuess(e.target.value.replace(',', '.'))
                } else {
                  e.target.value = guess()
                }
              }}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <Result price={price} won={gameState() === 'WON'} guesses={guesses()} number={savedState.day} />
        )}
      </div>
    </div>
  )
}

export default App
