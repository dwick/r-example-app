import 'less/input-groups.less';
import 'less/buttons.less';
import 'less/caret.less';
import 'less/forms.less';
import 'less/grid.less';

import './styles.less';

import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';

import LANGS from './langauges';

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
      id: T.string.isRequired,
      name: T.string.isRequired,
    })).isRequired,
    languages: T.instanceOf(Set).isRequired,
    onAddTargets: T.func.isRequired,
    onRemoveTargets: T.func.isRequired,
  };

  static defaultProps = {
    available: LANGS,
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
                { target.name }
              </Target>
            );
          })
        }
      </TargetList>
    );
  }

  render () {
    const { languages, available } = this.props;
    const remaining = available.filter(target => !languages.has(target.id));
    const selected = available.filter(target => languages.has(target.id));

    return (
      <div className='LanguageTargeting'>
        <div className='form-group'>
          <label htmlFor='languages'>
            Languages
            <HelpTooltip>
              <p>Leaving this blank targets all languages.</p>
              <p><a href="#">Learn more</a></p>
            </HelpTooltip>
          </label>
          { this.renderTargetList(selected) }
          <Combobox
            id='languages'
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
  languages: state.languages,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTargets: ids => dispatch(unsavedActions.addLanguages(ids)),
  onRemoveTargets: ids => dispatch(unsavedActions.removeLanguages(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageTargeting);
