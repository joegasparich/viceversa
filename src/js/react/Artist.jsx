import React from "react";
import { Link } from "react-router-dom";

export default class Artist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		};

		// Binds
		this.handleHover = this.handleHover.bind(this);
	}

	handleHover(hovering) {
		this.setState({
			isHovered: hovering
		});
	}

	render() {
		return (
			<Link
				className="artist-square"
				to={this.props.path && this.props.path}
				onMouseEnter={() => this.handleHover(true)}
				onMouseLeave={() => this.handleHover(false)}
				onClick={() => window.scrollTo(0, 0)}
			>
				<img src={this.props.image} alt={this.props.title} />
				{this.props.title && (
					<div
						className={`artist-title valign-wrapper ${
							this.state.isHovered ? "show" : ""
						}`}
					>
						<h3>{this.props.title}</h3>
					</div>
				)}
			</Link>
		);
	}
}
