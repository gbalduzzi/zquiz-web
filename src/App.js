import React, { Component } from 'react';
import Header from './Components/Header.js';

import {getCookie} from './Utils/cookie.js';
import Message from './Utils/message.js'

// Layout common to all pages

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages : []
        }
        this.deleteItem = this.deleteItem.bind(this)
    }
    componentDidMount() {
        this.messageTimer = setInterval(
            () => this.messages(),
            250
        );
    }
    componentWillMount() {
        this.checkLogged(this.props);
    }
    componentWillUnmount() {
        clearInterval(this.messageTimer)
    }
    componentWillReceiveProps(nextProps) {
        this.checkLogged(nextProps)
    }
    checkLogged(props) {
        var userLogged = getCookie('user_token') ? true : false
        var actualPath = props.location.pathname

        if (userLogged && (actualPath === '/login' || actualPath === '/register'))
            props.router.push('/user')
        else if(!userLogged && actualPath !== '/login' && actualPath !== '/register' && actualPath !== '/')
            props.router.push('/')
    }
    messages() {
        if (Message.getFlush()) {
            this.setState({
                messages: []
            })
            Message.setFlush(false)
        } else {
            var messages = Message.getMessages()
            if (messages[0]) {
                messages = this.state.messages.concat(messages)
                this.setState({
                    messages : messages
                })
            }
        }

    }
    deleteItem(e) {
        var index = e.target.getAttribute('data-id')
        this.state.messages.splice(index,1)
        this.setState({
            messages: this.state.messages
        })
    }
    render() {
        var messages = this.state.messages.map(function(item,index) {
            return (
                <MessageItem type={item.type} index={index} key={Math.random()*1000} deleteMessage={this.deleteItem}>
                    {item.message}
                </MessageItem>
            );
        }.bind(this));
        return (
            <div className="App page-wrapper">
                <Header pathname={this.props.location.pathname} />
                {messages}
                {this.props.children}
            </div>
        );
    }
}

class MessageItem extends Component {
    render() {
        return (
            <div className={this.props.type + " message"}>
                {this.props.children}
                <span onClick={this.props.deleteMessage} className="deleteMessage" data-id={this.props.index}>x</span>
            </div>
        );
    }
}
export default App;
