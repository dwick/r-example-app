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
import { TargetList, Target, TargetGroup, TargetGroupTitle } from 'app/components/Targeting/Targeting';
import * as regexUtils from 'lib/regex';
import propTypes from 'lib/propTypes';
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
  static REQUIRED_ITEM_PROPS = ['foo', 'bar']

  static propTypes = {
    available: T.arrayOf(T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired,
      country: T.string.isRequired,
      region: T.string,
      dma: T.string,
    })).isRequired,
    includeLocations: T.instanceOf(Set).isRequired,
    excludeLocations: T.instanceOf(Set).isRequired,
    onAddTargets: T.func.isRequired,
    onRemoveTargets: T.func.isRequired,
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
      active: null,
    };

    this._setInclude = this._setInclude.bind(this);
  }

  _updateActive(active) {
    this.setState({
      active: active,
    });
  }

  _removeTargets(ids) {
    this.props.onRemoveTargets(ids);
  }

  _addTarget(target) {
    const { include } = this.state;

    this.props.onAddTargets(target.id, { include });
    this.refs.input.clear();
  }

  _setInclude(include) {
    this.setState({ include: include });
  }

  renderTargetGroups(grouped) {
    const groupKeys = Object.keys(grouped);
    const { includeLocations, excludeLocations } = this.props;

    if (!groupKeys.length) {
      return;
    }

    return (
      <TargetList>
        { 
          groupKeys.map((key) => {
            const group = grouped[key];
            return (
              <TargetGroup key={ key } active={ key === this.state.active }>
                <TargetGroupTitle
                  onEnter={ this._updateActive.bind(this, key) }
                  onLeave={ this._updateActive.bind(this, null) }
                  onRemove={ this._removeTargets.bind(this, group.map(({ id }) => id)) }
                >
                  { key }
                </TargetGroupTitle>
                <TargetList>
                  {
                    group.map((target) => {
                      return (
                        <Target key={ target.id } onRemove={ this._removeTargets.bind(this, target.id) }>
                          <span className={classNames({
                            'Targeting__icon icon': true,
                            'icon-upvote icon-orangered': includeLocations.has(target.id),
                            'icon-downvote icon-periwinkle': excludeLocations.has(target.id),
                          })}/>
                          { target.name }
                        </Target>
                      );
                    })
                  }
                </TargetList>
              </TargetGroup>
            );
          })
        }
      </TargetList>
    );
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

    return (
      <div className='GeoTargeting'>
        <div className='form-group'>
          <label htmlFor='location'>
            Locations
            <HelpTooltip>
              <p>Enter one or more country names, states/regions, or US metro areas you wish to target.</p>
              <p><a href="#">Learn more</a></p>
            </HelpTooltip>
          </label>
          { 
            this.renderTargetGroups(grouped)
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
    );
  }

}

const mapStateToProps = (state) => ({
  includeLocations: state.includeLocations,
  excludeLocations: state.excludeLocations,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTargets: (ids, options) => dispatch(unsavedActions.addLocations(ids, options)),
  onRemoveTargets: (ids) => dispatch(unsavedActions.removeLocations(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoTargeting);
