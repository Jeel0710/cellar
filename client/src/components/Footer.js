import React, { useState } from "react";
import { send } from 'emailjs-com';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

	const [cred, setCred] = useState({
		user: "",
		email: "",
		description: ""
	});

	function handleChange(e) {
		e.preventDefault();
		if (e.target.name === "name") {
			if ((/^[0-9a-zA-Z]*$/).test(e.target.value)) {
				setCred({
					...cred,
					user: e.target.value
				});
			}
		}
		if (e.target.name === "email") {
			setCred({
				...cred,
				email: e.target.value
			});
		}
		if (e.target.name === "message") {
			if ((/^[ 0-9a-zA-Z.]*$/).test(e.target.value)) {
				setCred({
					...cred,
					description: e.target.value
				});
			}
		}
	}

	const sendEmail = (e) => {
		e.preventDefault();
		const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if ((cred.user !== "") && (cred.email !== "") && (cred.description !== "") && (emailpattern.test(cred.email))) {
			fetch(
				'/API/sendotp', {
				method: 'POST',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: "form"
				})
			}).then(response => {
				if (response.status === 500) {
					return undefined;
				}
				return response.json();
			}).then(data => {
				if (data === undefined) {
					window.alert("FeedBack send unsuccessful.");
				} else {
					const templateParams = {
						from_name: cred.user,
						from_email: cred.email,
						from_description: cred.description,
						app_name: data.app_name
					}
					send(data.serviceID, data.templateID, templateParams, data.userID)
						.then(response => {
							window.alert("FeedBack send successfully.");
						}).catch(error => {
							window.alert("FeedBack send unsuccessful.");
						});
					setCred({
						user: "",
						email: "",
						description: ""
					});
				}
			});
		}
	};


	return (
		<div>
			<div id='contact' style={{ color: "white", paddingTop: "9.2%" }}>
				<div className='container'>
					<div className='col-md-8'>
						<div className='row'>
							<div className='section-title'>
								<h2>Get In Touch</h2>
								<p>
									Please fill out the form below to send us an email and we will
									get back to you as soon as possible.
								</p>
							</div>
							<form name='sentMessage'>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												type='text'
												id='name'
												name='name'
												className='form-control'
												value={cred.user}
												onChange={(e) => handleChange(e)}
												placeholder='Name'
												required
											/>
											<p className='help-block tex-danger'></p>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												type='email'
												id='email'
												name='email'
												className='form-control'
												value={cred.email}
												onChange={(e) => handleChange(e)}
												placeholder='Email'
												required
											/>
											<p className='help-block tex-danger'></p>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-12'>
										<div className='form-group'>
											<input
												type='text'
												id='message'
												name='message'
												className='form-control'
												value={cred.description}
												onChange={(e) => handleChange(e)}
												placeholder='Message'
												required
											/>
											<p className='help-block tex-danger'></p>
										</div>
									</div>
								</div>
								<button
									type='submit'
									onClick={(e) => sendEmail(e)}
									className='btn btn-custom btn-lg'
									style={{ "backgroundColor": "white" }}
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
					<div className='col-md-3 col-md-offset-1 contact-info'>
						<div className='contact-item'>
							<h3>Contact Info</h3>
							<p>
								<span>
									<i className='fa fa-map-marker'></i> Address :
								</span>
								7 <br />ABC, <br /> XY,  Vadodara,<br />  Gujarat, <br /> 390024
							</p>
						</div>
						<div className='contact-item'>
							<p>
								<span>
									<i className='fa fa-phone'></i> Phone
								</span>{' '}
								9512235400
							</p>
						</div>
						<div className='contact-item'>
							<p>
								<span>
									<i className='fa fa-envelope-o'></i> Email
								</span>{' '}
								jeeldamor0707@gmail.com
							</p>
						</div>
					</div>
					<div className='col-md-12'>
						<div className='row'>
							<div className='social'>
								<ul>
									<a href="https://www.linkedin.com/">
										<LinkedInIcon />
									</a>
									<br />
									<a href="https://www.instagram.com/">
										<InstagramIcon />
									</a><br />
									<a href="https://www.facebook.com/">
										<FacebookIcon />
									</a>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='footer'>
				<div className='container text-center' style={{ "color": "white" }}>
					<p>
						&copy; 2022 Cellar-Tech  Design by{' Jeel '}
						<br />
					</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;