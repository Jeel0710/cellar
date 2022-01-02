import React from 'react';
import Slider from '../components/Slider';
import Aboutus from '../components/Aboutus';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import './homepage.css';

export default function HomePage() {

	return (
		<div>
			{/*Menu*/}
			<div className="w3-top">
				<div className="w3-row w3-padding ">
					<div className="w3-col s3">
						<div id="navbar">
							<a href="#home" id="logo">Cellar-Tech</a>
							<div id="navbar-right">
								<a href="#about" >About Me</a>
								<a href="#Feature">Feature</a>
								<a href="#contact">Contact</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*Slidder */}
			<div>
				{/*Slidder  className="bgimg w3-display-container w3-grayscale-min" */}
				<header id="home">
					<Slider />
				</header>
			</div>
			<div >
				<div id="about">
					<div style={{ Width: '100%' }}>
						<Aboutus />
					</div>
				</div>
				{/*Feature*/}
				<div className="w3-container" id="Feature">
					<div className="w3-content" style={{ maxWidth: '1500px' }}>
						<h5 className="w3-center w3-padding-64">
							<span className="w3-tag w3-wide"></span></h5>
						<h1>
							<nav style={{ paddingTop: "10%" }}>
								<center><a href="#Feature" style={{ textDecoration: "underline", "color": "black", paddingTop: "90%" }}>FEATURE </a> </center>
							</nav>
						</h1>
						<Feature />
					</div>
				</div>
				<br />
				<br />
								<br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />
				{/* End page content */}
			</div>
			<div id="footer" style={{ "backgroundColor": "black" }}>
				<Footer />
			</div>
		</div>
	);
}

