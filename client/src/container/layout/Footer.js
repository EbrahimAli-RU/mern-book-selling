import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

const Footer = () => (
    <div className='footer'>
        <Container>
            <Row>
                <Col md='4'>About</Col>
                <Col md='4'>Career</Col>
                <Col md='4'><Link to="/" className='footer__link'>Instagram</Link></Col>
            </Row>
            <Row>
                <Col md='4'>Help us</Col>
                <Col md='4'>Advise us</Col>
                <Col md='4'><Link to="/" className='footer__link'>Facebook</Link></Col>
            </Row>
            <Row>
                <Col md='4'>Contact us</Col>
                <Col md='4'>I like Som tum</Col>
                <Col md='4'><Link to="/" className='footer__link'>Pinterest</Link></Col>
            </Row>
            <Row>
                <Col md='12' className='footer__copyright'>Copyright your website © 2021 All Rights Reserved</Col>
            </Row>
        </Container>
    </div>
)

export default Footer;