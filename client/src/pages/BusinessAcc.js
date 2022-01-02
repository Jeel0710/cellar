import React from 'react';
class BusinessAcc extends React.Component
{
  render()
  {
    return (
        <div className="BusinessAcc">
         <section class="py-5">
                <div class="container px-4 px-lg-5 my-5">
                <div class="row">
                
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Food-Desk Business Account</h4>
                    <form class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                        <label for="firstName" class="form-label">First name</label>
                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                        <small class="text-muted">First Name</small>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="lastName" class="form-label">Last name</label>
                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                        <small class="text-muted">Last Name</small>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="Cafe name" class="form-label">Cafe Name</label>
                        <div class="input-group">
                        {/* <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div> */}
                        <input type="text" class="form-control" id="Cafe name" placeholder="Cafe name" required />
                        <div class="invalid-feedback">
                            Your cafe name is required.
                        </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                        <input type="email" class="form-control" id="email" placeholder="name@gmail.com" />
                        <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Business Address</label>
                        <input type="text" class="form-control" id="address" placeholder="Cafe Address" required />
                        <div class="invalid-feedback">
                        Please enter your shipping address.
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-5 mb-3">
                        <label for="country" class="form-label">Business Country</label>
                        <select class="form-select d-block w-100" id="country" required>
                            <option value="">Choose...</option>
                            <option>United States</option>
                            <option>India</option>
                            <option>Canada</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid country.
                        </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <label for="state" class="form-label">State</label>
                        <select class="form-select d-block w-100" id="state" required>
                            <option value="">Choose...</option>
                            <option>Uttar Pradesh</option>
                            <option>Gujarat</option>
                            <option>Maharashtra</option>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="zip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder="" required />
                        <div class="invalid-feedback">
                            Zip code required.
                        </div>
                        </div>
                    </div>
                    <hr class="mb-4" />
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="same-address" />
                        <label class="form-check-label" for="same-address">Cafe Pickup address is the same as my billing address</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info" />
                        <label class="form-check-label" for="save-info">Save this information for next time</label>
                    </div>
                    <hr class="mb-4" />
                    <h4 class="mb-3">Add Payment mode to receive and link account with cafeteria</h4>
                    <div class="d-block my-3">
                        <div class="form-check">
                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                        <label class="form-check-label" for="credit">Credit card</label>
                        </div>
                        <div class="form-check">
                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                        <label class="form-check-label" for="debit">Debit card</label>
                        </div>
                        <div class="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
                        <label class="form-check-label" for="paypal">Paypal</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                        <label for="cc-name" class="form-label">Name on card</label>
                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                        <small class="text-muted">Full name as displayed on card</small>
                        <div class="invalid-feedback">
                            Name on card is required
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="cc-number" class="form-label">Credit card number</label>
                        <input type="text" class="form-control" id="cc-number" placeholder="" required />
                        <div class="invalid-feedback">
                            Credit card number is required
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 mb-3">
                        <label for="cc-expiration" class="form-label">Expiration</label>
                        <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                        <div class="invalid-feedback">
                            Expiration date required
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="cc-expiration" class="form-label">CVV</label>
                        <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                        <div class="invalid-feedback">
                            Security code required
                        </div>
                        </div>
                    </div>
                    <hr class="mb-4" />
                    <button class="btn btn-dark px-4 rounded-pill" type="button">Create Account</button>
                    </form>
                </div>
                </div>
            </div>
            </section>
         
        </div>
      
    )
  }
}
export default BusinessAcc;