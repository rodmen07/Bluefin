# Bluefin - Production README

Bluefin is a real estate brokerage application inspired by Redfin. It allows users to publicly share residential listings, which can be viewed and favorited by other users. This document serves as a production README and provides an overview of the application, links to the live site and wiki, discusses the technologies used, and highlights a couple of key features that showcase the technical abilities employed in the development process.

## Live Site

To explore the live site, please visit: [Bluefin](https://fsp-bluefin.herokuapp.com/)

## Wiki

For detailed information about the project, please refer to the [Bluefin Wiki](https://github.com/rodmen07/FSP-Bluefin/wiki)

## Technologies Used

Bluefin has been developed using the following technologies:

- **Frontend**: React.js, React-Redux, HTML, CSS, JavaScript
- **Backend**: Ruby on Rails
- **Database**: PostgreSQL
- **Deployment**: Heroku
- **Other Tools**: Git, GitHub 

## Key Features

### 1. New Account Creation, Login, and Guest/Demo Login

Bluefin provides users with the ability to sign up, sign in, and log out. Additionally, a demo login feature allows users to experience the site without creating an account. Certain features, such as creating listings and favoriting, are restricted to logged-in users only.

**Challenges Faced:**

- Implementing secure user authentication and authorization.
- Ensuring a smooth transition between guest/demo login and user-specific functionality.

**Brilliant Solutions:**
## About

This is an example `ApplicationController` class for a Rails API project. The `ApplicationController` serves as a base controller that other controllers in the application can inherit from. It includes various modules and defines common behavior and configurations for handling requests, protecting against security vulnerabilities, and managing user sessions.

## Features

- **Request Forgery Protection:** The `ApplicationController` includes the `ActionController::RequestForgeryProtection` module, which provides protection against cross-site request forgery (CSRF) attacks. This module generates and verifies authenticity tokens in forms to prevent unauthorized requests.

- **Error Handling:** The `ApplicationController` defines error handling for both standard errors and `ActionController::InvalidAuthenticityToken` errors using the `rescue_from` method. In case of an unhandled error, it logs the error details and returns an appropriate response based on the request format.

- **Protecting from Forgery:** The `ApplicationController` uses the `protect_from_forgery` method with the `:exception` option. This protects against CSRF attacks by raising an exception when an invalid authenticity token is detected.

- **Before Action Filters:** The `ApplicationController` defines two `before_action` filters: `snake_case_params` and `attach_authenticity_token`. These filters are executed before each action in the derived controllers. `snake_case_params` transforms the request parameters to snake case, and `attach_authenticity_token` adds the masked authenticity token to the response headers.

- **Session Management:** The `ApplicationController` includes methods for managing user sessions. `current_user` retrieves the currently logged-in user based on the session token stored in the request's session. `login!` sets the session token for the specified user, and `logout!` resets the session token and clears the session.

- **Authorization:** The `require_logged_in` method is a helper method that checks if a user is logged in by calling `current_user`. If no user is found, it returns an "Unauthorized" response.

```ruby
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  rescue_from StandardError, with: :unhandled_error
  rescue_from ActionController::InvalidAuthenticityToken,
    with: :invalid_authenticity_token

  protect_from_forgery with: :exception
  before_action :snake_case_params, :attach_authenticity_token
  
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    unless current_user
      render json: { message: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end

  def attach_authenticity_token
    headers['X-CSRF-Token'] = masked_authenticity_token(session)
  end

  def invalid_authenticity_token
    render json: { message: 'Invalid authenticity token' },
      status: :unprocessable_entity
  end

  def unhandled_error(error)
    if request.accepts.first.html?
      raise error
    else
      @message = "#{error.class} - #{error.message}"
      @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
      render 'api/errors/internal_server_error', status: :internal_server_error

      logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
    end
  end
end
```

```javascript
// React component for guest/demo login

import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/sessionActions';

const DemoLoginButton = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    dispatch(login({ email: 'demo@example.com', password: 'password' }));
  };

  return (
    <button onClick={handleDemoLogin}>Demo Login</button>
  );
};

export default DemoLoginButton;
```

### 2. Listings

Logged-in users can create listings, view individual listings, and edit/delete their own listings. The listings are publicly visible to all users.

**Challenges Faced:**

- Implementing a seamless listing creation process with proper form validation.
- Allowing users to edit and delete their own listings while ensuring data integrity and security.

**Brilliant Solutions:**

```ruby
# Listing creation in Ruby on Rails

class ListingsController < ApplicationController
  def create
    @listing = current_user.listings.new(listing_params)

    if @listing.save
      render json: @listing
    else
      render json: @listing.errors.full_messages, status: :unprocessable_entity
    end
  end

  # ...
end
```

```javascript
// React component for editing a listing

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListing } from '../actions/listingActions';

const EditListingForm = ({ listing }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateListing(listing.id, { title, description }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value

)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Update Listing</button>
    </form>
  );
};

export default EditListingForm;
```

## Conclusion

Bluefin showcases the use of modern web technologies such as React.js, Redux, Ruby on Rails, and PostgreSQL to create a real estate brokerage application with various features. The implementation of new account creation, login functionality, and guest/demo login demonstrates secure user authentication. The ability to create, view, edit, and delete listings highlights the application's versatility and user-centric design. Further development is underway, including the dashboard and profile features, as well as search listings functionality.

Feel free to explore the live site and refer to the wiki for more information on Bluefin's development.
