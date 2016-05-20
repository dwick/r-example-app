import React from 'react';

import GeoTargeting from 'app/components/GeoTargeting';
import LanguageTargeting from 'app/components/LanguageTargeting';

const T = React.PropTypes;

const CreateCampaign = (props) => {
  return (
    <div className='container'>
      <fieldset>
        <legend>Audience</legend>
        <GeoTargeting />
      </fieldset>
      <fieldset>
        <legend>Langauges</legend>
        <LanguageTargeting />
      </fieldset>
    </div>
  );
}

export default CreateCampaign;
