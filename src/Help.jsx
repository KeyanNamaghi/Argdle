import styles from './App.module.css'
import { EvaluatedGuess } from './EvaluatedGuess'

// Yeah I know this is a bit of a mess but cba to clean it up
export const Help = ({ handleClose }) => {
  return (
    <div onClick={handleClose} className={styles.ModalBackground}>
      <div className={styles.Modal}>
        <div className={styles.Help}>
          <h2>Help</h2>
          <div>
            <p>Guess the Argdle in 6 tries</p>
            <h3>Example</h3>
            <p>First guess of £5.00 is more than 25% below the actual price</p>
            <EvaluatedGuess price={10} guess={5} />
            <p>Second guess of £12.00 is too high now but within 25% of the actual price</p>
            <EvaluatedGuess price={10} guess={12} />
            <p>If you guess within 5% of the price, you win!</p>
            <EvaluatedGuess price={10} guess={10} />
            <h3>A new Argdle is available every day!</h3>
            <p>
              Special thanks all the dles out there but <a href="https://costcodle.com/">COSTCODLE</a> in particular!
            </p>
            <p>
              Created by <a href="https://www.keyan.dev/me">Keyan</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
