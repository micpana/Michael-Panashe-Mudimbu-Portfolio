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
import { ProjectsData } from '../../data/projects_data';
import { FaChevronLeft, FaChevronRight, FaLink } from 'react-icons/fa';

class Projects extends Component{
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
            slide_autoplay: true,
            current_image_index: 0,
            project: {images: [], description: ''}
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

        this.NextSlide = () => {
            const { project, current_image_index } = this.state;
            this.setState({
                current_image_index: (current_image_index + 1) % project.images.length,
            });
        };
        
        this.PrevSlide = () => {
            const { project, current_image_index } = this.state;
            this.setState({
                current_image_index: current_image_index === 0 ? project.images.length - 1 : current_image_index - 1,
            });
        };

        this.AutoSlide = () => {
            if (this.state.slide_autoplay == true){
                this.NextSlide()
            }
        }
    }

    componentDidMount() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.setState({
                on_mobile: true
            })
        }

        const path = window.location.pathname.split('/')
        const project_title = decodeURIComponent(path[path.length -1])

        const findItemByTitle = (array, title) => array.find(item => item.title === title);
        const project_data = findItemByTitle(ProjectsData, project_title)
        
        this.setState({project: project_data})

        // auto slide every n milliseconds
        // setInterval(this.AutoSlide, 5000);
    }

    render() {
        const path = window.location.pathname.split('/')
        const project_title = decodeURIComponent(path[path.length -1])

        var project = this.state.project

        return (
            <div>
                <Helmet>
                    <title>{project_title} | {Platform_Name}</title>
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
                            <h1 style={{fontWeight: 'bold'}}>
                                {project.title}
                            </h1>
                            <br/><br/><br/>
                            <Container>
                                <div style={{height: '340px', overflow: 'hidden', position: 'relative', backgroundColor: '#FFFFFF'}}
                                    onMouseOver={() => this.setState({slide_autoplay: false})} 
                                    onMouseLeave={() => this.setState({slide_autoplay: true})}
                                >
                                    <div style={{
                                        width: '100%', height: '100%', backgroundImage: `url(${project.images[this.state.current_image_index]})`, 
                                        backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
                                    ></div>
                                    <FaChevronLeft onClick={this.PrevSlide} style={{position: 'absolute', left: 20, top: 150, cursor: 'pointer'}} />
                                    <FaChevronRight onClick={this.NextSlide} style={{position: 'absolute', right: 20, top: 150, cursor: 'pointer'}} />
                                </div>
                                <p style={{marginTop: '10px', fontWeight: 200}}>
                                    Image {this.state.current_image_index+1} of {this.state.project.images.length}
                                </p>
                                <h6 style={{fontWeight: 400, textAlign: 'left', marginTop: '10px', fontSize: '12px'}}>
                                    {project.category}
                                </h6>
                                <p style={{textAlign: 'left', marginTop: '10px', fontWeight: 300, whiteSpace: 'pre-line'}}>
                                    {project.description}
                                </p>
                                <p style={{textAlign: 'left', marginTop: '30px'}}>
                                    {project.technologies}
                                </p>
                                <Row style={{marginTop: '30px', textAlign: 'left'}}>
                                    <Col sm='4'>
                                        <FaLink /> Main Url:
                                        <br/>
                                        <a href={project.main_url} target='_blank'  rel='noreferrer' 
                                            style={{color: 'inherit', textDecoration: 'none'}}
                                        >
                                            {project.main_url}
                                        </a>
                                        <br/><br/>
                                    </Col>
                                    <Col sm='4'>
                                        
                                    </Col>
                                    <Col sm='4'>
                                        <FaLink /> Backup Url:
                                        <br/>
                                        <a href={project.backup_url} target='_blank'  rel='noreferrer' 
                                            style={{color: 'inherit', textDecoration: 'none'}}
                                        >
                                            {project.backup_url}
                                        </a>
                                        <br/><br/>
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

export default withCookies(Projects);