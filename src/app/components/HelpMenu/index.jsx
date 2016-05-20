import 'less/icons.less';
import 'less/icon-font.less';

import classNames from 'classnames';
import React from 'react';

import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
} from 'app/components/Dropdown';

const T = React.PropTypes;

export default class HelpMenu extends React.Component {
  static propTypes = {
    tag: T.element.isRequired,
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

  render() {
    const { dropdownTarget } = this.state;
    const Tag = this.props.tag;

    return (
      <Tag className={ classNames('HelpMenu', this.props.className) }>
        <a href='javscript: void 0;' onClick={ this.toggleDropdown }>
          <span className='icon-info icon-lg'></span>
          <span className='sr-only'>Help</span>
        </a>
        { dropdownTarget ? this.renderDropdown() : null }
      </Tag>
    );
  }

  renderDropdown() {
    const { dropdownTarget } = this.state;
    const { app, sortOptions, title } = this.props;

    return (
      <div className='HelpMenu__dropdown'>
        <Dropdown
          target={ dropdownTarget }
          offset={ 10 }
          maxWidth={ 200 }
          onClose={ this.toggleDropdown }
        >
          <DropdownMenu>
            <DropdownMenuItem
              href='https://reddit.zendesk.com/hc/en-us/articles/205118995-Step-by-step-How-to-create-an-ad'
              target='_blank'
            >
              getting started
            </DropdownMenuItem>
            <DropdownMenuItem
              href='https://reddit.zendesk.com/hc/en-us/articles/205183225-Audience-and-Demographics'
              target='_blank'
            >
              audience
            </DropdownMenuItem>
            <DropdownMenuItem
              href='https://reddit.zendesk.com/hc/en-us/sections/200863319-Best-Practices-Tips'
              target='_blank'
            >
              best practices
            </DropdownMenuItem>
            <DropdownMenuItem
              href='https://reddit.zendesk.com/hc/en-us/categories/200352595-Advertising-'
              target='_blank'
            >
              help center
            </DropdownMenuItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
