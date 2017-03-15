import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Reverb as ReverbNode} from 'audio-effects';
import irf from 'file-loader!../../../audio/hall-reverb.ogg';

export default class Reverb extends Component {
    static propTypes = {
        effect: PropTypes.object.isRequired,
        fields: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
    };

    componentDidMount() {
        ReverbNode.getInputResponseFile(irf).then(buffer => {
            this.props.effect.buffer = buffer;
        });
    }

    componentWillReceiveProps(props) {
        for (let key in props.fields) {
            props.effect[key] = props.fields[key];
        }
    }

    updateState(field, value) {
        this.props.onUpdateEffectParam(this.props.id, field, value);
    }

    handleLevel(level) {
        this.updateState('level', level.currentTarget.value);
    }

    handleDepth(depth) {
        this.updateState('depth', depth.currentTarget.value);
    }

    render() {
        const buttonClasses = classnames('button', 'button--full', {
            'button--active': this.props.fields.lowPassFilter
        });

        return (
            <div className="form">
                <div className="form__row">
                    <label className="form__label">
                        Level
                        <input
                            type="range"
                            name="level"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.delay}
                            onChange={::this.handleLevel}
                        />
                    </label>
                </div>

                <div className="form__row">
                    <label className="form__label">
                        Depth
                        <input
                            type="range"
                            name="Depth"
                            min="0"
                            max="1"
                            step="0.1"
                            className="input--range"
                            value={this.props.fields.depth}
                            onChange={::this.handleDepth}
                        />
                    </label>
                </div>
            </div>
        );
    }
}
