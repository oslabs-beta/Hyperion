import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import dbpage from '../../assets/appfeatures/dbpage.jpg'
import querypage from '../../assets/appfeatures/querypage.jpg'
import runtestpage from '../../assets/appfeatures/runtestpage.jpg'

// import 'bootstrap/dist/css/bootstrap.min.css';

const Features = (props) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => { setIndex(selectedIndex); };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={dbpage}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Select Database </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={querypage}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Run Queries</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={runtestpage}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Run Test</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
};
    
    


export default Features;