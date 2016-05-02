import React, {Component, PropTypes} from 'react';
import SidebarButton from './SidebarButton';

export default class Sidebar extends Component {
    static proptypes = {
        onAdd: PropTypes.func.isRequired,
        pedalboard: PropTypes.object.isRequired,
    };

    renderButtons() {
        const effects = [{
            type: 'input',
        }, {
            type: 'volume',
            fields: {
                level: 1,
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
                speed: 1,
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
        }];

        return effects.map((effect, index) => {
            const effectNode = this.props.pedalboard[`create${_.capitalize(effect.type)}`];
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
