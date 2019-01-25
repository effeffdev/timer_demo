import {TICK, TIMER_TOGGLED} from '../actions/types';

const INITIAL_STATE = {
    running: false,
    timerStart: null,
    seconds: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TIMER_TOGGLED:
            if (state.running) {
                return {...state, running: false, timerStart: null, seconds: 0};
            } else {
                return {...state, running: true, timerStart: action.payload};
            }
        case TICK:
            return {...state, seconds: Math.round(action.payload / 1000 - state.timerStart / 1000)};
        default:
            return state;
    }
}