# Bluefin - Production README

Bluefin is a real estate brokerage application inspired by Redfin. It allows users to publicly share residential listings, which can be viewed and favorited by other users. This document serves as a production README and provides an overview of the application, links to the live site and wiki, discusses the technologies used, and highlights a couple of key features that showcase the technical abilities employed in the development process.

## Live Site

To explore the live site, please visit: [Bluefin](https://fsp-bluefin.herokuapp.com/)

## Wiki

For detailed information about the project, please refer to the [Bluefin Wiki](https://github.com/rodmen07/FSP-Bluefin/wiki)

## Technologies Used

Bluefin has been developed using the following technologies:

- **Frontend**: React.js, Redux, HTML, CSS, JavaScript
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

```ruby
# User authentication and authorization using Devise gem in Ruby on Rails

class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # ...
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
