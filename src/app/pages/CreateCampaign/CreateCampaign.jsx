import { connect } from 'react-redux';
import React from 'react';

import GeoTargeting from 'app/components/GeoTargeting/GeoTargeting';
import * as unsavedActions from 'app/actions/unsaved';

const T = React.PropTypes;

const CreateCampaign = (props) => {
  return (
    <div className='container'>
      <h2>Create Campaign</h2>
      <GeoTargeting
        locations={ props.locations }
        onAddLocation= { props.onAddLocation }
        onRemoveLocation= { props.onRemoveLocation }
      />
    </div>
  );
}

CreateCampaign.propTypes = {
  locations: T.instanceOf(Set),
};

const mapStateToProps = (state) => ({
  locations: state.locations,
});

const mapDispatchToProps = (dispatch) => ({
  onAddLocation: (id) => dispatch(unsavedActions.addLocation(id)),
  onRemoveLocation: (id) => dispatch(unsavedActions.removeLocation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
