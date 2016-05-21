import 'less/input-groups.less';
import 'less/buttons.less';
import 'less/caret.less';
import 'less/forms.less';
import 'less/grid.less';

import './styles.less';

import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';

import DEFAULT_COMMUNITIES from './defaults';

import Combobox from 'app/components/Combobox';
import HelpTooltip from 'app/components/HelpTooltip';
import { TargetList, Target, TargetGroup, TargetGroupTitle } from 'app/components/Targeting';
import * as regexUtils from 'lib/regex';
import * as unsavedActions from 'app/actions/unsaved';

const _filter = (item, searchTerm) => {
  const regex = new RegExp('^' + regexUtils.escape(searchTerm), 'i');

  return regex.test(item.name);
}

const _sort = (a, b) => {
  return a.name > b.name ? 1 : (a.name === b.name ? 0 : -1);
}

const T = React.PropTypes;

export default class LanguageTargeting extends React.Component {
  static propTypes = {
    available: T.arrayOf(T.shape({
      id: T.number.isRequired,
      name: T.string.isRequired,
    })).isRequired,
    communities: T.instanceOf(Set).isRequired,
    onAddTargets: T.func.isRequired,
    onRemoveTargets: T.func.isRequired,
  };

  static defaultProps = {
    available: DEFAULT_COMMUNITIES.map(community => {
      community.displayName = `r/${community.name}`;

      return community;
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      active: null,
    };
  }

  _removeTargets(ids) {
    this.props.onRemoveTargets(ids);
  }

  _addTarget(target) {
    this.props.onAddTargets(target.id);
    this.refs.input.clear();
  }

  renderTargetList(targets) {
    if (!targets) {
      return null;
    }

    return (
      <TargetList>
        {
          targets.sort(_sort).map(target => {
            return (
              <Target
                key={ target.id }
                onRemove={ this._removeTargets.bind(this, target.id) }
              >
                r/{ target.name }
              </Target>
            );
          })
        }
      </TargetList>
    );
  }

  render () {
    const { communities, available } = this.props;
    const remaining = available.filter(target => !communities.has(target.id));
    const selected = available.filter(target => communities.has(target.id));

    return (
      <div className='CommunityTargeting'>
        <div className='form-group'>
          <label htmlFor='communities'>
            Communities
            <HelpTooltip>
              <p>
                Targeting a community lets you reach the exact audience interested in a topic.
                You are targeting the subscribers and views of that community.
              </p>
              <p><a href="#">Learn more</a></p>
            </HelpTooltip>
          </label>
          { this.renderTargetList(selected) }
          <Combobox
            id='communities'
            ref='input'
            items={ remaining }
            textField='name'
            onSelect={ this._addTarget.bind(this) }
            filter={ _filter }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  communities: state.communities,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTargets: ids => dispatch(unsavedActions.addCommunities(ids)),
  onRemoveTargets: ids => dispatch(unsavedActions.removeCommunities(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageTargeting);
