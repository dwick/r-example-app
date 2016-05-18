import './Combobox.less';

import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery';

import * as domUtils from 'lib/dom';
import * as regexUtils from 'lib/regex';

const T = React.PropTypes;

class ComboboxInput extends React.Component {

  static propTypes = {
    value: T.string.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props)

    this.focus = this.focus.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  get isSuggesting() {
    const valueInsensitive = this.props.value.toLowerCase();
    const inputInsensitive = this._input != null && this._input.toLowerCase();

    return this.props.suggesting && inputInsensitive != null &&
      valueInsensitive.indexOf(inputInsensitive) !== -1;
  }

  componentDidUpdate(prevProps) {
    const input = ReactDOM.findDOMNode(this);
    const value = this.props.value;

    if (this.isSuggesting) {
      const start = value.toLowerCase().indexOf(this._input.toLowerCase()) + this._input.length
      const end = value.length - start;

      if (start !== -1) {
        domUtils.selectionRange(input, start, start + end)
      }
    }
  }

  render() {
    return (
      <input
        {...this.props}
        autoComplete='off'
        type='text'
        className='form-control Combobox__control'
        value={this.props.value}
        onChange={this._onChange}/>
    );
  }

  _onChange(e) {
    const value = e.target.value;

    this._input = value;
    this.props.onChange(e);
  }

  accept() {
    if (!this.isSuggesting) {
      return;
    }

    const el = ReactDOM.findDOMNode(this);
    const end = el.value.length;

    this._input = null;
    domUtils.selectionRange(el, end, end);
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

}

class Combobox extends React.Component {

