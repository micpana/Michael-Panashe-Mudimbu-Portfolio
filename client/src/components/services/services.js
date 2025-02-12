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
import { FaBrain, FaCode, FaGlobe, FaTablet, FaTelegram, FaWhatsapp } from 'react-icons/fa';
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
                <Helmet>
                    <title>Services | {Platform_Name}</title>
                    {/* <meta name="description" content="" /> */}
                </Helmet>
                <ToastContainer />
                {
                    this.state.loading === true
                    ? <LoadingScreen />
                    : this.state.network_error_screen === true
                    ? <NetworkErrorScreen error_message={this.state.network_error_message} retryFunction={this.state.retry_function} />
                    : <div>
                        <Container>
                            <br/><br/>
                            <h3 style={{fontWeight: 'bold'}}>
                                Services
                            </h3>
                            <br/><br/><br/>
                            <Container>
                                <Row id='Web Development' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaGlobe size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                Web Development
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['Web Development'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row id='Mobile Development' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaTablet size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                Mobile Development
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['Mobile Development'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row id='AI Systems Development' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaBrain size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                AI Systems Development
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['AI Systems Development'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row id='WhatsApp Chatbots' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaWhatsapp size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                WhatsApp Chatbots
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['WhatsApp Chatbots'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row id='Telegram Bots' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaTelegram size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                Telegram Bots
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['Telegram Bots'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                                <Row id='Custom Software Solutions' style={{borderRadius: '20px', textAlign: 'left', marginBottom: '30px', backgroundColor: '#4A4A4A'}}>
                                    <Col sm='3' style={{backgroundColor: '#4A4A4A', color: '#ffffff', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '30px', marginBottom: '30px'}}>
                                            <FaCode size='20px' />
                                            <h5 style={{marginTop: '10px'}}>
                                                Custom Software Solutions
                                            </h5>
                                        </Container>
                                    </Col>
                                    <Col sm='9' style={{backgroundColor: '#EEECEC', borderRadius: 'inherit'}}>
                                        <Container style={{marginTop: '15px', marginBottom: '30px'}}>
                                            <p  style={{textAlign: 'left', fontWeight: 400, whiteSpace: 'pre-line'}}>
                                                {ServicesData['Custom Software Solutions'].details}
                                            </p>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </div>
                }
                <br/><br/><br/>
            </div>
        );
    }

};

export default withCookies(Services);