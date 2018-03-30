import React from 'react'

import NavItem from './NavItem/NavItem'

import styles from './NavBar.css'

const navBar = () => (
  <nav className={styles.NavBar}>
    <ul className={styles.NavBarItems}>
      <NavItem link="/" exact>Home</NavItem>
      <NavItem link="/play">Play</NavItem>
    </ul>
    <ul className={styles.NavBarItems}>
      <NavItem link="/login">Login</NavItem>
      <NavItem link="/sign-up">Sign Up</NavItem>
    </ul>
  </nav>
)

export default navBar
