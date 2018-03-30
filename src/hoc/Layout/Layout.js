import React, { Component } from 'react';

import TitleBar from '../../components/UI/TitleBar/TitleBar'

import styles from './Layout.css';

class Layout extends Component {
  render () {
    return (
      <div>
        <TitleBar title="Project Infinity" />
        <main className={styles.LayoutContainer}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout
