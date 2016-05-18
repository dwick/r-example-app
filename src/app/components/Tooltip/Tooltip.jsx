import './Tooltip.less';

import classNames from 'classnames';
import React from 'react';
import * as $ from 'jquery';

const T = React.PropTypes;

const _getPosition = (element) => {
  const { width, height } = element.getBoundingClientRect();
  const offset = $(element).position();

  return Object.assign({ height, width }, offset);
}

const _computeStyles = (target, placement) => {
  let computedStyles = {};

  if (!target) {
    return computedStyles;
  }

  const pos = _getPosition(target);
  const actualWidth = 400;
  const actualHeight = 110;

  switch (placement) {
    case 'bottom':
      computedStyles.top = pos.top + pos.height;
      computedStyles.left = pos.left + pos.width / 2 - actualWidth / 2;
      break;
    case 'top':
      computedStyles.top = pos.top - actualHeight;
      computedStyles.left = pos.left + pos.width / 2 - actualWidth / 2;
      break;
    case 'left':
      computedStyles.top = pos.top + pos.height / 2 - actualHeight / 2;
      computedStyles.left = pos.left + pos.width / 2 - actualWidth / 2;
      break;
    case 'right':
      computedStyles.top = pos.top + pos.height / 2 - actualHeight / 2;
      computedStyles.left = pos.left + pos.width;
      break;
    default:
      throw Exception('Invalid placement');
  }

  return { computedStyles };
};

export default class Tooltip extends React.Component {

  static propTypes = {
    placement: T.oneOf([
      'top',
      'bottom',
      'left',
      'right',
    ]).isRequired,
    delay: T.number.isRequired,
    target: T.object.isRequired,
  };

  static defaultProps = {
    placement: 'right',
    delay: 500,
  };

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
    };
  }

  _clearDelay() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }

  show() {
    if (this._timeout) {
      return this._clearDelay();
    }

    this.setState({
      shown: true,
    });
  }

  hide() {
    this._timeout = setTimeout(() => {
      this._clearDelay();

      this.setState({
        shown: false,
      });
    }, this.props.delay);
  }

  render() {
    const { placement, target } = this.props;
    const { computedStyles } = _computeStyles(target, placement);

    return (
      <div
        className={classNames(
          'Tooltip',
          {
            [`Tooltip__${placement}`]: true,
            'Tooltip__in': this.state.shown,
          },
        )}
        style={ computedStyles }
      >
        <div className='Tooltip__arrow'></div>
        <div className='Tooltip__content'>
          { this.props.children }
        </div>
      </div>
    );
  }

}
