import React, {Component, PropTypes} from 'react';
import Pedalboard from 'pedalboard';
import Pedal from './Pedal';

export default class PedalboardComponent extends Component {
    constructor(props) {
        super(props)

        this.pedalboard = new Pedalboard();
    }

    render() {
        return (
            <div className="pedalboard__inner">
                <Pedal type="input" pedalboard={this.pedalboard}/>
                <Pedal type="volume" pedalboard={this.pedalboard}/>
            </div>
        );
    }
}
