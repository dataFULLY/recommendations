# Recommedantions Service

> Displays listings nearby

## Related Projects

  - https://github.com/dataFULLY/reservation
  - https://github.com/dataFULLY/reviews
  - https://github.com/dataFULLY/recommedendations

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Setup config.js in ./database/

## Requirements

- Node 10.16

## Development

- npm run seed
- npm run build:dev
- npm run start:dev

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## RESTful CRUD APIs

### Create a Listing 
Creates a new listing with the provided data.  

#### Input body format:
```sh
{ url, title, city, state, country, plusVerified, propertyType, price, averageReview, totalReviews, savedList, about, theSpace, neighborhood }  
```

POST: '/api/listings/' 

Returns the listing object if successful.  

### Retrieve a Listing
Retrieves a listing for a given id.  

GET: '/api/listings/:id'

Returns the listing object if successful.

### Update a Listing
Updates and replaces a listing for a given id with the provided data.  

#### Input body format:
```sh
{ url, title, city, state, country, plusVerified, propertyType, price, averageReview, totalReviews, savedList, about, theSpace, neighborhood }  
```

PUT: '/api/listings/:id' 

Returns the updated listing object if successful.  

### Delete a Listing
Deletes a listing for a given id.  

DELETE: '/api/listings/:id' 

Returns the deleted listing object if successful.
