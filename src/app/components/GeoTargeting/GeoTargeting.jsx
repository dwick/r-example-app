import 'less/input-groups.less';
import 'less/buttons.less';
import 'less/caret.less';
import 'less/forms.less';
import 'less/grid.less';

import './GeoTargeting.less';

import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';

import Combobox from 'app/components/Combobox/Combobox';
import HelpTooltip from 'app/components/HelpTooltip/HelpTooltip';
import IncludeExclude from 'app/components/IncludeExclude/IncludeExclude';
import * as regexUtils from 'lib/regex';
import * as unsavedActions from 'app/actions/unsaved';

function _sort(a, b) {
  const aname = a.country ? a.country + a.region + a.metro : a.name;
  const bname = b.country ? b.country + b.region + b.metro : b.name;

  return aname > bname ? 1 : (aname === bname ? 0 : -1);
}

function _filter(item, searchTerm) {
  const regex = new RegExp('^' + regexUtils.escape(searchTerm), 'i');
  const nameParts = item.name.match(/[^\()]+\(([^\)]+)\)/i);

  return regex.test(item.name);
}

const T = React.PropTypes;

export default class GeoTargeting extends React.Component {

  static propTypes = {
    available: T.array.isRequired,
    includeLocations: T.instanceOf(Set).isRequired,
    excludeLocations: T.instanceOf(Set).isRequired,
    onAddLocation: T.func.isRequired,
    onRemoveLocation: T.func.isRequired,
  };

  static defaultProps = {
    available: [{
      id: 'CA--',
      name: 'Canada',
      country: 'Canada',
    }, {
      id: 'UK--',
      name: 'United Kingdom',
      country: 'United Kingdom',
    }, {
      id: 'US--',
      name: 'United States',
      country: 'United States',
    }, {
      id: 'US-CA-',
      name: 'California, US',
      country: 'United States',
      region: 'California',
    }],
  }

  constructor(props) {
    super(props);

    this.state = {
      include: true,
      activeGroup: null,
    };

    this._setInclude = this._setInclude.bind(this);
  }

  _enterGroup(group) {
    this.setState({
      activeGroup: group,
    });
  }

  _leaveGroup(group) {
    this.setState({
      activeGroup: null,
    });
  }

  _setInclude(include) {
    this.setState({ include: include });
  }

  _addTarget(target) {
    const { include } = this.state;

    this.props.onAddLocation(target.id, { include });
    this.refs.input.clear();
  }

  _removeTarget(target) {
    this.props.onRemoveLocation(target.id);
  }

  _removeGroup(ids) {
    this.props.onRemoveLocation(ids);
  }

  render() {
    const component = this;
    const { includeLocations, excludeLocations, available } = this.props;
    const unavailable = new Set([...includeLocations, ...excludeLocations]);
    const remaining = available.filter(target => !unavailable.has(target.id));
    const selected = available.filter(target => unavailable.has(target.id));
    const grouped = selected.reduce((g, target) => {
      g[target.country] = g[target.country] || [];
      g[target.country].push(target);

      return g;
    }, {});
    const groupings = Object.keys(grouped);

    return (
      <div className='GeoTargeting'>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='form-group'>
              <label htmlFor='location'>
                Locations
                <HelpTooltip>
                  <p>Enter one or more country names, states/regions, or US metro areas you wish to target.</p>
                  <p><a href="#">Learn more</a></p>
                </HelpTooltip>
              </label>
              { groupings.length ?
                <ul className='GeoTargeting__targets list-unstyled'>
                  {groupings.map(group => {
                    return (
                      <li key={group} className={classNames({
                        'GeoTargeting__target-group': true,
                        'GeoTargeting__target-group-active': group === this.state.activeGroup,
                      })}>
                        <div
                          className='GeoTargeting__target-group-title'
                          onMouseEnter={component._enterGroup.bind(component, group)}
                          onMouseLeave={component._leaveGroup.bind(component, group)}
                        >
                          { group }
                          <a
                            href='javascript: void 0;'
                            className='GeoTargeting__group-remove'
                            onClick={component._removeGroup.bind(component, grouped[group].map(({ id }) => id))}>
                            ×
                          </a>
                        </div>
                        <ul className='GeoTargeting__target-group-items list-unstyled'>
                          {
                            grouped[group].map(target => {
                              return (
                                <li key={ target.id } className='GeoTargeting__target'>
                                  <span className={classNames({
                                    'GeoTargeting__icon icon': true,
                                    'icon-upvote icon-orangered': includeLocations.has(target.id),
                                    'icon-downvote icon-periwinkle': excludeLocations.has(target.id),
                                  })}/>
                                  { target.name }
                                  <a
                                    href='javascript: void 0;'
                                    className='GeoTargeting__target-remove'
                                    onClick={component._removeTarget.bind(component, target)}>
                                    ×
                                  </a>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </li>
                    );
                  })}
                </ul> : null
              }
              <div className='input-group'>
                <span className='input-group-addon'>
                  <IncludeExclude include={ this.state.include } onChange={ this._setInclude}/>
                </span>
                <Combobox
                  ref='input'
                  items={remaining.sort(_sort)}
                  textField='name'
                  onSelect={this._addTarget.bind(this)}
                  filter={_filter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  includeLocations: state.includeLocations,
  excludeLocations: state.excludeLocations,
});

const mapDispatchToProps = (dispatch) => ({
  onAddLocation: (id, options) => dispatch(unsavedActions.addLocation(id, options)),
  onRemoveLocation: (id) => dispatch(unsavedActions.removeLocation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoTargeting);