  static defaultProps = {
    suggest: false,
    size: 5,
    items: [],
    filter: (item, searchTerm) => {
      const regex = new RegExp('^' + regexUtils.escape(searchTerm), 'i');

      return regex.test(this._getText(item));
    },
    onSelect: () => {},
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const items = this.props.items;
    const value = this.props.defaultValue || '';
    const filtered = this._filter(items, value);
    const selectedIndex = this._indexOf(items, value);

    this.state = {
      hasSuggestion: false,
      isOpen: this.props.open || false,
      value: value,
      filtered: filtered,
      selectedItem: items[selectedIndex],
      focusedIndex: selectedIndex < 0 ?
        0 : selectedIndex,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._keydown = this._keydown.bind(this);
    this._onChange = this._onChange.bind(this);
    this._shortcuts = this._shortcuts.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Manually trigger change
    if (prevState && this.state.value != null &&
        prevState.value !== this.state.value) {
      const e = new Event('input', {
        bubbles: true,
        cancelable: true,
      });

      e.manual = true;

      ReactDOM.findDOMNode(this.refs.input).dispatchEvent(e);
    }

    if (this.state.isOpen && !this.state.maxHeight) {
      this._setListHeight();
    }
  }

  componentWillReceiveProps(nextProps) {
    const items = nextProps.items;
    const value = this.state.value;
    const filtered = this._filter(items, value);
    const selectedIndex = this._indexOf(items, value);

    this.setState({
      filtered: filtered,
      isOpen: nextProps.open,
      selectedItem: items[selectedIndex],
      focusedIndex: selectedIndex < 0 ?
        0 : selectedIndex,
    });
  }

  render() {
    const hasOpen = 'open' in this.props;
    const items = this.state.selectedItem ?
      this.props.items : this.state.filtered;

    const isOpen = hasOpen ?
      this.props.open : this.state.isOpen;

    return (
      <div
        id={ this.props.id }
        ref='combobox'
        tabIndex='-1'
        className={classNames({
          'Combobox': true,
          'Combobox__open': isOpen,
        })}
        onBlur={ this.close }
        onFocus={ this.open }
        onKeyDown={ this._shortcuts }
      >
        <ComboboxInput
          ref='input'
          id={ this.props.id }
          suggesting={ this.state.hasSuggestion }
          value={ this.state.value }
          onChange={ this._onChange }
          onKeyDown={ this._keydown }
          tabIndex={ this.props.tabIndex }
        />
        <ol ref='list' className='Combobox__list list-unstyled' style={ {
          maxHeight: this.state.maxHeight || 'auto',
        } }>
          {items.map((item) => {
            let index = this._indexOf(this.props.items, item);
            let focused = index === this.state.focusedIndex;
            let selected = item === this.state.selectedItem;

            return (
              <li
                tabIndex='-1'
                key={index}
                className={classNames({
                  'Combobox__list-item': true,
                  'Combobox__list-item-focused': focused,
                  'Combobox__list-item-selected': selected,
                })}
                onClick={this._select.bind(this, item, index)}>
                {this._getText(item)}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  _stopPropagation(e) {
    e.stopPropagation();
  }

  open() {
    this.setState({
      isOpen: true,
    }, this.refs.input.focus);
  }

  close(e) {
    this.setState({
      isOpen: false,
    });
  }

  clear() {
    this.setState({
      value: '',
    });
  }

  _getText(item) {
    return item != null && this.props.textField ?
      item[this.props.textField] : item;
  }

  _getValue(item) {
    return item != null && this.props.valueField ?
      item[this.props.valueField] : item;
  }

  _filter(items, value) {
    const component = this;
    const filter = this.props.filter;

    if (!value) {
      return items;
    }

    return items.filter((item) => {
      return filter.call(component, item, value);
    });
  }

  _indexOf(items, value) {
    for (let i = 0, l = items.length; i < l; i++) {
      if (items[i] === value) {
        return i;
      }
    }

    return -1;
  }

  _keydown(e) {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
  }

  _onChange(e) {
    // Ignore manually triggered events.
    if (e.nativeEvent.manual) {
      return;
    }

    const el = e.target;
    const value = el.value;
    const filtered = this._filter(this.props.items, value);
    const suggestion = this.props.suggest && filtered[0];
    const hasSuggestion = !!(!this._deleting && suggestion);

    this.setState({
      isOpen: !!filtered.length,
      selectedItem: null,
      filtered: filtered,
      hasSuggestion: hasSuggestion,
      value: hasSuggestion ?
        this._getText(suggestion) : value,
      focusedIndex: this._indexOf(
        this.props.items,
        suggestion || filtered[0]),
    }, () => {
      this.props.onChange(this.state.value);
    });
  }

  _select(item, index) {
    this.setState({
      value: this._getText(item),
      selectedItem: item,
      focusedIndex: index,
    });

    this.props.onSelect.call(null, item);
    this.close();
  }

  _selectIndex(index) {
    const item = this.props.items[index];

    this._select(item, index);
  }

  _shortcuts(e) {
    const key = e.key;
    let handled = false;

    switch (key) {
      case 'ArrowDown':
        this._focus(1);
        handled = true;
        break;
      case 'ArrowUp':
        this._focus(-1);
        handled = true;
        break;
      case 'Enter':
        if (this.state.focusedIndex != null) {
          this._selectIndex(this.state.focusedIndex);
          this.refs.input.accept();
          handled = true;
        }
        break;
    }

    if (handled) {
      e.preventDefault();
    }
  }

  _focus(move) {
    if (!this.state.isOpen) {
      return this.open();
    }

    const filtered = this.state.filtered;
    const prev = this.state.focusedIndex;
    const filteredIndex = this._indexOf(filtered, this.props.items[prev]);
    const count = filtered.length;
    const nextFilteredIndex = filteredIndex + move;
    const wrappedIndex = nextFilteredIndex < 0 ?
      prev :
      nextFilteredIndex > count - 1 ?
        prev :
        nextFilteredIndex;

    this.setState({
      focusedIndex: this._indexOf(
        this.props.items,
        filtered[wrappedIndex]),
    }, this._scrollToFocus);
  }

  _setListHeight() {
    const $list = $(ReactDOM.findDOMNode(this.refs.list));
    const $item = $list.find('li:first-child:visible');

    if (!$item.length) {
      return;
    }

    const height = $item.outerHeight()
    const listHeight = height * this.props.size;

    this.setState({
      maxHeight: listHeight,
    });
  }

  _scrollToFocus() {
    const $list = $(ReactDOM.findDOMNode(this.refs.list));
    const $item = $list.find('li:first-child:visible');
    const $focused = $list.find('.component-list-item-focused');
    const height = $item.outerHeight()
    const listHeight = height * this.props.size;
    const offset = $focused.position().top;
    const scrollTop = $list.scrollTop();

    if (offset === 0) {
      return
    }

    $list.scrollTop(
      listHeight - height - offset < 0 ?
        scrollTop + offset :
          offset < 0 ?
           scrollTop - listHeight :
           scrollTop
    );
  }

}

export default Combobox;
