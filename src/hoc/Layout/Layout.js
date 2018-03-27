import React, { Component } from 'react';

import styles from './Layout.css';

class Layout extends Component {
  render () {
    return (
      <div>
        <div className={styles.TitleBar}>
          <span>Project Infinity</span>
        </div>
        <main className={styles.LayoutContainer}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout
