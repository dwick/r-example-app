import 'less/caret.less';
import 'less/icons.less';
import 'less/icon-font.less';

import './styles.less';

import classNames from 'classnames';
import React from 'react';

import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
} from 'app/components/Dropdown';

const T = React.PropTypes;
const INCLUDE_LABEL = 'include';
const EXCLUDE_LABEL = 'exclude';

export default class HelpMenu extends React.Component {
  static propTypes = {
    include: T.bool.isRequired,
    tag: T.element.isRequired,
    onChange: T.func.isRequired,
  };

  static defaultProps = {
    tag: 'div',
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownTarget: null,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    this.setState({
      dropdownTarget: this.state.dropdownTarget ? null : e.target.parentElement,
    });
  }

  _onClick(include) {
    this.setState({
      dropdownTarget: null,
    });

    if (include !== this.props.include) {
      this.props.onChange(include);
    }
  }

  render() {
    const { dropdownTarget } = this.state;
    const Tag = this.props.tag;
    const label = this.props.include ? INCLUDE_LABEL : EXCLUDE_LABEL;

    return (
      <Tag className={ classNames('IncludeExclude', this.props.className) }>
        <span onClick={ this.toggleDropdown }>
          <span className='IncludeExclude__label'>{ label }</span>
          <span className='caret'/>
        </span>
        { dropdownTarget ? this.renderDropdown() : null }
      </Tag>
    );
  }

  renderDropdown() {
    const { dropdownTarget } = this.state;
    const { app, sortOptions, title } = this.props;

    return (
      <div className='IncludeExclude__dropdown'>
        <Dropdown
          target={ dropdownTarget }
          offset={ 10 }
          onClose={ this.toggleDropdown }
          maxWidth={ 120 }
        >
          <DropdownMenu>
            <DropdownMenuItem
              key='include'
              onClick={ this._onClick.bind(this, true) }
            >
              <span className={ classNames(
                'IncludeExclude__selected-icon', {
                  'icon-check': this.props.include,
                })
              }></span>
              { INCLUDE_LABEL }
            </DropdownMenuItem>
            <DropdownMenuItem
              key='exclude'
              onClick={ this._onClick.bind(this, false) }
            >
              <span className={ classNames(
                'IncludeExclude__selected-icon', {
                  'icon-check': !this.props.include,
                })
              }></span>
              { EXCLUDE_LABEL }
            </DropdownMenuItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
