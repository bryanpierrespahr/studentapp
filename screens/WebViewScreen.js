import React, {Component} from 'react'
import {
   WebView
} from 'react-native'

class WebViewScreen extends Component {

    constructor(props){
        super(props);
        this.state = {uri: ''};
    }

    componentDidMount(){

        this.setState({
            uri: this.props.navigation.getParam('uri', 'default'),
        })

    }

    render(){
        return(
            <WebView
                source={{uri: this.state.uri}}
            />
        )
    }
}

export default WebViewScreen;
