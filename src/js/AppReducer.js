import Immutable from 'immutable';
import uuid from 'uuid';
import * as pedalBoardActions from './Pedalboard/PedalboardActions';
import * as midiActions from './Midi/MidiActions';

export default function AppReducer(state, action, foo) {
    const pedalboard = state.get('pedalboard');
    const pedals = pedalboard.get('pedals');

    switch (action.type) {
        case pedalBoardActions.ADD:
            const highestOrderPedal = pedals.sortBy(pedal => pedal.order).last();
            const highestOrder = highestOrderPedal ? highestOrderPedal.get('order') + 1 : 1;

            return state.setIn(['pedalboard', 'pedals', uuid.v1()], Immutable.fromJS(action.pedal).merge({order: highestOrder}));
        case pedalBoardActions.REMOVE:
            return state.deleteIn(['pedalboard', 'pedals', action.id]);
        case pedalBoardActions.TOGGLE:
            return state.updateIn(['pedalboard', 'pedals', action.id], pedal => pedal.set('switchedOn', !pedal.get('switchedOn')));
        case pedalBoardActions.UPDATE_PEDAL_PARAM:
            return state.updateIn(['pedalboard', 'pedals', action.id, 'fields'], fields => fields.set(action.field, action.value));
        case midiActions.INCOMMING:
            return state.setIn(['midi', 'newEvent'], true).setIn(['midi', 'event'], action.event);
        case midiActions.PROCESSED:
            return state.setIn(['midi', 'newEvent'], false);
        default:
            return state;
    }
}
