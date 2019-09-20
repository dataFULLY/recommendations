DROP KEYSPACE IF EXISTS nearby;
CREATE KEYSPACE nearby WITH REPLICATION ={'class': 'SimpleStrategy', 'replication_factor':1};
USE nearby;

DROP TABLE IF EXISTS places;
DROP MATERIALIZED VIEW IF EXISTS nearby.places_by_city;

CREATE TABLE places_by_city(
  id bigint,
  url int,
  title text,
  city text,
  state text,
  -- country text,
  -- plusVerified boolean,
  -- propertyType text,
  -- price int,
  -- averageReview double,
  -- totalReviews int,
  -- about text,
  -- theSpace text,
  -- neighborhood text,
  PRIMARY KEY (city, id)
);

-- View to find city by ID
DROP materialized view if exists city_by_id;
CREATE MATERIALIZED VIEW city_by_id AS 
SELECT id,city FROM places_by_city 
WHERE id IS NOT NULL AND
city is NOT NULL
PRIMARY KEY (id, city);

DROP TABLE IF EXISTS favList_by_userID;
CREATE TABLE favList_by_userID(
  favListID bigint,
  listName text,
  userID bigint,
  placeID bigint,
  PRIMARY KEY (userID, favListID, placeID)
);


-- -- DROP MATERIALIZED VIEW IF EXISTS nearby.places_by_state;
-- CREATE TABLE places_by_state(
--   id bigint,
--   url int,
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
--   neighborhood text,
--   PRIMARY KEY (state)
-- );

-- -- View to find state by ID
-- DROP materialized view if exists state_by_id;
-- CREATE MATERIALIZED VIEW state_by_id AS 
-- SELECT id,state FROM places_by_city 
-- WHERE id IS NOT NULL AND
-- state is NOT NULL
-- PRIMARY KEY (id, state);