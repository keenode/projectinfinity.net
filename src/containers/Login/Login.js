import React from 'react'

import Input from '../../components/UI/Controls/Input/Input'

import styles from './Login.css'

const login = () => (
  <section className={styles.Login}>
    <h1>Login</h1>
    <Input inputtype="input" type="text" name="username" placeholder="Username" />
  </section>
)

export default login
