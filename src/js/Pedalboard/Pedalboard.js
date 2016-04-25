import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Pedal from './Pedal';

export default class PedalboardComponent extends Component {
    static propTypes = {
        onRemove: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        pedals: PropTypes.array,
        pedalboard: PropTypes.object,
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
                pedal.effect.connect(this.props.pedalboard.createOutput());
            } else {
                pedal.effect.connect(switchedOnPedals[index + 1].effect)
            }
        });
    }

    renderPedals() {
        return this.props.pedals.map((pedal, index) => {
            const props = {
                effect: pedal.effect,
                fields: pedal.fields,
                id: index,
                key: index,
                switchedOn: pedal.switchedOn,
                onRemove: this.props.onRemove,
                onToggle: this.props.onToggle,
                onUpdateEffectParam: this.props.onUpdateEffectParam,
                type: pedal.type,
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
