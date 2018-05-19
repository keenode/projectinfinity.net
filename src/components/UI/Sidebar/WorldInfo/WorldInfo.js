import React from 'react'

import styles from './WorldInfo.css'

const datetimeNames = {
  months: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  },
  days: {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
    8: 'Sunday+'
  }
}

const worldInfo = props => (
  <div className={styles.WorldInfo}>
    <div className={styles.WorldInfoInner}>
      <div className={styles.MiniMap}>
        <span className={styles.WorldName}>{props.worldName}</span>
        World Mini-Map
      </div>
      <div className={styles.DateTimeWeather}>
        <span>Great Basin - Sunny 76&deg;</span>
        <span>{props.datetime.hour < 10 ? '0' + props.datetime.hour : props.datetime.hour}:{props.datetime.minute < 10 ? '0' + props.datetime.minute : props.datetime.minute} - {datetimeNames.days[props.datetime.day % 8]}, {props.datetime.day} {datetimeNames.months[props.datetime.month]}, {props.datetime.year}</span>
      </div>
    </div>
  </div>
)

export default worldInfo
