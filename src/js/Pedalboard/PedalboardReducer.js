import Immutable from 'Immutable';
import uuid from 'uuid';
import * as actions from './PedalboardActions';

export default function PedalboardReducer(state, action) {
    const pedalboard = state.get('pedalboard');
    const pedals = pedalboard.get('pedals');

    switch (action.type) {
        case actions.ADD:
            const highestOrderPedal = pedals.sortBy(pedal => pedal.order).last();
            const highestOrder = highestOrderPedal ? highestOrderPedal.get('order') + 1 : 1;

            return state.setIn(['pedalboard', 'pedals', uuid.v1()], Immutable.fromJS(action.pedal).merge({order: highestOrder}));
        case actions.REMOVE:
            return state.deleteIn(['pedalboard', 'pedals', action.id]);
        case actions.TOGGLE:
            return state.updateIn(['pedalboard', 'pedals', action.id], pedal => pedal.set('switchedOn', !pedal.get('switchedOn')));
        case actions.UPDATE_PEDAL_PARAM:
            return state.updateIn(['pedalboard', 'pedals', action.id, 'fields'], fields => fields.set(action.field, action.value));
        default:
            return state;
    }
}
