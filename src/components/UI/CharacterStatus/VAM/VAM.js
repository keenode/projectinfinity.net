import React from 'react'

import styles from './VAM.css'

const vam = props => (
  <div className={styles.VAM}>
    <div className={styles.Meter}>
      <span className={styles.MeterLabel}>V</span>
      <span className={styles.MeterBar}>
        <span
          className={[styles.MeterFill, styles.MeterFillVitality].join(' ')}
          style={{ width: (props.vam.vitality / props.vam.vitalityMax) * 100 + '%' }}>
        </span>
        <span className={styles.MeterBarText}>{props.vam.vitality} / {props.vam.vitalityMax}</span>        
      </span>
    </div>
    <div className={styles.Meter}>
      <span className={styles.MeterLabel}>A</span>
      <span className={styles.MeterBar}>
        <span
          className={[styles.MeterFill, styles.MeterFillAction].join(' ')}
          style={{ width: (props.vam.action / props.vam.actionMax) * 100 + '%' }}>
        </span>
        <span className={styles.MeterBarText}>{props.vam.action} / {props.vam.actionMax}</span>        
      </span>
    </div>
    <div className={styles.Meter}>
      <span className={styles.MeterLabel}>M</span>
      <span className={styles.MeterBar}>
        <span
          className={[styles.MeterFill, styles.MeterFillMind].join(' ')}
          style={{ width: (props.vam.mind / props.vam.mindMax) * 100 + '%' }}>
        </span>
        <span className={styles.MeterBarText}>{props.vam.mind} / {props.vam.mindMax}</span>        
      </span>
    </div>
  </div>
)

export default vam
