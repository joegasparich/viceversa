import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		}

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		this.setState({
			isHovered: !this.state.isHovered
		})
	}

	render() {
		return (
			<Link className='square' to={this.props.path} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
				<div className='card-panel'>
				</div>
				{this.props.title &&
					<div className={`square-title valign-wrapper ${this.state.isHovered ? 'show' : ''}`}>
						<h5>{this.props.title}</h5>
					</div>
				}
			</Link>
		);
	}
}
Square.propTypes = {
	title: PropTypes.string,
	path: PropTypes.string
}