import {Component} from 'react'
import React from 'react'
import './ImgBanner.css'

export default class ImgBanner extends Component {
	render() {
		return (
			<div className="container">
  			<img src="../../../images/cafe.jpg" alt="Snow" style={{width:"100%"}} />
			  <div className="top-left" style={{width:"30%"}}>
					<span>Meet Gr8t, the modern solution for loyalty schemes</span>
				</div>
			</div>
		)
	}
}