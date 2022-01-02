import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import empty_cart from '../Images/empty_cart.svg';
import { Link } from 'react-router-dom';

const Checkout = () => {
    let cart = useSelector(state => state.cart);

    let promo = useSelector(state => state.promo);

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
    }

    if (promo !== undefined) {
        for (let i = 0; i < promo.length; i++) { 
            total = total - promo[i].value;
        }
    }

    if (cart.length === 0) {
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} component="h4">
                        Cart is Empty
                    </Grid>
                    <Grid item xs={12}>
                        <img src={empty_cart} alt="Empty cart" width="200vw" />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return (
        <div className="checkout">
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">3</span>
                            </h4>
                            <ul className="list-group mb-3">

                                {
                                    cart.map((item, index) => {
                                        return (
                                            <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                                                <div>
                                                    <h6 className="my-0">{item.name}</h6>
                                                    <small className="text-muted">quantity:{item.quantity}</small>
                                                </div>
                                                <span className="text-muted">{item.price * item.quantity}</span>
                                            </li>
                                        );
                                    })
                                }
                                {
                                    (promo !== undefined)
                                    &&
                                    promo.map((item, index) => {
                                        return (
                                            <li key={index} className="list-group-item d-flex justify-content-between bg-light">
                                                <div className="text-success">
                                                    <h6 className="my-0">Promo code</h6>
                                                    <small>{item.name}</small>
                                                </div>
                                                <span className="text-success">{item.value}</span>
                                            </li>
                                        );
                                    })
                                }
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>{
                                        (promo === undefined) ? total : total
                                    }</strong>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName" className="form-label">First name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cc-name"
                                            placeholder=""
                                            required
                                        />
                                        <small className="text-muted">First Name</small>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label">Last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cc-name"
                                            placeholder=""
                                            required
                                        />
                                        <small className="text-muted">Last Name</small>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">$</span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="1234 Main St"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className="form-select d-block w-100" id="country" required>
                                            <option value="">Choose...</option>
                                            <option>United States</option>
                                            <option>India</option>
                                            <option>Canada</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid country.
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <select className="form-select d-block w-100" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>California</option>
                                            <option>Gujarat</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="zip" placeholder="" required />
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <button className="btn btn-primary px-4 rounded-pill" type="button">
                                    <Link
                                        style={{
                                            textDecoration: "none"
                                        }}
                                        className="text-light"
                                        to='/Payment'
                                    >
                                        Place Order
                                    </Link>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    )
}
export default Checkout;
