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
import IntroImage from '../../images/intro_image.jpg'

class Intro extends Component{
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
                    {/* <title>Intro | {Platform_Name}</title> */}
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
                            <Row style={{marginTop: '35px'}}>
                                <Col xs="12" sm="9" md="9" className="order-2 order-md-1">
                                    <h1 style={{textAlign: 'left', fontWeight: 'bold', marginTop: '15px'}}>
                                        Hello, I'm Michael.
                                    </h1>
                                    <p style={{textAlign: 'left', marginTop: '15px'}}>
                                        I'm a software developer passionate about building intuitive and efficient digital solutions. I craft 
                                        seamless web and mobile experiences, from backend logic to frontend finesse, bringing ideas to life with 
                                        clean, efficient code. Let's build something amazing!
                                    </p>
                                    <br/>
                                    <div style={{position: 'relative', width: '100%'}}>
                                        <Button style={{backgroundColor: '#383838', position: 'absolute', left: 0}}>
                                            Download Resume
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs="12" sm="3" md="3" className="order-1 order-md-2">
                                    <img src={IntroImage} 
                                        style={{
                                            width: '100%', borderRadius: '10px', marginTop: '15px',
                                            border: '1px solid #F9C961'
                                        }}
                                    />
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

export default withCookies(Intro);