import 'less/arrows.less';

import './Dropdown.less';

import classNames from 'classnames';
import React from 'react';


const T = React.PropTypes;
const MARGIN_BUFFER = 8;
const MAX_WIDTH = 420;
const ARROW_HEIGHT = 10;

function shouldRenderAbove(target) {
  const { top, bottom } = target.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const midpoint = windowHeight / 2;
  const targetMidpoint = (top + bottom) / 2;
  return targetMidpoint > midpoint;
}

function computeFloat(target) {
  const targetBounds = target.getBoundingClientRect();
  const targetLeft = targetBounds.left;
  const targetWidth = targetBounds.width;
  const targetMidpoint = targetLeft + (targetWidth / 2);
  const windowWidth = window.innerWidth;

  if (targetMidpoint < (MAX_WIDTH / 2)) {
    return { left: MARGIN_BUFFER };
  } else if ((windowWidth - targetMidpoint) < (MAX_WIDTH / 2)) {
    return { right: MARGIN_BUFFER };
  }

  // if we're at this point, it is safe to assume that the dropdown will assume
  // the MAX_WIDTH
  return {
    left: targetMidpoint,
    marginLeft: -(MAX_WIDTH / 2),
  };
}

function computeContentStyles(target, offset) {
  const targetBounds = target.getBoundingClientRect();
  const targetTop = targetBounds.top;
  const targetBottom = targetBounds.bottom;
  const targetHeight = targetBounds.height;
  const targetLeft = targetBounds.left;
  const targetWidth = targetBounds.width;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const arrowStyle = {
    position: 'fixed',
    left: targetLeft + (targetWidth / 2),
  };

  const wrapperStyle = {
    ...computeFloat(target),
    width: windowWidth - (2 * MARGIN_BUFFER),
  };

  const contentStyle = {};

  if (shouldRenderAbove(target)) {
    wrapperStyle.bottom = windowHeight - targetBottom + targetHeight + offset;
    contentStyle.maxHeight = targetTop - offset - MARGIN_BUFFER;
    arrowStyle.top = targetTop - offset;
  } else {
    wrapperStyle.top = targetBottom + offset;
    contentStyle.maxHeight = windowHeight - targetBottom - offset - MARGIN_BUFFER;
    arrowStyle.top = targetBottom + offset - ARROW_HEIGHT;
  }

  return { arrowStyle, wrapperStyle, contentStyle };
}

class Dropdown extends React.Component {
  static propTypes = {
    target: T.object.isRequired,
    offset: T.number,
    onClose: T.func,
  };

  static defaultProps = {
    offset: 0,
    onClose: () => {},
  };

  constructor(props) {
    super(props);

    this.bodyOverflow = document.body.style.overflow;
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClose);
  }

  handleClose(e) {
    if (this.refs.dropdown.contains(e.target)) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();
    this.props.onClose();
  }

  render() {
    const { children, target, offset } = this.props;
    const { wrapperStyle, contentStyle, arrowStyle } = computeContentStyles(target, offset);

    return (
      <div className='Dropdown' ref='dropdown'>
        <div className='Dropdown__content-wrapper' style={ wrapperStyle }>
          <div className='Dropdown__content' style={ contentStyle }>
            { children }
          </div>
          { this.renderArrow(arrowStyle) }
        </div>
      </div>
    );
  }

  renderArrow(style) {
    const { target } = this.props;
    const renderAbove = shouldRenderAbove(target);
    const arrowCls = renderAbove ? 'stalactite' : 'stalagmite';

    return (
      <div className={ arrowCls } style={ style }/>
    );
  }
}

function DropdownMenu(props) {
  return <div className='DropdownMenu'>{ props.children }</div>;
}

function DropdownMenuItem(props) {
  if (props.href) {
    return (
      <a
        className={ DropdownMenuItem.CLASS_NAME }
        href={ props.href }
        onClick={ props.onClick }
        { ...props }
      >
        { props.children }
      </a>
    );
  }

  return (
    <div
      className={ DropdownMenuItem.CLASS_NAME }
      onClick={ props.onClick }
    >
      { props.children }
    </div>
  );
}

DropdownMenuItem.CLASS_NAME = 'DropdownMenuItem';

DropdownMenuItem.propTypes = {
  href: T.string,
  onClick: T.func,
};

export {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
}
