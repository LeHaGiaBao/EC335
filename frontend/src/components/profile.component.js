import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Profile extends Component {
	render() {
		const {user: currentUser} = this.props

		if (!currentUser) {
			return <Redirect to='/login' />
		}

		return (
			<>
				<div className='container'>
					<section className='py-10 bg-gray-100 sm:py-16 lg:py-24'>
						<div className='max-w-5xl px-4 mx-auto sm:px-6 lg:px-8'>
							<div className='max-w-2xl mx-auto text-center'>
								<h1 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-6xl'>
									<p>{currentUser.username} profile</p>
								</h1>
							</div>
						</div>
					</section>
					<br />
					<br />
					<p>
						<strong className='text-2xl'>Token:</strong>{' '}
						{currentUser.accessToken.substring(0, 20)} ...{' '}
						{currentUser.accessToken.substr(
							currentUser.accessToken.length - 20
						)}
					</p>
					<p>
						<strong className='text-2xl'>Id:</strong> {currentUser.id}
					</p>
					<p>
						<strong className='text-2xl'>Email:</strong>{' '}
						{currentUser.email}
					</p>
					<strong className='text-2xl'>Authorities:</strong>
					<br />
					<br />
					<ul>
						{currentUser.roles &&
							currentUser.roles.map((role, index) => (
								<li key={index}>{role}</li>
							))}
					</ul>
				</div>
			</>
		)
	}
}

function mapStateToProps(state) {
	const {user} = state.auth
	return {
		user,
	}
}

export default connect(mapStateToProps)(Profile)
