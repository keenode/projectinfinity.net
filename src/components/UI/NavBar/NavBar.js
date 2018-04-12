import React from 'react'
import { withRouter } from 'react-router-dom';

import NavItem from './NavItem/NavItem'

import styles from './NavBar.css'

const navBar = (props) => {
  const route = props.location.pathname
  const minimalClass = route === '/play' || route === '/game-master' ? styles.Minimal : ''

  return (
    <nav className={[styles.NavBar, minimalClass].join(' ')}>
      <ul className={styles.NavBarItems}>
        <NavItem link="/" exact>Home</NavItem>
        {props.isLoggedIn ? (<NavItem link="/play">Play</NavItem>) : null}
        {props.isLoggedIn ? (<NavItem link="/game-master">Game Master</NavItem>) : null}
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
}

export default withRouter(navBar)
