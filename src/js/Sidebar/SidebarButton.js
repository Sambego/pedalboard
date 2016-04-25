import React, {Component, PropTypes} from 'react';

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
            type: this.props.type,
            effect: this.props.effect(),
            fields: this.props.fields,
        })
    }

    render() {
        const {label, icon} = this.props;

        return (
            <button className="button--sidebar" title={label} onClick={::this.handleAdd}>
                {this.props.type}
            </button>
        );
    }
}
