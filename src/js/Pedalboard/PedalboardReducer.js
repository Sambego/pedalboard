import Immutable from 'Immutable';
import * as actions from './PedalboardActions';

export default function PedalboardReducer(state, action) {
    const pedalboard = state.get('pedalboard');
    const pedals = pedalboard.get('pedals');

    switch (action.type) {
        case actions.ADD:
            return state.setIn(['pedalboard', 'pedals', `${pedals.count()}`], Immutable.fromJS(action.pedal));
        case actions.REMOVE:
            return state.deleteIn('pedalboard', 'pedals', `${action.id}`);
        default:
            return state;
    }
}
