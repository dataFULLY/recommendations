DROP KEYSPACE IF EXISTS nearby;
CREATE KEYSPACE nearby WITH REPLICATION ={'class': 'SimpleStrategy', 'replication_factor':1};
USE nearby;

-- DROP TABLE IF EXISTS Place;
-- DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS places;
DROP MATERIALIZED VIEW IF EXISTS nearby.places_by_state;

-- CREATE TYPE Place(
--   id bigint,
--   url text,
--   title text,
--   city text,
--   state text,
--   country text,
--   plusVerified boolean,
--   propertyType text,
--   price int,
--   averageReview double,
--   totalReviews int,
--   about text,
--   theSpace text,
--   neighborhood text
-- );

-- CREATE TABLE listings (
--     id bigint PRIMARY KEY,
--     places set <frozen <Place>>
-- );

CREATE TABLE places(
  id bigint,
  url int,
  title text,
  city text,
  state text,
  country text,
  plusVerified boolean,
  propertyType text,
  price int,
  averageReview double,
  totalReviews int,
  about text,
  theSpace text,
  neighborhood text,
  PRIMARY KEY (id)
);

CREATE MATERIALIZED VIEW places_by_state AS 
SELECT * FROM places 
WHERE id IS NOT NULL AND
state is NOT NULL
PRIMARY KEY (state, id);