import '../sass/main.scss'
import { Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Signin from '../container/auth/SignIn'
import SignUp from '../container/auth/SignUp'
import Wishlist from '../container/wishlist/Wishlist'
import OwnBook from '../container/ownBook/OwnBook'
import Logout from '../container/auth/Logout'
import Main from '../container/main/main'
import Detail from '../container/Detail/DetailPage'
import SellBook from '../container/Sell/SellBook'
import Edit from '../container/EditBook'
import Page404 from '../component/404'
import Router from './Route/Router'
import { connect } from 'react-redux'
import * as action from '../redux/actions/auth'


function App(props) {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.onTryAutoSignup();
    }

    return () => {
      mounted = false
    }
  }, [])

  let routes = (
    <Switch>
     
      <Route path='/detail/:id' exact component={Detail} />
      <Route path='/sell-book' component={SellBook} />
      <Route path='/user/login' component={Signin} />
      <Route path='/user/signup' component={SignUp} />
      <Route path='/' exact component={Main} />
      <Route component={Page404} />
    </Switch>
  )
  if (props.token) {
    routes = (
      <Switch>
        <Route path='/detail/:id' exact component={Detail} />
        <Route path='/update/:id' exact component={Edit} />
        <Route path='/sell-book' component={SellBook} />
        <Route path='/user/wishlist' render={() => <Wishlist token={props.token} />} />
        <Route path='/user/login' component={Signin} />
        <Route path='/user/signup' component={SignUp} />
        <Route path='/own-book' render={() => <OwnBook token={props.token} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={Main} />
        <Route component={Page404} />
      </Switch>
    )
  }

  return (
    <>
      <Router />
      {routes}
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(action.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
