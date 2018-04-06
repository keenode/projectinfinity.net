import React, { Component } from 'react'
import { connect } from 'react-redux'

import TitleBar from '../../components/UI/TitleBar/TitleBar'
import NavBar from '../../components/UI/NavBar/NavBar'

import styles from './Layout.css';

class Layout extends Component {
  render () {
    return (
      <div className={styles.AppContainer}>
        <TitleBar title="Project Infinity" />
        <NavBar isAuth={this.props.isAuthenticated} />
        <main className={styles.LayoutContainer}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
