import React, {Component, PropTypes} from 'react';
import SidebarButton from './SidebarButton';
import * as AudioEffects from 'audio-effects';

export default class Sidebar extends Component {
    static proptypes = {
        audioContext: PropTypes.obj,
        onAdd: PropTypes.func.isRequired,
    };

    renderButtons() {
        const effects = [{
            type: 'input',
        }, {
            type: 'volume',
            fields: {
                level: 0.5,
                mute: false,
            }
        }, {
            type: 'distortion',
            fields: {
                intensity: 80,
                gain: 50,
                lowPassFilter: false
            }
        }, {
            type: 'delay',
            fields: {
                wet: 1,
                speed: 0.5,
                duration: 0.4
            }
        }, {
            type: 'flanger',
            fields: {
                delay: 0.005,
                depth: 0.002,
                feedback: 0.5,
                speed: 0.25
            }
        }, {
            type: 'reverb',
            fields: {
                wet: 1,
                level: 1
            }
        }, {
            type: 'tremolo',
            fields: {
                speed: 1.5
            }
        }];

        return effects.map((effect, index) => {
            const effectNode = () => {return new AudioEffects[_.capitalize(effect.type)](this.props.audioContext)};

            const props = {
                key: index,
                label: `Add a ${effect.type} pedal`,
                type: effect.type,
                effect: effectNode,
                fields: effect.fields || null,
                onAdd: this.props.onAdd,
            }

            return <SidebarButton {...props}/>;
        });
    }

    render() {
        return (
            <aside className="sidebar">
                {this.renderButtons()}
            </aside>
        );
    }
}
