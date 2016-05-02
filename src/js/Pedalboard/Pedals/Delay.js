import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Delay extends Component {
    static propTypes = {
        effect: PropTypes.object.isRequired,
        fields: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(props) {
        for (let key in props.fields) {
            props.effect[key] = props.fields[key];
        }
    }

    updateState(field, value) {
        this.props.onUpdateEffectParam(this.props.id, field, value);
    }

    handleWetness(wetness) {
        this.updateState('wet', wetness.currentTarget.value);
    }

    handleSpeed(speed) {
        this.updateState('speed', speed.currentTarget.value);
    }

    handleDuration(duration) {
        this.updateState('duration', duration.currentTarget.value);
    }

    render() {
        const buttonClasses = classnames('button', 'button--full', {
            'button--active': this.props.fields.lowPassFilter
        });

        return (
            <div className="form">
                <div className="form__row">
                    <label className="form__label">
                        Wetness
                        <input
                            type="range"
                            name="wetness"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.wetness}
                            onChange={::this.handleWetness}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Speed
                        <input
                            type="range"
                            name="speed"
                            min="0"
                            max="5"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.speed}
                            onChange={::this.handleSpeed}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Duration
                        <input
                            type="range"
                            name="gain"
                            min="0"
                            max="0.9"
                            step="0.05"
                            className="input--range"
                            value={this.props.fields.duration}
                            onChange={::this.handleDuration}
                        />
                    </label>
                </div>
            </div>
        );
    }
}
