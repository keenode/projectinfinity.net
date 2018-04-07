import React from 'react'

import NavItem from './NavItem/NavItem'

import styles from './NavBar.css'

const navBar = (props) => (
  <nav className={styles.NavBar}>
    <ul className={styles.NavBarItems}>
      <NavItem link="/" exact>Home</NavItem>
      {props.isLoggedIn ? (<NavItem link="/play">Play</NavItem>) : null}
    </ul>
    <ul className={styles.NavBarItems}>
      {
        props.isLoggedIn ? (
          <NavItem link="/auth/logout">Logout</NavItem>
        ) : (
          <div style={{display: 'inherit'}}>
            <NavItem link="/auth/login">Login</NavItem>
            <NavItem link="/auth/register">Register</NavItem>
          </div>
        )
      }
    </ul>
  </nav>
)

export default navBar
