import styles from './App.module.css'
import { calculatePercentageDifference } from './EvaluatedGuess'

export const Result = ({ price, won, guesses, number }) => {
  const message = won ? 'You guessed it!' : 'Unlucky!'
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(price))

  // Man this is a mess but I'm tired, it's late and I'm hungry
  const share = () => {
    const result = guesses
      .map(guess => {
        if (guess === null) return
        const diff = calculatePercentageDifference(price, guess)
        if (diff < 5) return '🟢'
        if (diff > 25) return price > guess ? '⬆️🔴' : '⬇️🔴'
        return price > guess ? '⬆️🟡' : '⬇️🟡'
      })
      .filter(Boolean)
      .join('')

    const shareText = `Argdle #${number} ${result} - ${window.location.href}`

    navigator.clipboard
      .writeText(shareText)
      .then(function () {
        alert('Copied to clipboard: ' + shareText)
      })
      .catch(function (err) {
        console.error('Unable to copy text to clipboard', err)
      })
  }

  return (
    <div>
      <p class={styles.Result}>
        {message} The price was {formatted}
      </p>
      <button class={styles.Share} onClick={share}>
        <span>Share</span>
        <svg fill="#fff" height="16px" width="16px" viewBox="0 0 481.6 481.6">
          <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8 c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5 l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9 l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1 c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8 c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5 c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z" />
        </svg>
      </button>
    </div>
  )
}
