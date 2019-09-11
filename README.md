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

#### Input format:
```json
{ url, title, city, state, country, plusVerified, propertyType, price, averageReview, totalReviews, savedList, about, theSpace, neighborhood }  
```

POST: app.post('/api/nearbyPlaces/')  

Returns the listing object if successful.  

### Retrieve a Listing
Retrieves a listing for a given id.  

GET: app.get('/api/nearbyPlaces/:id')  

Returns the listing object if successful.

### Update a Listing
Updates a listing for a given id with the provided data.  

PUT: app.put('/api/nearbyPlaces/:id')  

Returns the updated listing object if successful.  

### Delete a Listing
Deletes a listing for a given id.  

DELETE: app.delete('/api/nearbyPlaces/:id')  

Returns the deleted listing object if successful.
