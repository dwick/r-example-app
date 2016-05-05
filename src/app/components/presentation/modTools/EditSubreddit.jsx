import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as editSubredditActions from '../../../actions/editSubreddit';

const NAV_ITEMS = [
  ['Basic Info', 'navBasic'],
  ['Sidebar', 'navSidebar'],
  ['Submission & Content', 'navSubmissionText'],
  ['Wiki', 'navWiki'],
  ['Look and Feel', 'navLookAndFeel'],
  ['Other Options', 'navOtherOptions'],
];

class EditSubreddit extends React.Component {

  handleNavChange(navState) {
    return this.props.dispatch(editSubredditActions.setNavState(navState));
  }

  render() {
    return (
      <div className='EditSubreddit'>
        <div className='EditSubreddit__nav'>
          { NAV_ITEMS.map(([title, key]) => {
            let cls = 'EditSubreddit__navRow';
            if (this.props.navState === key) { cls += ' m-selected'; }

            return (
              <div
                className={ cls }
                key={ key }
                onClick={ () => this.handleNavChange(key) }
              >
                { title }
              </div>
            );
          }) }
        </div>
        <form className='EditSubreddit__content'>
          <div className='EditSubreddit__contentTop'>

          </div>
          <div className='EditSubreddit__contentBottom'>
            
          </div>
        </form>
      </div>
    );
  }
};

const selector = createSelector(
  (state) => state.editSubreddit.navState,
  (navState) => ({
    navState
  })
);

export default connect(selector)(EditSubreddit);
