import {TICK, TIMER_TOGGLED} from './types';

export const timerToggle = (timerStart) => {
    return {
        type: TIMER_TOGGLED,
        payload: timerStart
    }
};

export const tick = (currentTime) => {
    return {
        type: TICK,
        payload: currentTime
    }
};