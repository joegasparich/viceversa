import React from 'react';

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
			<div className='square' onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={() => { }}>
				<div className='card-panel'>

				</div>
				<div className={`square-title valign-wrapper ${this.state.isHovered ? 'show' : ''}`}>
					<h5>{this.props.title}</h5>
				</div>
			</div>
		);
	}
}