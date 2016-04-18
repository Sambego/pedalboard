export const FETCH = 'pedalboard/FETCH';
export const ADD = 'pedalboard/ADD';
export const REMOVE = 'pedalboard/REMOVE';

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
