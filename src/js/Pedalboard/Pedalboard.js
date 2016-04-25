import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Pedal from './Pedal';

export default class PedalboardComponent extends Component {
    static propTypes = {
        onRemove: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        pedals: PropTypes.array,
        pedalboard: PropTypes.object,
    };

    componentWillUpdate(props) {
        this.props.pedals.forEach(pedal => {
            pedal.effect.disconnect();
        });
    }

    componentDidUpdate(props) {
        this.props.pedals.forEach((pedal, index) => {
            if (index === (this.props.pedals.length - 1)) {
                pedal.effect.connect(this.props.pedalboard.createOutput());
            } else {
                pedal.effect.connect(this.props.pedals[index + 1].effect)
            }
        });
    }

    renderPedals() {
        return this.props.pedals.map((pedal, index) => {
            const props = {
                id: index,
                key: index,
                type: pedal.type,
                effect: pedal.effect,
                fields: pedal.fields,
                onRemove: this.props.onRemove,
                onUpdateEffectParam: this.props.onUpdateEffectParam,
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
