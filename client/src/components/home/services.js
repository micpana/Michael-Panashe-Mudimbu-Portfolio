import React, { Component, useReducer } from 'react';
import {
    Collapse, 
    Nav, NavItem, NavLink, 
    UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Input, InputGroup, InputGroupText,
    Button, Row, Col, Form, Container, Label
} from "reactstrap";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
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
import { ToastContainer, toast } from 'react-toastify';
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
import { LinkedIn, X } from '../../config/social_links'
import Modal from '../../tools/modal';
import DateTimeDisplay from '../../tools/timezone_conversion'
import { FaBrain, FaCode, FaGlobe, FaRobot, FaTablet, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { ServicesData } from '../../data/services_data';

class Services extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
        super(props);
        this.state = {
            loading: false,
            network_error_screen: false,
            network_error_message: '',
            retry_function: null,
            input_errors: {},
            on_mobile: false
        };

        this.HandleChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };

        this.SetInputError = (field, error) => { // error -> required / invalid
            // existing errors
            var existing_errors = this.state.input_errors

            // existing errors modified
            existing_errors[field] = error

            // update state
            this.setState({input_errors: existing_errors})
        }

        this.ClearInputErrors = () => {
            // existing errors
            var existing_errors = this.state.input_errors
            // array of existing error field names
            var existing_error_fields = Object.keys(existing_errors)
            // set existing error fields to undefined, clearing them
            existing_error_fields.map((item, index) => {
                existing_errors[item] = undefined
            })
            this.setState({input_errors: existing_errors})
        }

        this.LoadingOn = () => {
            this.setState({loading: true})
        }

        this.LoadingOff = () => {
            this.setState({loading: false})
        }

        this.NetworkErrorScreenOn = (error_message, retry_function) => {
            this.setState({network_error_screen: true, network_error_message: error_message, retry_function: retry_function})
        }

        this.NetworkErrorScreenOff = () => {
            this.setState({network_error_screen: false, network_error_message: '', retry_function: null})
        }
    }

    componentDidMount() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.setState({
                on_mobile: true
            })
        }
    }

    render() {
        return (
            <div>
                {/* <Helmet> */}
                    {/* <title>Services | {Platform_Name}</title> */}
                    {/* <meta name="description" content="" /> */}
                {/* </Helmet> */}
                <ToastContainer />
                {
                    this.state.loading === true
                    ? <LoadingScreen />
                    : this.state.network_error_screen === true
                    ? <NetworkErrorScreen error_message={this.state.network_error_message} retryFunction={this.state.retry_function} />
                    : <div>
                        <Container>
                            <h1 style={{textAlign: 'left', fontWeight: 'bold'}}>
                                Services
                            </h1>
                            <br/>
                            <Row>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaGlobe size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                Web Development
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['Web Development'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Web Development'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Web Development'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#Web Development'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaTablet size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                Mobile Development
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['Mobile Development'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Mobile Development'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Mobile Development'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#Mobile Development'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaBrain size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                AI Systems Development
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['AI Systems Development'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['AI Systems Development'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['AI Systems Development'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#AI Systems Development'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaWhatsapp size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                WhatsApp Chatbots
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['WhatsApp Chatbots'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['WhatsApp Chatbots'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['WhatsApp Chatbots'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#WhatsApp Chatbots'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaTelegram size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                Telegram Bots
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['Telegram Bots'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Telegram Bots'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Telegram Bots'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#Telegram Bots'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                                <Col sm='4'>
                                    <Container style={{
                                            backgroundColor: '#4A4A4A', minHeight: '340px', borderRadius: '20px', marginBottom: '30px',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Container style={{textAlign: 'left', paddingTop: '40px'}}>
                                            <FaCode size='40px' />
                                            <h4 style={{marginTop: '30px'}}>
                                                Custom Software Solutions
                                            </h4>
                                            <p style={{fontSize: '14px', marginTop: '20px'}}>
                                                {
                                                    ServicesData['Custom Software Solutions'].length <= 140
                                                    ? <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Custom Software Solutions'].details}
                                                    </p>
                                                    : <p style={{textAlign: 'left', fontWeight: 400}}>
                                                        {ServicesData['Custom Software Solutions'].details.substring(0, 140)}...
                                                    </p>
                                                }
                                            </p>
                                            <h6 style={{cursor: 'pointer', fontWeight: 500, fontSize: '13px', marginTop: '20px'}} 
                                                onClick={() => window.location.href = './services/#Custom Software Solutions'}
                                            >
                                                Learn more
                                            </h6>
                                        </Container>
                                    </Container>
                                </Col>
                            </Row>
                            <h6 style={{
                                    textAlign: 'left', cursor: 'pointer', textDecorationLine: 'underline', marginTop: '15px', fontWeight: 700
                                }} 
                                onClick={() => window.location.href = './services/'}
                            >
                                All services
                            </h6>
                        </Container>
                    </div>
                }
                <br/><br/><br/>
            </div>
        );
    }

};

export default withCookies(Services);