import React, {Component, PropTypes} from 'react';

export default class Input extends Component {
    static propTypes = {
        pedalboard: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.input = props.effect;
        this.input.getUserMedia();
    }

    render() {
        return (
            <div>
                Input effect
            </div>
        );
    }
}
