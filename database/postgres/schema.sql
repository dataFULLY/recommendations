
DROP TABLE places;
CREATE TABLE places(
  id integer PRIMARY KEY,
  url integer,
  title text,
  city text,
  state text,
  country text,
  plusVerified boolean,
  propertyType text,
  price integer,
  averageReview real,
  totalReviews integer,
  about text,
  theSpace text,
  neighborhood text
);

-- CREATE INDEX ON places (state);