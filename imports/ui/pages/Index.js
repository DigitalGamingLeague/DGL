import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Timeline } from 'react-twitter-widgets';

const Index = () => (
    <div className="Index">
    
        <section id="home-banner">
    
            <Row>
    
                <Col md={10} mdOffset={1}>
    
                    <Carousel 
                        prevIcon={<FontAwesome name="chevron-left" size="5x" />}
                        nextIcon={<FontAwesome name="chevron-right" size="5x" />}>
                        <Carousel.Item>
                            <img src="/images/genericpicture.jpg"/>
                        </Carousel.Item>
                    </Carousel>
    
                </Col>
    
            </Row>
    
        </section>
    
        <section id="home-results">

            <Row>

                <MatchResult />
                <MatchResult />
                <MatchResult />
                <MatchResult />
                <MatchResult />
                
                <Col md={2}>
                    <FontAwesome name="level-up" size="3x" />
                </Col>

            </Row>
		
        </section>
    
        <section id="home-updates">
    
            <Row>

                <Col md={8} id="news">
                </Col>

                <Col md={4} id="twitter">

                    <Timeline
                        dataSource={{
                        sourceType: 'profile',
                        screenName: 'TheDGL_org'
                        }}
                        options={{
                        username: 'TheDGL_org',
                        height: '400',
                        theme: 'dark'
                        }}
                    />

                </Col>
    
            </Row>
    
        </section>
  </div>
);           

const MatchResult = () => (

    <Col md={2} className="match-result">
        <header>
            TooL vs Rekt    
        </header>
        <div>
            hello world
        </div>
    </Col>
);

export default Index;