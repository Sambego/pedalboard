import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Volume extends Component {
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

    handleVolume(volume) {
        const level = parseFloat(volume.currentTarget.value);

        this.updateState('level', level);

        if (this.props.fields.mute && level > 0) {
            this.updateState('mute', false);
        } else if (!this.props.fields.mute && level === 0) {
            this.updateState('mute', true);
        }
    }

    handleMute() {
        const muted = !this.props.fields.mute;
        this.updateState('mute', muted);

        if (muted) {
            this.updateState('level', 0);
        } else {
            this.updateState('level', 1);
        }
    }

    render() {
        const muteLabel = this.props.fields.mute ? 'Unmute' : 'Mute';
        const buttonClasses = classnames('button', 'button--full', {
            'button--active': this.props.fields.mute
        });

        return (
            <div className="form">
                <div className="form__row">
                    <label>
                        Level
                        <input
                            type="range"
                            name="lvel"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.level}
                            onChange={::this.handleVolume}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <button
                        className={buttonClasses}
                        onClick={::this.handleMute}
                    >{muteLabel}</button>
                </div>
            </div>
        );
    }
}
