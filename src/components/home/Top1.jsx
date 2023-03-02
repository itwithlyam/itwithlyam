import React, {Component} from 'react'
import './Top1.css'

export default class Top1 extends Component {
	render() {
		return (
			<div className="Top1">
				
				<div className="column left t"><span>
					Companies
				</span></div>
				<div className="column middle t">
					<span>Royalty Schemes</span>
				</div>
				<div className="column right t">
					<span>Our Solution</span>
				</div>
				
				<div className="column left">
					<span>
						<img className="img" src="../../images/shop1.jpg" />
						<img className="img" src="../../images/shop2.jpg" />
					</span>
				</div>
				<div className="column middle">
					<span>
						<img className="img" src="../../images/loyalty1.jpg" />
						<img className="img" src="../../images/loyalty2.jpg" />
					</span>
				</div>
				<div className="column right">
					<span>
						insert picture of finished product here
						<br />
						oh and here too
					</span>
				</div>
			</div>
		)
	}
}