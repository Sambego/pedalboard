import {connect} from 'react-redux';
import App from './App';
import * as actions from './PedalBoard/PedalboardActions';
import * as midiActions from './Midi/MidiActions';

const mapStateToProps = (state, props) => {
    return {
        pedals: state.getIn(['pedalboard', 'pedals'], []).map((value, id) => value.merge({id: id})).valueSeq().sortBy(pedal => pedal.get('order')).toJS(),
        midi: state.get('midi').toJS(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: pedal => {
            dispatch(actions.addPedal(pedal));
        },
        onRemove: id => {
            dispatch(actions.removePedal(id));
        },
        onToggle: id => {
            dispatch(actions.togglePedal(id));
        },
        onUpdateEffectParam: (id, field, value) => {
            dispatch(actions.updatePedalParam(id, field, value));
        },
        onMidiMessage: (message) => {
            dispatch(midiActions.onMidiMessage(message));
        },
        onProcessMidiMessage: () => {
            dispatch(midiActions.onProcessMidiMessage());
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
