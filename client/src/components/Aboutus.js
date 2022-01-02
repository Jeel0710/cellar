import React from "react";
import './aboutus.css';
import Pic1 from '../Images/Pic1.jpeg'
const Aboutus = () => {
	return (
		<div id="about" className="about-page">
			<div>
				<h5 className="w3-center w3-padding-64">
					<span className="w3-tag w3-wide"></span></h5>
				<h1>
					<nav>
						<center><a href="#about" className="w3-block" style={{ textDecoration: "underline", color: "black" }}>ABOUT ME </a></center>
					</nav>
				</h1>

				<div className="text-centre w3-panel w3-leftbar w3-light-grey">
					<div style={{ maxWidth: "100%", marginLeft: '25%', marginRight: '25%', textDecorationStyle: "double" }}>
						<div className="w3-panel w3-leftbar w3-light-grey">
							<div style={{ textAlign: 'center', fontSize: '17px' }}>
								<center>
									<p>										
									<br />
										<b>
											<br />"Jeel M Damor"
											<br />Studies at Dhirubhai Ambani Institute of Information and communication Technology
											<br />React Developer, Html, css, bootstrap
										</b>
										<img src={Pic1} alt="cafe" style={{ width: '80%', maxWidth: '700px' }} className="w3-margin-top" />
									</p>
								</center>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Aboutus;