import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router, Switch, Route, Link} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/login.component'
import Register from './components/register.component'
import Home from './components/home.component'
import Profile from './components/profile.component'
import BoardUser from './components/board-user.component'
import BoardModerator from './components/board-moderator.component'
import BoardAdmin from './components/board-admin.component'

import {logout} from './actions/auth'
import {clearMessage} from './actions/message'

import {history} from './helpers/history'

// import AuthVerify from "./common/auth-verify";
import EventBus from './common/EventBus'

class App extends Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)

		this.state = {
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		}

		history.listen((location) => {
			props.dispatch(clearMessage()) // clear message when changing location
		})
	}

	componentDidMount() {
		const user = this.props.user

		if (user) {
			this.setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
				showAdminBoard: user.roles.includes('ROLE_ADMIN'),
			})
		}

		EventBus.on('logout', () => {
			this.logOut()
		})
	}

	componentWillUnmount() {
		EventBus.remove('logout')
	}

	logOut() {
		this.props.dispatch(logout())
		this.setState({
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		})
	}

	render() {
		const {currentUser, showModeratorBoard, showAdminBoard} = this.state

		return (
			<Router history={history}>
				<div>
					<nav className='navbar navbar-expand navbar-dark bg-gray-800'>
						<Link to={'/'} className='navbar-brand text-5xl'>
							EC335
						</Link>
						<div className='navbar-nav mr-auto'>
							<li className='nav-item'>
								<Link
									to={'/home'}
									className='nav-link text-lg text-white'>
									Home
								</Link>
							</li>

							{showModeratorBoard && (
								<li className='nav-item'>
									<Link
										to={'/mod'}
										className='nav-link text-lg text-white'>
										Moderator Board
									</Link>
								</li>
							)}

							{showAdminBoard && (
								<li className='nav-item'>
									<Link
										to={'/admin'}
										className='nav-link text-lg text-white'>
										Admin Board
									</Link>
								</li>
							)}

							{currentUser && (
								<li className='nav-item'>
									<Link
										to={'/user'}
										className='nav-link text-lg text-white'>
										User
									</Link>
								</li>
							)}
						</div>

						{currentUser ? (
							<div className='navbar-nav ml-auto'>
								<li className='nav-item'>
									<Link
										to={'/profile'}
										className='nav-link text-lg text-white'>
										{currentUser.username}
									</Link>
								</li>
								<li className='nav-item'>
									<a
										href='/login'
										className='nav-link text-lg text-white'
										onClick={this.logOut}>
										LogOut
									</a>
								</li>
							</div>
						) : (
							<div className='navbar-nav ml-auto'>
								<li className='nav-item'>
									<Link
										to={'/login'}
										className='nav-link text-lg text-white'>
										Login
									</Link>
								</li>

								<li className='nav-item'>
									<Link
										to={'/register'}
										className='nav-link text-lg text-white'>
										Sign Up
									</Link>
								</li>
							</div>
						)}
					</nav>

					<div className='container mt-3'>
						<Switch>
							<Route exact path={['/', '/home']} component={Home} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/profile' component={Profile} />
							<Route path='/user' component={BoardUser} />
							<Route path='/mod' component={BoardModerator} />
							<Route path='/admin' component={BoardAdmin} />
						</Switch>
					</div>

					{/* <AuthVerify logOut={this.logOut}/> */}
				</div>
			</Router>
		)
	}
}

function mapStateToProps(state) {
	const {user} = state.auth
	return {
		user,
	}
}

export default connect(mapStateToProps)(App)
