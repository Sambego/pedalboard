import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import Icon from '../../Icon';

export default class SideMenuLink extends Component {
    static propTypes = {
        fuzzyMatch: PropTypes.bool,
        icon: PropTypes.string,
        label: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
    };

    static defaultProps = {
        fuzzyMatch: false,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    render() {
        const {to, label, fuzzyMatch} = this.props;
        const active = this.context.router.isActive(to, !fuzzyMatch);

        // Compute appropriate icon
        let icon = this.props.icon || label.toLowerCase();
        const iconActive = active && ['edit', 'matching', 'publish', 'visit'].includes(icon);
        icon = classnames({
            [icon]: !iconActive,
            [`${icon}-fill`]: iconActive,
        });

        return (
            <li className={classnames({active})}>
                <Link to={to}>
                    <span className="c-side-menu-icon">
                        <Icon size={24} icon={icon} />
                    </span>
                    <span className="c-side-menu-label">{label}</span>
                </Link>
            </li>
        );
    }
}
