import React, {Component} from 'react';
import {PermissionsAndroid, DeviceEventEmitter, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import {tick} from './actions';
import MainScreen from "./MainScreen";

const PHONE_STATE_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE;

export default class App extends Component {
    store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    interval = null;

    componentDidMount() {
        //TODO: bind event listener to stop and start timer accordingly
        DeviceEventEmitter.addListener('AppOpened', () => console.log('app opened'));
        DeviceEventEmitter.addListener('AppClosed', () => console.log('app closed'));
        DeviceEventEmitter.addListener('ScreenLocked', () => console.log('screen locked'));
        DeviceEventEmitter.addListener('PopupDetected', () => console.log('popup detected'));

        //check phone state permission
        PermissionsAndroid.check(PHONE_STATE_PERMISSION).then(chRes => {
            if (!chRes) {
                PermissionsAndroid.request(PHONE_STATE_PERMISSION).then(reRes => {
                    if (reRes) {
                        console.log('accepted read phone state permission');
                    } else {
                        console.log('declined read phone state permission');
                    }
                })
            }
        });
    }

    componentWillUnmount() {
        //TODO unbind event listener
    }

    render() {
        this.store.subscribe(() => {
            const {running} = this.store.getState();

            if (running && this.interval === null) {
                this.interval = setInterval(() => {
                    this.store.dispatch(tick(Date.now()));
                }, 1000)
            }

            if (!running && this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
            }
        });

        return(
            <Provider store={this.store}>
                <MainScreen/>
            </Provider>
        )
    }

}
