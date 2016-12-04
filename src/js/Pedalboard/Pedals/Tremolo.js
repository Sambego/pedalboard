import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Tremolo extends Component {
    static propTypes = {
        effect: PropTypes.object.isRequired,
        fields: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.setProps(this.props);
    }

    componentWillReceiveProps(props) {
        this.setProps(props);
    }

    setProps(props) {
        for (let key in props.fields) {
            props.effect[key] = props.fields[key];
        }
    }

    updateState(field, value) {
        this.props.onUpdateEffectParam(this.props.id, field, value);
    }

    handleSpeed(speedRangeElement) {
        const speed = parseFloat(speedRangeElement.currentTarget.value);

        this.updateState('speed', speed);
    }

    render() {
        return (
            <div className="form">
                <div className="form__row">
                    <label className="form__label">
                        Speed
                        <input
                            type="range"
                            name="speed"
                            min="1"
                            max="10"
                            step="0.5"
                            className="input--range"
                            value={this.props.fields.speed}
                            onChange={::this.handleSpeed}
                        />
                    </label>
                </div>
            </div>
        );
    }
}
