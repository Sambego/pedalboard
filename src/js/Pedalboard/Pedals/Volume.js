import React, {Component, PropTypes} from 'react';

export default class Volume extends Component {
    static propTypes = {
        pedalboard: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.volume = props.effect;
        this.state = {
            level: this.volume.level,
            mute: this.volume.mute
        }
    }

    updateState() {
        this.setState({
            mute: this.volume.mute,
            level: this.volume.level
        });
    }

    handleVolume(volume) {
        this.volume.level = volume.currentTarget.value;
        this.updateState();
    }

    handleMute() {
        this.volume.mute = !this.volume.mute;
        this.updateState();
    }

    render() {
        let muteLabel = this.state.mute ? 'Unmute' : 'Mute';

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
                            value={this.state.level}
                            onChange={::this.handleVolume}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <button
                        className="button button--full"
                        onClick={::this.handleMute}
                    >{muteLabel}</button>
                </div>
            </div>
        );
    }
}
