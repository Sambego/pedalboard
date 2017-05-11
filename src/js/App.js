import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
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
        audioContext: new AudioContext()
    };

    constructor(...args) {
        super(...args);

        /**
         * Setup the socket.
         */
        this.socket = io('pedalboard-socket.sambego.be');
        this.socket.on('remove effect', message => {
            console.log(`- Effect removed by ${message.name} (${message.id}):`, message);

            this.props.onRemove(message.id);
        });

        this.socket.on('update param', message => {
            console.log(`- Effect param updated ${message.param} to ${message.value}  by ${message.name} (${message.id}):`, message);

            this.props.onUpdateEffectParam(message.id, message.param, parseFloat(message.value));
        });
    }

    render() {
        const sidebarProps = {
            audioContext: this.props.audioContext,
            onAdd: this.props.onAdd,
            socket: this.socket,
        };

        const pedalboardProps = {
            audioContext: this.props.audioContext,
            midi: this.props.midi,
            onProcessMidiMessage: this.props.onProcessMidiMessage,
            onRemove: this.props.onRemove,
            onToggle: this.props.onToggle,
            onUpdateEffectParam: this.props.onUpdateEffectParam,
            pedals: this.props.pedals,
            socket: this.socket,
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
