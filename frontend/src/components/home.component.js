import React, {Component} from 'react'

import UserService from '../services/user.service'

export default class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			content: '',
		}
	}

	componentDidMount() {
		UserService.getPublicContent().then(
			(response) => {
				this.setState({
					content: response.data,
				})
			},
			(error) => {
				this.setState({
					content:
						(error.response && error.response.data) ||
						error.message ||
						error.toString(),
				})
			}
		)
	}

	render() {
		return (
			<>
				<section className='py-10 bg-gray-100 sm:py-16 lg:py-24'>
					<div className='max-w-5xl px-4 mx-auto sm:px-6 lg:px-8'>
						<div className='max-w-2xl mx-auto text-center'>
							<h1 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-6xl'>
								{this.state.content}
							</h1>
						</div>
					</div>
				</section>
			</>
		)
	}
}
