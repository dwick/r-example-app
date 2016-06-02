import 'less/input-groups.less';
import 'less/buttons.less';
import 'less/caret.less';
import 'less/forms.less';
import 'less/grid.less';

import './styles.less';

import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';

import COLLECTIONS from './collections';

import Combobox from 'app/components/Combobox';
import HelpTooltip from 'app/components/HelpTooltip';
import { TargetList, Target, TargetIcon, TargetGroup, TargetGroupTitle } from 'app/components/Targeting';
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

export default class InterestTargeting extends React.Component {
  static propTypes = {
    available: T.arrayOf(T.shape({
      name: T.string.isRequired,
      description: T.string.isRequired,
      over18: T.bool.isRequired,
    })).isRequired,
    interests: T.instanceOf(Set).isRequired,
    onAddTargets: T.func.isRequired,
    onRemoveTargets: T.func.isRequired,
  };

  static defaultProps = {
    available: COLLECTIONS,
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
    this.props.onAddTargets(target.name);
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
                key={ target.name }
                onRemove={ this._removeTargets.bind(this, target.name) }
              >
                { target.name }
                {
                  target.over18 ?
                    <TargetIcon className="icon-nsfw" title="nsfw" /> :
                    null
                }
              </Target>
            );
          })
        }
      </TargetList>
    );
  }

  render () {
    const { interests, available } = this.props;
    const remaining = available.filter(target => !interests.has(target.name));
    const selected = available.filter(target => interests.has(target.name));

    return (
      <div className='LanguageTargeting'>
        <div className='form-group'>
          <label htmlFor='interests'>
            Interests
            <HelpTooltip>
              <p>Collections of subreddits and keywords.</p>
              <p><a href="#">Learn more</a></p>
            </HelpTooltip>
          </label>
          { this.renderTargetList(selected) }
          <Combobox
            id='interests'
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
  interests: state.interests,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTargets: ids => dispatch(unsavedActions.addInterests(ids)),
  onRemoveTargets: ids => dispatch(unsavedActions.removeInterests(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestTargeting);
