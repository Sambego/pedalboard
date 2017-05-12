import React, {Component, PropTypes} from 'react';
import {Output} from 'audio-effects';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Pedal from './Pedal';

export default class PedalboardComponent extends Component {
    static propTypes = {
        audioContext: PropTypes.object,
        midi: PropTypes.object.isRequired,
        onProcessMidiMessage: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        pedals: PropTypes.array,
    };

    componentWillUpdate() {
        this.props.pedals.forEach(pedal => {
            pedal.effect.disconnect();
        });
    }

    componentDidUpdate() {
        const switchedOnPedals = this.props.pedals.filter(pedal => {
            return pedal.switchedOn;
        });

        switchedOnPedals.forEach((pedal, index) => {
            if (index === (switchedOnPedals.length - 1)) {
                pedal.effect.connect(new Output(this.props.audioContext));
            } else {
                pedal.effect.connect(switchedOnPedals[index + 1].effect);
            }
        });
    }

    renderPedals() {
        return this.props.pedals.map(pedal => {
            const props = {
                effect: pedal.effect,
                fields: pedal.fields,
                id: pedal.id,
                key: pedal.id,
                midi: this.props.midi,
                switchedOn: pedal.switchedOn,
                onProcessMidiMessage: this.props.onProcessMidiMessage,
                onRemove: this.props.onRemove,
                onToggle: this.props.onToggle,
                onUpdateEffectParam: this.props.onUpdateEffectParam,
                order: pedal.order,
                type: pedal.type,
                name: pedal.name,
            };

            return <Pedal {...props}/>;
        });
    }

    render() {
        return (
            <section className="pedalboard">
                <ReactCSSTransitionGroup transitionName="pedal-transition" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    {this.renderPedals()}
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}
