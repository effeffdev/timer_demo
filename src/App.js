import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import {tick} from './actions';
import MainScreen from "./MainScreen";

export default class App extends Component {
    store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    interval = null;

    componentWillMount() {
        //TODO: bind event listener to stop and start timer accordingly
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
