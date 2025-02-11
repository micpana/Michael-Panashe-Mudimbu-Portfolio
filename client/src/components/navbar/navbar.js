import React, { Component, useReducer } from 'react';
import {
    Collapse, 
    Navbar, Nav, NavbarToggler, NavbarBrand, NavItem, NavLink, 
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
import axios from 'axios';
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
import Logo from '../../images/logo.png'
import { FaMoon, FaSun } from 'react-icons/fa';

class NavBar extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            on_mobile: false,
            loading: false,
            dark_mode_on: false
        };    
        
        this.HandleChange = (e) =>{
            this.setState({[e.target.name]: e.target.value});
        };

        this.LoadingOn = () => {
            this.setState({loading: true})
        }

        this.LoadingOff = () => {
            this.setState({loading: false})
        }

        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };

        this.dtoggle = () => {
            this.setState(prevState => ({
                dropdownOpen2: !prevState.dropdownOpen
            }));
        }
  
        this.onMouseEnter = () => {
            this.setState({dropdownOpen: true});
        };
      
        this.onMouseLeave = () => {
            this.setState({dropdownOpen: false});
        };
    }

    componentDidMount() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.setState({
                on_mobile: true
            })
        }
    }

    render() {
        // user
        var user_details = this.state.user_details

        return (
            <Navbar light expand="md" sticky='top' style={{backgroundColor: '#EEECEC', borderBottom: '1px solid #F9C961'}}>
                <NavbarBrand href="/" style={{marginBottom: '0px', height: '70px', marginLeft: '10px'}}>
                    {/* <img src={Logo} style={{width: '100%'}} />  */}
                    <div style={{fontWeight: 'bold', marginTop: 15}}>
                        MPM
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} style={{backgroundColor: '#EEECEC'}}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: '#EEECEC'}}>
                        <NavItem>
                            <NavLink href='/' style={{}}>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/projects' style={{}}>
                                Projects
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/services' style={{}}>
                                Services
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/tools' style={{}}>
                                Tools
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/#Contact' style={{}}>
                                Contact
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink></NavLink>
                        </NavItem>
                    </Nav>
                    <div style={{marginLeft: '10px', marginRight: '10px'}}>
                        {
                            this.state.dark_mode_on === true
                            ? <FaSun color='gold'/>
                            : <FaMoon color='black'/>
                        }
                    </div>
                </Collapse>
            </Navbar>
        );
    }

};

export default withCookies(NavBar);