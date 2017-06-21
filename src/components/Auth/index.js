import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import AuthStore from '@stores/Auth.store';
import { observer } from 'mobx-react';

@observer class Auth extends Component {
  constructor(props) {
    super(props);
  }

  handleTabSelect = (selectedTab) => {
    AuthStore.setTab(selectedTab);
  };

  renderForm = () => {
    if (AuthStore.activeTab === 'signup') return <Signup/>;
    return <Login/>;
  };

  render() {
    if (AuthStore.isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <div className='container-fluid'>
        <Grid>
          <Row>
            <Nav bsStyle="tabs" activeKey={AuthStore.activeTab} onSelect={this.handleTabSelect}>
              <NavItem eventKey={'login'} href="login">Login</NavItem>
              <NavItem eventKey={'signup'} href="signup">Signup</NavItem>
            </Nav>
          </Row>
          <Row>
            <Col>{ this.renderForm() }</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Auth;
