
DROP TABLE  IF EXISTS places;
CREATE TABLE places(
  id integer PRIMARY KEY,
  url integer,
  title text,
  city text,
  state text
  -- country text,
  -- plusVerified boolean,
  -- propertyType text,
  -- price integer,
  -- averageReview real,
  -- totalReviews integer,
  -- about text,
  -- theSpace text,
  -- neighborhood text
);

CREATE INDEX ON places (city);


DROP TABLE IF EXISTS places_no_index;
CREATE TABLE places_no_index(
  id integer PRIMARY KEY,
  url integer,
  title text,
  city text,
  state text
  -- country text,
  -- plusVerified boolean,
  -- propertyType text,
  -- price integer,
  -- averageReview real,
  -- totalReviews integer,
  -- about text,
  -- theSpace text,
  -- neighborhood text
);

DROP TABLE IF EXISTS favList_by_userID;
CREATE TABLE favList_by_userID(
  -- ID serial PRIMARY KEY,
  favListID integer PRIMARY KEY,
  listName text,
  userID integer
);

CREATE INDEX ON favList_by_userID (userID);

DROP TABLE IF EXISTS placeID_by_favListID;
CREATE TABLE placeID_by_favListID(
  ID serial PRIMARY KEY,
  favListID integer,
  placeID integer 
);

CREATE INDEX ON placeID_by_favListID (favListID);
