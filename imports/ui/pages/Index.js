import React from 'react';
import { Carousel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Index = () => (
    <div className="Index">
    
        <section id="home-banner">
    
            <Carousel 
                prevIcon={<FontAwesome name="chevron-left" size="5x" />}
                nextIcon={<FontAwesome name="chevron-right" size="5x" />}>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/images/genericpicture.jpg"/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/images/carousel.png"/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/images/carousel.png"/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    
        </section>
  </div>
);

export default Index;