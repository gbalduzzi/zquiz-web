import React, { Component } from 'react';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

function test(json) {
    console.log(json)
}

class SearchMatch extends Component {
    constructor(props) {
        super(props)
    }
    checkMatch() {
        Api.searchMatch(test)
    }
    componentDidMount() {
        this.searchTimer = setInterval(
            this.checkMatch,
            1500
        )
    }
    componentWillUnmount() {
        clearInterval(this.searchTimer)
    }
    render() {
        return (
            <div className="searchMatch">
                <div className="loaderWrapper">
                    <div className="loader"></div>
                </div>
                <div className="content">
                    Alla ricerca di un avversario..
                </div>
            </div>
        );
    }
}


export default SearchMatch;
