import React from 'react';

const T = React.PropTypes;

export default function Textarea(props) {
  return (
    <textarea
      className='Textarea'
      name={ props.name }
      placeholder={ props.placeholder }
      defaultValue={ props.initialValue }
    />
  );
}

Textarea.propTypes = {
  name: T.string.isRequired,
  placeholder: T.string,
  initialValue: T.string,
};

Textarea.defaultProps = {
  placeholder: '',
  initialValue: '',
};
