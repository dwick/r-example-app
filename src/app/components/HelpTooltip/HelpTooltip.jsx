import 'less/icons.less';
import 'less/icon-font.less';

import './HelpTooltip.less';

import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from 'app/components/Tooltip/Tooltip';

const T = React.PropTypes;

export default class HelpTooltip extends React.Component {

  static propTypes = {
    placement: T.oneOf([
      'top',
      'bottom',
      'left',
      'right',
    ]).isRequired,
  };

  static defaultProps = {
    placement: 'right',
  };

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
      focused: false,
      target: null,
    };

    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  componentDidMount() {
    this.setState({
      target: ReactDOM.findDOMNode(this.refs.target),
    });
  }

  _onFocus() {
    this.setState({
      focused: true,
    }, this._showTooltip);
  }

  _onBlur() {
    this.setState({
      focused: false,
    }, this._hideTooltip);
  }

  _showTooltip() {
    this.refs.tooltip.show();
  }

  _hideTooltip() {
    if (this.state.focused) {
      return;
    }

    this.refs.tooltip.hide();
  }

  render() {
    const { placement } = this.props;

    return (
      <div
        className='HelpTooltip'
        onMouseEnter={this._showTooltip}
        onMouseLeave={this._hideTooltip}
      >
        <span
          className='icon icon-info icon-lg'
          ref='target'
          tabIndex='-1'
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        />
        {
          this.state.target ?
            <Tooltip
              ref='tooltip'
              placement={ this.props.placement }
              target={ this.state.target }
            >
              { this.props.children }
            </Tooltip> : null
        }
      </div>
    );
  }

}
