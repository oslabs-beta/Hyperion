import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import dbpage from '../../assets/appfeatures/dbpage.jpg'
import querypage from '../../assets/appfeatures/querypage.jpg'
import runtestpage from '../../assets/appfeatures/runtestpage.jpg'
// import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
   image: dbpage, 
   caption:"Enter Database Information",
  },
  {
    image: querypage, 
    caption:"Enter Queries",
   },
   {
    image:runtestpage, 
    caption:"Run Tests",
   } 
]



function Features () {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
        return (
          <section id="features">
          <h1>Features</h1>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} pause={false}>
            {data.map((slide, i) => {
              return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide.image}
                  alt="Slider image"
                />
                <Carousel.Caption>
                <h3>{slide.caption}</h3>
                </Carousel.Caption>
              </Carousel.Item>
              )
              })}
            </Carousel>
            </section>
          );
        };


export default Features;