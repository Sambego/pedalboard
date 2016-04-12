import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Input from './Pedals/Input';
import Volume from './Pedals/Volume';

export default class Pedal extends Component {
    static propTypes = {
        pedalboard: PropTypes.object,
        type: PropTypes.string
    }

    renderEffect() {
        const {pedalboard} = this.props;
        const effectProps = {pedalboard};

        switch (this.props.type) {
            case 'input':
                return (<Input {...effectProps}/>)
                break;
            case 'volume':
                return (<Volume {...effectProps}/>)
                break;
            default:
                return (<Volume {...effectProps}/>)
        }
    }

    render() {
        const classes = classnames('pedal', `pedal--${this.props.type}`);
        const title = _.capitalize(this.props.type);

        return (
            <div className={classes}>
                <header className="pedal__header">{title}</header>
                <section className="pedal__content">{this.renderEffect()}</section>
            </div>
        );
    }
}
