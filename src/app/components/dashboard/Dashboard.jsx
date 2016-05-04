import './Dashboard.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const T = React.PropTypes;

const renderSubreddit = data => (
  <a
    className='Dashboard__subreddit'
    key={ data.id }
    style={ {
      backgroundColor: data.key_color ? data.key_color : null,
      backgroundImage: data.bannerImage ? `url(${data.bannerImage})` : null,
    } }
    href={ `${data.url}edit` }
  >
    <div className='Dashboard__subredditTop'>
      <div className='Dashboard__subredditHeader'>
        <div className='Dashboard__subredditName'>{ `r/${data.displayName}` }</div>
        <div className='Dashboard__subredditTitle'>{ data.title }</div>
      </div>
      <div className='Dashboard__subredditDescription'>{ data.publicDescription }</div>
    </div>
  </a>
);

export class Dashboard extends React.Component {
  static propTypes = {
    subreddits: T.array.isRequired,
  };

  render() {
    const { subreddits } = this.props;

    return (
      <div className='Dashboard'>
        <div className='Dashboard__subredditsContainer'>
          { subreddits.map(renderSubreddit) }
        </div>
      </div>
    );
  }
}

const selector = createSelector(
  (state) => state.moddedSubs.ids,
  (state) => state.moddedSubs.data,
  (ids, data) => ({
    subreddits: ids.map(id => data[id])
  })
);

export default connect(selector)(Dashboard);
