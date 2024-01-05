import styles from './App.module.css'

// Yeah I know this is a bit of a mess but cba to clean it up
export const Stats = ({ numGames, numWins, currentStreak, maxStreak, winsRecord, handleClose }) => {
  const barLengths = winsRecord.map(wins => {
    const percentage = (100 * wins) / (numWins || 1)
    return `${percentage > 8 ? percentage : 8}%`
  })

  return (
    <div onClick={handleClose} className={styles.ModalBackground}>
      <div className={styles.Modal}>
        <h2>Stats</h2>
        <div className={styles.Stats}>
          <div className={styles.Stat}>
            <p>{numGames}</p>
            <p>Played</p>
          </div>
          <div className={styles.Stat}>
            <p>{numWins}</p>
            <p>Won</p>
          </div>
          <div className={styles.Stat}>
            <p>{currentStreak}</p>
            <p>Current Streak</p>
          </div>
          <div className={styles.Stat}>
            <p>{maxStreak}</p>
            <p>Max Streak</p>
          </div>
        </div>
        <div className={styles.Graph}>
          <div>
            1<sup>st</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[0]};`}>
            {winsRecord[0]}
          </div>
          <div>
            2<sup>nd</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[1]};`}>
            {winsRecord[1]}
          </div>
          <div>
            3<sup>rd</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[2]};`}>
            {winsRecord[2]}
          </div>
          <div>
            4<sup>th</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[3]};`}>
            {winsRecord[3]}
          </div>
          <div>
            5<sup>th</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[4]};`}>
            {winsRecord[4]}
          </div>
          <div>
            6<sup>th</sup>
          </div>
          <div className={styles.GraphBar} style={`width: ${barLengths[5]};`}>
            {winsRecord[5]}
          </div>
        </div>
      </div>
    </div>
  )
}
