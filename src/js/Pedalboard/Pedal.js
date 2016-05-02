import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Input from './Pedals/Input';
import Volume from './Pedals/Volume';
import Distortion from './Pedals/Distortion';
import Delay from './Pedals/Delay';
import Flanger from './Pedals/Flanger';
import Reverb from './Pedals/Reverb';

export default class Pedal extends Component {
    static propTypes = {
        effect: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        midi: PropTypes.object.isRequired,
        switchedOn: PropTypes.bool.isRequired,
        onProcessMidiMessage: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        onUpdateEffectParam: PropTypes.func.isRequired,
        order: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    };

    componentWillReceiveProps(props) {
        const midi = props.midi;
        const order = props.order;

        if (midi.newEvent && midi.event === order) {
            this.handleToggle();
            this.props.onProcessMidiMessage();
        }
    }

    handleClose() {
        this.props.effect.destroy();
        this.props.onRemove(this.props.id);
    }

    handleToggle() {
        this.props.onToggle(this.props.id);
    }

    renderEffect() {
        const {effect, fields, id, onUpdateEffectParam} = this.props;
        const handleToggle = this.handleToggle;
        const effectProps = {effect, fields, id, onUpdateEffectParam, handleToggle};

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
            case 'delay':
                return (<Delay {...effectProps}/>)
                break;
            case 'flanger':
                return (<Flanger {...effectProps}/>)
                break;
            case 'reverb':
                return (<Reverb {...effectProps}/>)
                break;
            default:
                return (<Volume {...effectProps}/>)
        }
    }

    render() {
        const title = _.capitalize(this.props.type);
        const pedalClasses = classnames('pedal', `pedal--${this.props.type}`);
        const toggleLabel = this.props.switchedOn ? 'off' : 'on';
        const toggleClasses = classnames('button', 'button--full', {
            'button--active': this.props.switchedOn
        });

        return (
            <div className={pedalClasses}>
                <button className="button--close" onClick={::this.handleClose}>&times;</button>
                <header className="pedal__header">
                    <p className="pedal__number">{this.props.order}</p>
                    <h2 className="pedal__title">{title}</h2>
                </header>
                <section className="pedal__content">
                    {this.renderEffect()}
                    <button className={toggleClasses} onClick={::this.handleToggle}>Switch {toggleLabel}</button>
                </section>
            </div>
        );
    }
}
