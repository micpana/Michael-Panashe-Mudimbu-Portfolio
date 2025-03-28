import React, { Component } from 'react';
import './App.css';
import {
    Collapse, 
    Nav, NavItem, NavLink, 
    UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Input, InputGroup, InputGroupText,
    Button, Row, Col, Form, Container, Label
} from "reactstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import PageNotFound from './components/404/page_not_found'
import Home from './components/home/home'
import Projects from './components/projects/projects'
import Project from './components/projects/project';
import Services from './components/services/services'

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {

    }

    render() {
        return (
        <div className="App" style={{backgroundColor: '#FAFAFA', color: '#383838'}}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/projects' element={<Projects />}/>
                    <Route path='/projects/:project_title' element={<Project />}/>
                    <Route path='/services' element={<Services />}/>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>    
        </div>
        );
    }
}

export default withCookies(App);