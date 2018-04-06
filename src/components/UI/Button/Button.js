import React from 'react'

import styles from './Button.css'

const button = (props) => (
    <button
        className={[styles.Button, styles[props.btnType]].join(' ')}
        type={props.type}
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</button>
)

export default button
