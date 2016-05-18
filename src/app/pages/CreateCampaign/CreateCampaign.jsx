import React from 'react';

import GeoTargeting from 'app/components/GeoTargeting/GeoTargeting';

const T = React.PropTypes;

const CreateCampaign = (props) => {
  return (
    <div className='container'>
      <fieldset>
        <legend>Audience</legend>
        <GeoTargeting />
      </fieldset>
    </div>
  );
}

export default CreateCampaign;
