/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Place from './Place';
import * as sc from '../styles/placeListStyles';
import { usePlacesContext } from '../context/PlacesContext';

const PlaceList = () => {
  const [places, setPlaces] = usePlacesContext();

  let initEnd = false;
  if (places.length) {
    initEnd = places.length <= 3;
  }

  const [index, setIndex] = useState(0);
  const [end, setEnd] = useState(initEnd);
  const [start, setStart] = useState(true);

  useEffect(() => {
    const splitUrl = document.URL.split('/');
    const i = splitUrl.indexOf('listing');
    let id = 0;
    if (i >= 0) {
      id = splitUrl[i + 1];
    }
    // const url = `http://ec2-13-52-191-198.us-west-1.compute.amazonaws.com:3004/api/nearbyPlaces/${id}`;
    const url = `http://localhost:3005/api/listing/${id}`;
    axios.get(url, {
      params: {
        id,
      },
    })
      .then((response) => response.data)
      .then((fetchedPlaces) => {
        fetchedPlaces.forEach((place) => {
          place.url = `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${place.url}.jpeg`;
          place.savedList = [];
          place.country = 'a';
          place.plusVerified = true;
          place.propertyType = 'a';
          place.price = 101;
          place.averageReview = 4.57;
          place.totalReviews = 304;
          place.about = 'Nam repudiandae non vel earum rem quia expl';
          place._id = place.id;
          place.__v = 0;
        });
        setPlaces(fetchedPlaces);
      });
  }, []);

  const next = () => {
    const newIndex = index + 1;
    let newEnd = end;
    if (newIndex >= places.length - 3) {
      newEnd = true;
    }

    setIndex(newIndex);
    setEnd(newEnd);
    setStart(false);
  };

  const prev = () => {
    const newIndex = index - 1;
    let newStart = start;
    if (newIndex <= 0) {
      newStart = true;
    }

    setIndex(newIndex);
    setEnd(false);
    setStart(newStart);
  };

  return (
    <sc.PlaceListDiv>
      <sc.ButtonWrapper>
        <sc.Arrow name="prev" onClick={prev} viewBox="0 0 18 18" limit={start}>
          <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
        </sc.Arrow>
      </sc.ButtonWrapper>
      <sc.OuterDiv>
        <sc.InnerDiv index={index}>
          {places.map((place, i) => (
            <Place
              first={i === 0}
              last={i === places.length - 1}
              key={place._id}
              place={place}
            />
          ))}
        </sc.InnerDiv>
      </sc.OuterDiv>
      <sc.ButtonWrapper>
        <sc.Arrow name="next" onClick={next} viewBox="0 0 18 18" limit={end}>
          <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
        </sc.Arrow>
      </sc.ButtonWrapper>
    </sc.PlaceListDiv>
  );
};

export default PlaceList;
