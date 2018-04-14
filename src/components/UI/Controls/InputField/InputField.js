import React from 'react'

import styles from './InputField.css'

const inputField = props => {
  let inputElement = null
  const inputStyles = [styles.InputField]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input id={props.id} {...props.elementConfig} value={props.value} onChange={props.changed} />
      break
    case ('textarea'):
      inputElement = <textarea id={props.id} {...props.elementConfig} onChange={props.changed} />
      break
    case ('select'):
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      )
      break
    default:
      inputElement = <input id={props.id} {...props.elementConfig} value={props.value} onChange={props.changed} />
  }

  return (
    <div className={inputStyles.join(' ')}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default inputField
