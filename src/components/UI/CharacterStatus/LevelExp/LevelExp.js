import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'

import styles from './LevelExp.css'

const levelExp = props => (
  <div className={styles.LevelExp}>
    {props.level}
    <CircularProgressbar
      percentage={(props.exp / props.expMax) * 100}
      className={styles.CircleExp}
      strokeWidth="6"
      textForPercentage=''
      initialAnimation="true"
      styles={{
        path: {
          stroke: '#1781ac',
          transition: 'stroke-dashoffset 1000ms ease'
        },
        trail: { stroke: 'rgba(0, 0, 0, 0.5)' }
      }}
    />
  </div>
)

export default levelExp
