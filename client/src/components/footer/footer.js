import React, { Component, useReducer } from 'react';
import {
    Collapse, 
    Nav, NavItem, NavLink, 
    UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Input, InputGroup, InputGroupText,
    Button, Row, Col, Form, Container, Label
} from "reactstrap";
import { Helmet } from 'react-helmet'
import {
    Audio,
    BallTriangle,
    Bars,
    Circles,
    Grid,
    Hearts,
    Oval,
    Puff,
    Rings,
    SpinningCircles,
    TailSpin,
    ThreeDots,
} from '@agney/react-loading';
import { Platform_Name } from '../../config/platform_name';
import { Backend_Server_Address } from '../../config/backend_server_url';
import { Access_Token_Cookie_Name } from '../../config/access_token_cookie_name';
import { Unknown_Non_2xx_Message, Network_Error_Message, No_Network_Access_Message } from '../../tools/network_error_messages';
import Notification from '../../tools/notification_alert';
import LoadingScreen from '../../tools/loading_screen';
import InputErrors from '../../tools/input_errors';
import NetworkErrorScreen from '../../tools/network_error_screen';
import { IsEmailStructureValid, IsPasswordStructureValid } from '../../tools/input_syntax_checks'
import {  } from '../../config/credentials'
import { Github, LinkedIn, X } from '../../config/social_links'
import Modal from '../../tools/modal';
import DateTimeDisplay from '../../tools/timezone_conversion'
import Logo from '../../images/logo.png'
import { FaMailBulk, Whatsapp, FaTelegram, FaPhone, FaSearchLocation, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp, FaLocationArrow, FaPhoneAlt, FaGithub, FaLink } from 'react-icons/fa';

class Footer extends Component{
    constructor(props) { 
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    
    }

    render() {
        return (
            <div  style={{minHeight: '50px', backgroundColor: '#EEECEC'}}>
                <Container>
                    <Row>
                        <Col sm='8'>
                            <div style={{fontSize: '14px', fontWeight: 300, paddingTop: '10px'}}>
                                &copy; 2025 {Platform_Name}
                            </div>
                        </Col>
                        <Col sm='4'>
                            <div style={{paddingTop: '10px'}}>
                                <a href={LinkedIn} target='_blank'  rel='noreferrer' style={{color: 'inherit'}}>
                                    <FaLinkedin size='20px' style={{marginLeft: '5px', marginRight: '5px', cursor: 'pointer'}}/>
                                </a>
                                <a href={Github} target='_blank'  rel='noreferrer' style={{color: 'inherit'}}>
                                    <FaGithub size='20px' style={{marginLeft: '5px', marginRight: '5px', cursor: 'pointer'}}/>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Footer;