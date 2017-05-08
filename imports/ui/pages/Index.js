import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

var Tweets = new Mongo.Collection('tweets');

Meteor.subscribe('listTweets', {

    onReady: function () {
    // called when data is ready to be fetched
        console.log("*** Tweets:");
        console.log(Tweets.find().fetch());
    },

    onStop: function () {
    // called when data publication is stopped
    }
});

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

                    <h4>Update from 1.6</h4>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae ornare est, a finibus ex. Suspendisse a dolor ut mauris rhoncus sagittis vel nec diam. Cras nec tempus nulla, nec pellentesque lacus. Ut ligula velit, viverra ut libero sit amet, ullamcorper aliquam ante. Ut eu tellus tincidunt, dapibus velit vitae, auctor diam. Duis augue urna, semper ornare tempus vel, pharetra vitae diam. Suspendisse pellentesque tempor quam sed tincidunt. Proin ut venenatis nunc. Morbi at lorem rutrum, ultricies turpis eu, placerat risus. Maecenas vitae molestie felis, aliquam molestie dolor. Suspendisse potenti. Quisque vitae dolor a tellus blandit rutrum ac euismod urna. Donec et lorem lacinia, tincidunt sem vel, sagittis ante. Nam turpis enim, ornare ut enim in, dapibus porta nisl.

                    Maecenas efficitur nunc vel elit consectetur, venenatis accumsan ligula rhoncus. Donec eleifend metus lectus, nec volutpat justo egestas sit amet. Nam euismod magna ut enim aliquet scelerisque. Sed ante metus, sagittis sed blandit sed, gravida et nulla. Vivamus interdum ligula vitae ipsum lacinia porttitor. Suspendisse sit amet odio turpis. Quisque libero enim, consequat a est quis, hendrerit hendrerit ligula. In ex enim, dictum id rutrum vel, pulvinar quis massa. Aliquam diam nibh, auctor ac blandit eget, bibendum ultricies lectus. Mauris semper faucibus erat, ac vestibulum eros. Curabitur libero risus, rhoncus vitae ex non, iaculis fermentum magna. Aliquam finibus metus ligula, in volutpat magna finibus non. Donec arcu ligula, pharetra vel urna eu, rutrum malesuada risus.

                    Phasellus et auctor arcu. Suspendisse at eleifend diam. Duis ultrices dolor id nibh vulputate, quis sagittis metus viverra. In venenatis felis ac dapibus posuere. Donec semper at nunc nec tempor. Suspendisse tincidunt fermentum elit. Morbi vel nulla quam. Suspendisse nulla nulla, consequat a ultricies sit amet, tristique pharetra eros. Nam vestibulum odio a augue commodo venenatis. Quisque interdum facilisis mi, vel porttitor ipsum faucibus vel. Sed vitae vulputate justo, vitae viverra arcu. Aliquam eget tempor felis, tristique lobortis nibh. In hac habitasse platea dictumst. Vestibulum massa lacus, semper in urna vitae, bibendum pulvinar justo. Cras sit amet volutpat turpis, quis ornare nisi.

                </Col>

                <Col md={4} id="twitter">

                    Twitter

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