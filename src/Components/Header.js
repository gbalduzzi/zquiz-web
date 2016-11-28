import React, { Component } from 'react';
import { Link } from 'react-router';

import {getCookie} from '../Utils/cookie.js';
import Message from '../Utils/message.js';

import logo from '../Images/Logo@3x.png';

function itemObj(link, value) {
    return {
        url: link,
        text: value
    }
}

function getItemsByRoute(route) {
    var items = [];
    var cookie = getCookie('user_token');

    switch(route) {
        case '/':
            if(cookie) items.push(itemObj('/user', 'Profilo'))
            else {
                items.push(itemObj('/login', 'Login'))
                items.push(itemObj('/register', 'Registrati'))
            }
            break;
        case '/login':
            items.push(itemObj('/', 'Homepage'))
            items.push(itemObj('/register', 'Registrati'))
            break;
        case '/register':
            items.push(itemObj('/', 'Homepage'))
            items.push(itemObj('/login', 'Login'))
            break;
        case '/searchMatch':
            items.push(itemObj('/user', 'Profilo'))
            break;
        default:
            items.push(itemObj('/', 'Homepage'))
    }

    if (cookie) items.push(itemObj('/logout', 'Logout'))
    return items;
}


// Component to create the top header of the app
class Header extends Component {
    constructor(props){
        super(props)
        this.prevPathname = props.pathname
    }
    // Imposto i link della pagina iniziale
    componentWillMount() {
        this.state = {
            data: getItemsByRoute(this.props.pathname)
        }
    }
    // Cambio i link se la pagina si aggiorna
    componentWillReceiveProps(nextProps) {
          if (nextProps.pathname !== this.prevPathname) {
              this.setState({
                  data : getItemsByRoute(nextProps.pathname)
              });
              this.prevPathname = nextProps.pathname
              Message.setFlush(true)
          }
    }
    render() {
        //var linkArray = getItemsByRoute(this.props.pathname);
        var links = this.state.data.map(function(item) {
            return (
                <HeaderItem link={item.url} key={Math.random()*1000}>{item.text}</HeaderItem>
            );
        });
        return (
            <div id="header">
                <div className="page-wrapper">
                    <div id="logo">
                        <Link to={`/`}>
                            <img src={logo} className="logo-img" alt="Zquiz logo" />
                        </Link>
                    </div>
                    <div className="space-fill"></div>
                    {links}
                </div>
            </div>
        );
    }
}

class HeaderItem extends Component {
  render() {
    return (
        <Link to={this.props.link} className="header-item">
            {this.props.children}
        </Link>
    );
  }
}

export default Header;
