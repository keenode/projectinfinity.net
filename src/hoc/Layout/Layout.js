import React, { Component } from 'react';

import TitleBar from '../../components/UI/TitleBar/TitleBar'
import NavBar from '../../components/UI/NavBar/NavBar'

import styles from './Layout.css';

class Layout extends Component {
  render () {
    return (
      <div className={styles.AppContainer}>
        <TitleBar title="Project Infinity" />
        <NavBar />
        <main className={styles.LayoutContainer}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout
