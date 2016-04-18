import React, {Component, PropTypes} from 'react';

export default class Distortion extends Component {
    static propTypes = {
        pedalboard: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.distortion = props.effect;
        this.state = {
            intensity: this.distortion.intensity,
            gain: this.distortion.gain,
            lowPassFilter: this.distortion.lowPassFilter
        }
    }

    updateState() {
        this.setState({
            intensity: this.distortion.intensity,
            gain: this.distortion.gain,
            lowPassFilter: this.distortion.lowPassFilter
        });
    }

    handleIntensity(intensity) {
        this.distortion.intensity = volume.currentTarget.value;
        this.updateState();
    }

    handleGain(gain) {
        this.distortion.gain = volume.currentTarget.value;
        this.updateState();
    }

    handleLowPassFilter() {
        this.distortion.lowPassFilter = !this.distortion.lowPassFilter;
        this.updateState();
    }

    render() {
        let lowPassFilterLabel = `Turn lowpass-filter ${this.state.lowPassFilter ? 'off' : 'on'}`;

        return (
            <div className="form">
                <div className="form__row">
                    <label>
                        intensity
                        <input
                            type="range"
                            name="intensity"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.state.intensity}
                            onChange={::this.handleIntensity}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label>
                        Gain
                        <input
                            type="range"
                            name="gain"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.state.gain}
                            onChange={::this.handleGain}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <button
                        className="button button--full"
                        onClick={::this.handleLowPassFilter}
                    >{lowPassFilterLabel}</button>
                </div>
            </div>
        );
    }
}
