import './styles.less';

import classNames from 'classnames';
import React from 'react';


export const TargetList = (props) => {
  return (
    <ul className='Targeting__target-list list-unstyled'>
      { props.children }
    </ul>
  );
}

export const TargetGroup = (props) => {
  return (
    <li key={ props.key } className={classNames({
      'Targeting__target-group': true,
      'Targeting__target-group-active': props.active,
    })}>
      { props.children }
    </li>
  );
}

export const TargetGroupTitle = (props) => {
  return (
    <div
      className='Targeting__target-group-title'
      onMouseEnter={ props.onEnter }
      onMouseLeave={ props.onLeave }
    >
      { props.children }
      <a
        href='javascript: void 0;'
        className='Targeting__target-group-remove'
        onClick={ props.onRemove }>
        ×
      </a>
    </div>
  );
}

export const Target = (props) => {
  return (
    <li key={ props.key } className='Targeting__target'>
      { props.children }
      <a
        href='javascript: void 0;'
        className='Targeting__target-remove'
        onClick={ props.onRemove }>
        ×
      </a>
    </li>
  );
}
