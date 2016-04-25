import Immutable from 'Immutable';
import * as actions from './PedalboardActions';

export default function PedalboardReducer(state, action) {
    const pedalboard = state.get('pedalboard');
    const pedals = pedalboard.get('pedals');

    switch (action.type) {
        case actions.ADD:
            const uuid = pedals.count();
            return state.setIn(['pedalboard', 'pedals', uuid], Immutable.fromJS(action.pedal));
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
