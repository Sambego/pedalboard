import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Input from './Pedals/Input';
import Volume from './Pedals/Volume';
import Distortion from './Pedals/Distortion';

export default class Pedal extends Component {
    static propTypes = {
        effect: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
        onRemove: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired
    };

    handleClose() {
        this.props.onRemove(this.props.id);
    }

    renderEffect() {
        const {effect, fields, id, onUpdateEffectParam} = this.props;
        const effectProps = {effect, fields, id, onUpdateEffectParam};

        switch (this.props.type) {
            case 'input':
                return (<Input {...effectProps}/>)
                break;
            case 'volume':
                return (<Volume {...effectProps}/>)
                break;
            case 'distortion':
                return (<Distortion {...effectProps}/>)
                break;
            default:
                return (<Volume {...effectProps}/>)
        }
    }

    render() {
        const classes = classnames('pedal', `pedal--${this.props.type}`);

        return (
            <div className={classes}>
                <button className="button--close" onClick={::this.handleClose}>&times;</button>
                <section className="pedal__content">{this.renderEffect()}</section>
            </div>
        );
    }
}
