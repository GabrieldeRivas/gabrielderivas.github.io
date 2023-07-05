import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';

const About = () => {
    return (
        <Container className='container-about'>
            <Row>
                <Col>
                    <p id="ancla-about" className='ancla'></p>
                    <h2 id='title-about'>About Us - Chroma Mixer</h2>
                    <p>Welcome to Chroma Mixer, your ultimate destination for exploring colors, blending hues, and creating beautiful palettes. We are online platform designed to provide you with a plethora of tools for obtaining random colors, mixing them together, and discovering stunning color schemes.</p>
                    <p>At Chroma Mixer, we understand the power of colors and their ability to inspire and transform any creative project. Whether you are a graphic designer, web developer, artist, or simply someone with a passion for aesthetics, our platform is here to fuel your imagination and help you bring your ideas to life.</p>
                    <p>Note: Chroma Mixer does not own the rights to the colors generated or the palettes provided. They are solely intended for inspirational and creative purposes.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;