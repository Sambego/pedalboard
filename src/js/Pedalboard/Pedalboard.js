import React, {Component, PropTypes} from 'react';
import Pedal from './Pedal';

export default class PedalboardComponent extends Component {
    static propTypes = {
        pedals: PropTypes.array,
        pedalboard: PropTypes.object,
    };

    componentDidUpdate(props) {
        this.props.pedals.forEach((pedal, index) => {
            pedal.effect.disconnect();

            if (index === (this.props.pedals.length - 1)) {
                pedal.effect.connect(this.props.pedalboard.createOutput());
            } else {
                pedal.effect.connect(this.props.pedals[index+1].effect)
            }
        });
    }

    renderPedals() {
        return this.props.pedals.map((pedal, index) => {
            return <Pedal key={index} type={pedal.type} effect={pedal.effect}/>;
        });
    }

    render() {
        return (
            <section className="pedalboard">
                {this.renderPedals()}
            </section>
        );
    }
}
