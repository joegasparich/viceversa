import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Square extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		}

		this.handleHover = this.handleHover.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleHover(hovering) {
		this.setState({
			isHovered: hovering
		})
	}

	handleClick(func, params) {
		func(params, this);
	}

	render() {
		if (this.props.path) {
			return (
				<Link 
					className='square'
					to={this.props.path}
					onMouseEnter={() => this.handleHover(true)}
					onMouseLeave={() => this.handleHover(false)}
					style={{backgroundImage: `url(${this.props.image})`}}
				>
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
		
		return (
			<div 
				className='square'
				onMouseEnter={() => this.handleHover(true)} 
				onMouseLeave={() => this.handleHover(false)} 
				onClick={() => {this.handleClick(this.props.click.func, this.props.click.params)}}
				style={{backgroundImage: `url(${this.props.image})`}}
			>
				<div className='card-panel'>
				</div>
				{this.props.title &&
					<div className={`square-title valign-wrapper ${this.state.isHovered ? 'show' : ''}`}>
						<h3>{this.props.title}</h3>
					</div>
				}
			</div>
		);
	}
}
Square.propTypes = {
	title: PropTypes.string,
	image: PropTypes.string,
	path: PropTypes.string,
	click: PropTypes.shape({
		func: PropTypes.func,
		params: PropTypes.object
	})
}