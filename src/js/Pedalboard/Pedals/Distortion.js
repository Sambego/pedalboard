import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Distortion extends Component {
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

    handleIntensity(intensity) {
        this.updateState('intensity', intensity.currentTarget.value);
    }

    handleGain(gain) {
        this.updateState('gain', gain.currentTarget.value);
    }

    handleLowPassFilter() {
        this.updateState('lowPassFilter', !this.props.fields.lowPassFilter);
    }

    render() {
        const lowPassFilterLabel = `Turn lowpass-filter ${this.props.fields.lowPassFilter ? 'off' : 'on'}`;
        const buttonClasses = classnames('button', 'button--full', {
            'button--active': this.props.fields.lowPassFilter
        });

        return (
            <div className="form">
                <div className="form__row">
                    <label className="form__label">
                        intensity
                        <input
                            type="range"
                            name="intensity"
                            min="1"
                            max="100"
                            step="2"
                            className="input--range"
                            value={this.props.fields.intensity}
                            onChange={::this.handleIntensity}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Gain
                        <input
                            type="range"
                            name="gain"
                            min="1"
                            max="150"
                            step="5"
                            className="input--range"
                            value={this.props.fields.gain}
                            onChange={::this.handleGain}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <button
                        className={buttonClasses}
                        onClick={::this.handleLowPassFilter}
                    >{lowPassFilterLabel}</button>
                </div>
            </div>
        );
    }
}
