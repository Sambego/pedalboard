import React, {Component, PropTypes} from 'react';
import SidebarButton from './SidebarButton';

export default class Sidebar extends Component {
    static proptypes = {
        onAdd: PropTypes.func.isRequired,
        pedalboard: PropTypes.object.isRequired,
    };

    renderButtons() {
        const effects = ['input', 'volume', 'distortion'];

        return effects.map((effect, index) => {
            const label = `Add a ${effect} pedal`;
            const effectNode = this.props.pedalboard[`create${_.capitalize(effect)}`];

            return <SidebarButton key={index} label={label} type={effect} effect={effectNode} onAdd={this.props.onAdd}/>;
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
