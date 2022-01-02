import cafemanagment from "../Images/cafemanagment.png";
import Customer from "../Images/Customer.jpeg";
import Easymanagment from "../Images/Easymanagment.png";
import flexible from "../Images/flexible.jpeg";
import "./feature.css";
const Feature = () => {
	return (
		<div>
			<div className="cards-list">
				<div className="card 1">
					<div className="card_image"> <img src={cafemanagment} alt="cafe" /> </div>
					<div className="card_title title-black">
						<p>Login-Signup Page</p>
					</div>
				</div>

				<div className="card 2">
					<div className="card_image">
						<img className="img" src={Customer} alt="customer" />
					</div>
					<div className="card_title title-black">
						<p>Add a Parcel </p>
					</div>
				</div>

				<div className="card 3">
					<div className="card_image">
						<img src={Easymanagment} alt="easy" />
					</div>
					<div className="card_title">
						<p>Check all parcels</p>
					</div>
				</div>

				<div className="card 4">
					<div className="card_image">
						<img src={flexible} alt="flexible" />
					</div>
					<div className="card_title title-black">
						<p>Smooth UI</p>
					</div>
				</div>
			</div>
		</div>

	)
}
export default Feature;