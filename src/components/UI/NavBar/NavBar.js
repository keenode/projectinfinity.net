import React from 'react'

import NavItem from './NavItem/NavItem'

import styles from './NavBar.css'

const navBar = () => (
  <nav className={styles.NavBar}>
    <ul>
      <NavItem link="/" exact>Home</NavItem>
      <NavItem link="/play">Play</NavItem>
    </ul>
  </nav>
)

export default navBar
