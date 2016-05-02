import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Flanger extends Component {
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

    handleDelay(delay) {
        this.updateState('delay', delay.currentTarget.value);
    }

    handleDepth(depth) {
        this.updateState('depth', depth.currentTarget.value);
    }

    handleFeedback(feedback) {
        this.updateState('feedback', feedback.currentTarget.value);
    }

    handleSpeed(speed) {
        this.updateState('speed', speed.currentTarget.value);
    }

    render() {
        const buttonClasses = classnames('button', 'button--full', {
            'button--active': this.props.fields.lowPassFilter
        });

        return (
            <div className="form">
                <div className="form__row">
                    <label className="form__label">
                        Delay
                        <input
                            type="range"
                            name="delay"
                            min="0.001"
                            max="0.02"
                            step="0.001"
                            className="input--range"
                            value={this.props.fields.delay}
                            onChange={::this.handleDelay}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Depth
                        <input
                            type="range"
                            name="depth"
                            min="0"
                            max="0.02"
                            step="0.001"
                            className="input--range"
                            value={this.props.fields.depth}
                            onChange={::this.handleDepth}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Feedback
                        <input
                            type="range"
                            name="feedback"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.Feedback}
                            onChange={::this.handleFeedback}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Speed
                        <input
                            type="range"
                            name="speed"
                            min="0.05"
                            max="1"
                            step="0.05"
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
