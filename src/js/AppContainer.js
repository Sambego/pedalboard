import {connect} from 'react-redux';
import App from './App';
import * as actions from './Pedalboard/PedalboardActions';

const mapStateToProps = (state, props) => {
    return {
        pedals: state.getIn(['pedalboard', 'pedals'], []).valueSeq().toJS(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (pedal) => {
            dispatch(actions.addPedal(pedal));
        },
        onDelete: (id) => {
            dispatch(actions.removePedal(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
