import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Square extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		}

		this.handleHover = this.handleHover.bind(this);
	}

	handleHover(hovering) {
		this.setState({
			isHovered: hovering
		})
	}

	render() {
		return (
			<Link className='square' to={this.props.path || ""} onMouseEnter={() => this.handleHover(true)} onMouseLeave={() => this.handleHover(false)}>
				<div className='card-panel'>
				</div>
				{this.props.title &&
					<div className={`square-title valign-wrapper ${this.state.isHovered ? 'show' : ''}`}>
						<h3>{this.props.title}</h3>
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