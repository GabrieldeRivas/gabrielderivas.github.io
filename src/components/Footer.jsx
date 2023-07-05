import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className='row-footer'>
          <Col md={6} className='col-footer text-center'>
            <h4>Contact information:</h4>
            <p>Phone: +18 (555) 103-4111</p>
            <p>E-Mail: chromamixer@gmail.com</p>
            <p>Adress: St. Parker 252, Florida, United States.</p>
          </Col>
          <Col md={6} className='col-footer text-center'>
          <p className='logo'>Chroma<span className="logo-red">Mi</span><span className="logo-violet">x</span><span className='logo-blue'>er</span></p>
            <p>All rights reserved © 2023</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;