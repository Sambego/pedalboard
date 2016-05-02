import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import _ from 'lodash';

export default class Midi extends Component {
    static propTypes = {
        event: PropTypes.string,
        midi: PropTypes.object.isRequired,
        newEvent: PropTypes.bool,
        onMidiMessage: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.initializeMidi();

        this.state = {
            show: false,
        };
    }

    componentWillReceiveProps(props) {
        if (props.midi.newEvent) {
            this.showMidiEvent();
        }
    }

    initializeMidi() {
        if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
            window.navigator.requestMIDIAccess().then(midiAccess => {
                const devices = this.getMidiDevices(midiAccess);
                const currentDevice = _.find(devices, {name: 'Sambego'});

                if (currentDevice) {
                    currentDevice.onmidimessage = ::this.handleMidiMessage;
                }
            });
        }
    }

    getMidiDevices(midiAccess) {
        const devices = [];

        if (midiAccess.inputs && midiAccess.inputs.size > 0) {
            const inputs = midiAccess.inputs.values();
            let input = null;

            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                devices.push(input.value);
            }
        } else {
            console.log('No midi devices detected!');
        }

        return devices;
    }

    handleMidiMessage(msg) {
        const message = msg.data[1];

        if (message !== 0) {
            this.props.onMidiMessage(message);
        }
    }

    showMidiEvent() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        this.setState({
            show: true,
            timer: window.setTimeout(() => {
                this.setState({show: false});
            }, 500)
        })
    };

    render() {
        const {event} = this.props.midi;
        const classes = classnames('midi-overlay', {
            'midi-overlay--active': this.state.show
        });

        return (
            <div className={classes}>
                <p className="midi-event">{event}</p>
            </div>
        );
    }
}
