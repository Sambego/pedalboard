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
                intensity: 1,
                gain: 1,
                lowPassFilter: false
            }
        }];

        return effects.map((effect, index) => {
            const label = `Add a ${effect.type} pedal`;
            const effectNode = this.props.pedalboard[`create${_.capitalize(effect.type)}`];
            const fields = effect.fields || null;

            return <SidebarButton key={index} label={label} type={effect.type} effect={effectNode} fields={fields} onAdd={this.props.onAdd}/>;
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
