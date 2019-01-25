import React, {Component} from 'react';
import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import {timerToggle} from './actions';

class MainScreen extends Component {
    onTimerToggle() {
        this.props.timerToggle(Date.now());
    }

    getTimerString() {
        let secs = this.props.seconds ? this.props.seconds : 0;
        const minutes = Math.trunc(Math.round(secs) / 60);
        const seconds = Math.round(secs) - (minutes * 60);
        return this.toOutput(minutes) + ':' + this.toOutput(seconds);
    }

    toOutput(number) {
        console.log(number);
        if (number > 9) {
            return number.toString();
        } else {
            return '0' + number;
        }
    }

    renderTest() {
        if (this.props.running) {
            return 'STOP';
        }

        return 'START';
    }

    render() {
        const {
            containerStyle,
            buttonStyle,
            buttonTextStyle,
            buttonRunningStyle
        } = styles;

        return (
            <SafeAreaView style={containerStyle}>
                <View>
                    <Text style={{alignSelf: 'center', fontSize: 27, color: '#000000'}}>
                        {this.getTimerString()}
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.onTimerToggle.bind(this)}
                        style={this.props.running ? buttonRunningStyle : buttonStyle}>
                        <Text style={buttonTextStyle}>{this.renderTest()}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    containerStyle: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    buttonStyle: {
        alignSelf: 'center',
        marginTop: 15,
        width: 260,
        height: 50,
        backgroundColor: '#00c0ed',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    buttonRunningStyle: {
        alignSelf: 'center',
        marginTop: 15,
        width: 260,
        height: 50,
        backgroundColor: '#ffc001',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 12
    }
};

const mountStateToProps = (state) => {
    const {running, timerStart, seconds} = state;

    return {running, timerStart, seconds};
};

export default connect(mountStateToProps, {timerToggle})(MainScreen);