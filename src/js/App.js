import React, {Component, PropTypes} from 'react';
import Pedalboard from 'pedalboard';
import Sidebar from './Sidebar/Sidebar';
import PedalboardComponent from './Pedalboard/Pedalboard';
import Midi from './Midi/Midi'

export default class App extends Component {
    static propTypes = {
        midi: PropTypes.object.isRequired,
        onAdd: PropTypes.func.isRequired,
        onMidiMessage: PropTypes.func.isRequired,
        onProcessMidiMessage: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        pedals: PropTypes.array,
    };

    static defaultProps = {
        pedalboard: new Pedalboard()
    };

    render() {
        const sidebarProps = {
            onAdd: this.props.onAdd,
            pedalboard: this.props.pedalboard,
        };

        const pedalboardProps = {
            midi: this.props.midi,
            onProcessMidiMessage: this.props.onProcessMidiMessage,
            onRemove: this.props.onRemove,
            onToggle: this.props.onToggle,
            onUpdateEffectParam: this.props.onUpdateEffectParam,
            pedalboard: this.props.pedalboard,
            pedals: this.props.pedals,
        };

        const midiProps = {
            midi: this.props.midi,
            onMidiMessage: this.props.onMidiMessage,
        };

        return (
            <div className="container">
                <Sidebar className="sidebar" {...sidebarProps}/>
                <PedalboardComponent className="pedalboard" {...pedalboardProps}/>
                <Midi {...midiProps}/>
            </div>
        );
    }
}
