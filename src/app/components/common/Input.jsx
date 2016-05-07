import React from 'react';

const T = React.PropTypes;

export default function Input(props) {
  return (
    <input
      className='Input'
      name={ props.name }
      type={ props.type }
      defaultValue={ props.initialValue }
      placeholder={ props.placeholder }
    />
  );
}

Input.propTypes = {
  name: T.string.isRequired,
  type: T.string,
  initialValue: T.string,
  placeholder: T.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  initialValue: '',
};
