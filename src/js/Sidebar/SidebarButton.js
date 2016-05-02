import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class SidebarButton extends Component {
    static propTypes = {
        effect: PropTypes.func.isRequired,
        fields: PropTypes.object,
        label: PropTypes.string,
        onAdd: PropTypes.func.isRequired,
        type: PropTypes.string,
    };

    handleAdd() {
        this.props.onAdd({
            effect: this.props.effect(),
            fields: this.props.fields,
            switchedOn: true,
            type: this.props.type,
        })
    }

    render() {
        const {label, icon, type} = this.props;
        const buttonLabel = _.capitalize(type);

        return (
            <button className="button--sidebar" title={label} onClick={::this.handleAdd}>
                {buttonLabel}
            </button>
        );
    }
}
