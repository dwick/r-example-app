import React from 'react';

import GeoTargeting from 'app/components/GeoTargeting';
import LanguageTargeting from 'app/components/LanguageTargeting';
import CommunityTargeting from 'app/components/CommunityTargeting';

const T = React.PropTypes;

const CreateCampaign = (props) => {
  return (
    <div className='container'>
      <fieldset>
        <legend>Audience</legend>
        <GeoTargeting />
        <CommunityTargeting />
        <LanguageTargeting />
      </fieldset>
    </div>
  );
}

export default CreateCampaign;
