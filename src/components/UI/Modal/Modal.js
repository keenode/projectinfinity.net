import React from 'react'
import Aux from 'react-aux'

import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.css'

const modal = (props) => (
  <Aux>
    <div className={styles.Modal} style={{ display: props.show ? 'block' : 'none' }}>
      {props.children}
    </div>
    <Backdrop show={props.show} />
  </Aux>
)

export default modal
