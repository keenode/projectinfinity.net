import React from 'react'

import NavItem from './NavItem/NavItem'

import styles from './NavBar.css'

const navBar = (props) => (
  <nav className={styles.NavBar}>
    <ul className={styles.NavBarItems}>
      <NavItem link="/" exact>Home</NavItem>
      <NavItem link="/play">Play</NavItem>
    </ul>
    <ul className={styles.NavBarItems}>
      {
        props.isAuth ? (
          <NavItem link="/logout">Logout</NavItem>
        ) : (
          <div style={{display: 'inherit'}}>
            <NavItem link="/login">Login</NavItem>
            <NavItem link="/register">Register</NavItem>
          </div>
        )
      }
    </ul>
  </nav>
)

export default navBar
