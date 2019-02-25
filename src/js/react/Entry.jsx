import React from "react";

export default class Entry extends React.Component {
	render() {
		return (
			<div id="entry-modal">
				<div id="entry-content" className="valign-wrapper">
					<div className="center">
						<div
							className="enter"
							onClick={() => this.props.onClear()}
						>
							<div className="brand-logo">
								<div id="vice" />
								<div id="versa" />
							</div>
							<h2>Enter</h2>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
