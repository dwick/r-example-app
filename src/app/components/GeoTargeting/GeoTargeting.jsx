import 'less/forms.less';
import 'less/grid.less';

import './GeoTargeting.less';

import React from 'react';

import Combobox from 'app/components/Combobox/Combobox';
import * as regexUtils from 'app/lib/regex';

function geoSort(a, b) {
  const aname = a.country ? a.country + a.region + a.metro : a.name;
  const bname = b.country ? b.country + b.region + b.metro : b.name;

  return aname > bname ? 1 : (aname === bname ? 0 : -1);
}

function geoFilter(item, searchTerm) {
  const regex = new RegExp('^' + regexUtils.escape(searchTerm), 'i');
  const nameParts = item.name.match(/[^\()]+\(([^\)]+)\)/i);

  return regex.test(item.name) ||
    (item.region && regex.test(item.region)) ||
    (item.country && regex.test(item.country)) ||
    (nameParts && regex.test(RegExp.$1));
}

const T = React.PropTypes;

export default class GeoTargeting extends React.Component {

  static propTypes = {
    available: T.array.isRequired,
    locations: T.instanceOf(Set).isRequired,
    onAddLocation: T.func.isRequired,
    onRemoveLocation: T.func.isRequired,
  };

  static defaultProps = {
    available: [{
      id: 'US--',
      name: 'United States',
      country: 'US',
    }, {
      id: 'CA--',
      name: 'Canada',
      country: 'CA',
    }],
  }

  _addTarget(target) {
    this.props.onAddLocation(target.id);
    this.refs.input.clear();
  }

  _removeTarget(target) {
    this.props.onRemoveLocation(target.id);
  }

  render() {
    const locations = this.props.locations;
    const available = this.props.available
                      .filter(geo => !locations.has(geo.id))
                      .sort(geoSort);
    const selected = this.props.available
                      .filter((geo) => locations.has(geo.id))

    return (
      <div className='GeoTargeting'>
        <div className='help-block'>
          enter the country names or US metro areas you wish to target
        </div>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='form-group'>
              <label htmlFor='location' className='sr-only'>location</label>
              <Combobox
                ref='input'
                items={available}
                textField='name'
                onSelect={this._addTarget.bind(this)}
                filter={geoFilter}
              />
            </div>
          </div>
          <div className='col-xs-6'>
            <ul className='list-unstyled'>
              {selected.map((target) => {
                return (
                  <li key={target.id} className='GeoTargeting__target'>
                    <a
                      href='javascript: void 0;'
                      className='GeoTargeting__target-remove'
                      onClick={this._removeTarget.bind(this, target)}>
                      ×
                    </a>
                    {target.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}
