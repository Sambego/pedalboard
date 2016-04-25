export const ADD = 'pedalboard/ADD';
export const FETCH = 'pedalboard/FETCH';
export const REMOVE = 'pedalboard/REMOVE';
export const TOGGLE = 'pedalboard/TOGGLE';
export const UPDATE_PEDAL_PARAM = 'pedalboard/UPDATE_PEDAL_PARAM';

export function addPedal(pedal) {
    return {
        type: ADD,
        pedal
    };
};

export function removePedal(id) {
    return {
        type: REMOVE,
        id
    };
};

export function togglePedal(id) {
    return {
        type: TOGGLE,
        id
    };
};

export function updatePedalParam(id, field, value) {
    return {
        type: UPDATE_PEDAL_PARAM,
        id,
        field,
        value,
    };
};
