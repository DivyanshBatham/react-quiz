import React, { Component } from 'react';

class Quizes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("Quiz", this.props);
        return ( <h1>Quizes list</h1> );
    }
}
 
export default Quizes;