import styles from './App.module.css'

export function calculatePercentageDifference(value, guess) {
  return Math.abs(((guess - value) / Math.abs(value)) * 100)
}

export const EvaluatedGuess = ({ price, guess }) => {
  if (guess === null) return <div class={styles.Guess} />

  const diff = calculatePercentageDifference(price, guess)
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(guess))

  if (diff <= 5) {
    return <div class={`${styles.Guess} ${styles.Correct}`}>{formatted}</div>
  }

  const distance = diff > 25 ? styles.Wrong : styles.Almost
  const direction = price > guess ? '⬆️' : '⬇️'

  return (
    <div class={`${styles.Guess} ${distance}`}>
      {formatted} - {direction}
    </div>
  )
}
