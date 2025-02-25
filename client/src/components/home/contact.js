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
import { FaAt, FaEnvelope, FaEnvelopeOpenText, FaLinkedin, FaTwitter, FaUserAlt } from 'react-icons/fa';

class Contact extends Component{
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
            on_mobile: false,
            name: '',
            email: '',
            message: ''
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

        this.Contact = (e) => {
            e.preventDefault()
            
            // initialize variable to store input validation status
            var data_checks_out = true

            // clear existing input errors if any
            this.ClearInputErrors()

            // validate input data
            if (this.state.name === ''){ this.SetInputError('name', 'required'); data_checks_out = false }
            if (this.state.email === ''){ this.SetInputError('email', 'required'); data_checks_out = false }
            if (IsEmailStructureValid(this.state.email) === false){ this.SetInputError('email', 'invalid'); data_checks_out = false }
            if (this.state.message === ''){ this.SetInputError('message', 'required'); data_checks_out = false }

            // check data collection status
            if (data_checks_out === false){ // user needs to check their input data
                Notification('Check input fields for errors.', 'error')
            }else{ // send data to server
                this.LoadingOn()

                alert('Contact form under construction. Please use the email provided to contact me.')

                // loading off
                this.LoadingOff()
            }
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
                    {/* <title>Contact | {Platform_Name}</title> */}
                    {/* <meta name="description" content="" /> */}
                {/* </Helmet> */}
                <ToastContainer />
                {
                    this.state.loading === true
                    ? <LoadingScreen />
                    : this.state.network_error_screen === true
                    ? <NetworkErrorScreen error_message={this.state.network_error_message} retryFunction={this.state.retry_function} />
                    : <div id='Contact'>
                        <Container>
                            <h1 style={{textAlign: 'left', fontWeight: 'bold'}}>
                                Contact Me
                            </h1>
                            <br/>
                            <Row style={{textAlign: 'left'}}>
                                <Col sm='6'>
                                    <Row style={{marginTop: '20px'}}>
                                        <Col sm='1'>
                                            <FaEnvelope size='20px' /> 
                                        </Col>
                                        <Col sm='1'>
                                            <a href="mailto:michaelmudimbu@gmail.com" style={{color: 'inherit', textDecorationLine: 'none'}}>
                                                {' '}michaelmudimbu@gmail.com
                                            </a>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '50px'}}>
                                        <Col xs='1' sm='1'>
                                            <a href={LinkedIn} target='_blank'  rel='noreferrer' style={{color: 'inherit'}}>
                                                <FaLinkedin size='20px' /> 
                                            </a>
                                        </Col>
                                        <Col xs='1' sm='1'>
                                            <a href={X} target='_blank'  rel='noreferrer' style={{color: 'inherit'}}>
                                                <FaTwitter size='20px' /> 
                                            </a>
                                        </Col>
                                    </Row>
                                    <br/><br/>
                                </Col>
                                <Col sm='6'>
                                    <Form onSubmit={this.Contact}>
                                        <Label style={{fontWeight: 'bold'}}>Name <span style={{color: 'red'}}>*</span></Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <FaUserAlt style={{margin:'10px'}}/>
                                            </InputGroupText>
                                            <Input style={{backgroundColor: 'inherit'}}
                                                placeholder="Your name" name="name" id="name"
                                                value={this.state.name} onChange={this.HandleChange} type="text" 
                                            />
                                        </InputGroup>
                                        <InputErrors field_error_state={this.state.input_errors['name']} field_label='Name' />
                                        <br/>
                                        <Label style={{fontWeight: 'bold'}}>Email <span style={{color: 'red'}}>*</span></Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <FaAt style={{margin:'10px'}}/>
                                            </InputGroupText>
                                            <Input style={{backgroundColor: 'inherit'}}
                                                placeholder="Your email" name="email" id="email"
                                                value={this.state.email} onChange={this.HandleChange} type="text" 
                                            />
                                        </InputGroup>
                                        <InputErrors field_error_state={this.state.input_errors['email']} field_label='Email' />
                                        <br/>
                                        <Label style={{fontWeight: 'bold'}}>Message <span style={{color: 'red'}}>*</span></Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <FaEnvelopeOpenText style={{margin:'10px'}}/>
                                            </InputGroupText>
                                            <Input style={{backgroundColor: 'inherit'}}
                                                placeholder="Your message" name="message" id="message"
                                                value={this.state.message} onChange={this.HandleChange} type="textarea" rows={5}
                                            />
                                        </InputGroup>
                                        <InputErrors field_error_state={this.state.input_errors['message']} field_label='Message' />
                                        <br/><br/>
                                        <Button type="submit"
                                            style={{backgroundColor: '#ffffff', color: '#383838', fontWeight: 'bold', border: '1px solid #383838', borderRadius: '20px', width: '180px'}}
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
                <br/><br/><br/>
            </div>
        );
    }

};

export default withCookies(Contact);