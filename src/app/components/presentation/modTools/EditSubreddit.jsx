import './EditSubreddit.less';
import React from 'react';
import flatten from 'lodash/array';
import Input from '../../common/Input';
import Textarea from '../../common/Textarea';
import Loading from '../../common/Loading';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as editSubredditActions from '../../../actions/editSubreddit';
import { LANGUAGES } from '../../../../lib/constants';

const NAV_ITEMS = [
  ['Basic Info', 'navBasic'],
  ['Sidebar', 'navSidebar'],
  ['Submission & Content', 'navSubmissionText'],
  ['Wiki', 'navWiki'],
  ['Look and Feel', 'navLookAndFeel'],
  ['Other Options', 'navOtherOptions'],
];

const TEXT = {
  TITLE: 'e.g., slashdot: news for nerds, stuff that matters',
  DESCRIPTION: 'appears in search results and social media links. 500 characters max.',
  SIDEBAR: 'shown in the sidebar of your subreddit. 5120 characters max.',
  SUBMISSION_TEXT: 'text to show on submission page. 1024 characters max.',
  LANGUAGE_OPTIONS: Object.keys(LANGUAGES).map(l => ({ value: l, text: LANGUAGES[l] })),
  TYPE: {
    PUBLIC: 'Anyone can view and submit',
    RESTRICTED: 'Anyone can view, but only some are approved to submit links',
    PRIVATE: 'Only approved members can view and submit',
    EMPLOYEES: 'Only Reddit employees can view; the employee list is pulled from live config',
    GOLD: 'Only reddit gold members can view and submit',
  },
  LINK_TYPE: {
    ANY: 'Any link type is allowed',
    LINKS_ONLY: 'Only link to external sites are allowed',
    TEXT_ONLY: 'Only text/self posts are allowed',
    LB_HEAD: 'Custom label for submit link button (blank for default)',
    LB_PLACE: 'Submit a new link',
    PB_HEAD: 'Custom label for submit text post button (blank for default)',
    PB_PLACE: 'Submit a new text post',
  },
  WIKI: {
    DISABLED: 'Wiki is disabled for all users except mods',
    MOD_EDIT: 'Only mods, approved wiki contributors, or those on a page\'s edit list may edit',
    ANYONE: 'Anyone who can submit to the subreddit may edit',
    KARMA_HEAD: 'Subreddit karma required to edit and create wiki pages',
    KARMA_VAL: '0',
    AGE_HEAD: 'Account age (days) required to edit and create wiki pages',
    AGE_VAL: '0',
  },
  SPAM_FILTER: {
    EXP: `'high' is the standard filter, 'low' disables most filtering, 'all' will
          filter every post initially and they will need to be approved manually to be visible.`
  },
  OTHER: {
    COMMENT_SORT: 'All comment threads will use this sorting method by default',
    OVER18: 'Viewers must be over eighteen years old',
    ALLOW_TOP: 'Allow this subreddit to be included /r/all as well as the default and trending lists',
    SHOW_MEDIA: 'Show thumnail images of content',
    BANNED_MODQUEUE: 'Exclude posts by site-wide banned users from modqueue/unmoderated',
    PUBLIC: 'Make the traffic state page available to everyone',
    DELETED_COMMENTS: 'Collapse deleted and removed comments',
    COMMENT_SCORE_HIDE_MINS: '0',
    COMMENT_SORT_OPTIONS: [
      { value: null, text: 'none (recommended for most subreddits)'},
      { value: 'confidence', text: 'best' },
      { value: 'old', text: 'old' },
      { value: 'top', text: 'top' },
      { value: 'qa', text: 'Q&A' },
      { value: 'controversial', text: 'controversial' },
      { value: 'new', text: 'new' },
    ],
  },
};

const box = (...content) => <div className='EditSubreddit__box' children={ content }/>;
const header = text => <div className='EditSubreddit__header'>{ text }</div>;
const miniHeader = text => <div className='EditSubreddit__miniHeader'>{ text }</div>;
const radioTable = (...content) => <table className='EditSubreddit__typeSelector'><tbody children={ content }/></table>;

const page = (...content) => {
  let cls = 'EditSubreddit__page';
  if (content[0]) { cls += ' m-show'; }

  return <div className={ cls } children={ content.slice(1) } />;
};

const radioTableRow = (name, value, selectedValue, labelText, description) => (
  <tr className='EditSubreddit__typeSelectorRow' key={ `edit_tr_${name}_${value}` }>
    <td className='EditSubreddit__typeSelectorRadioCol'
        children={ radio(name, value, selectedValue, labelText) }/>
    <td className='EditSubreddit__typeSelectorTextCol'>
      { description }
    </td>
  </tr>
);

const radioGrid = (...rows) => (
  <table className='EditSubreddit__radioGrid'>
    <tbody children={ rows.map(radioGridRow)}/>
  </table>
);

const radioGridRow = rowArguments => (
  <tr className='EditSubreddit__radioGridRow'>
    <td className='EditSubreddit__radioGridTextCol'>{ rowArguments.label }</td>
    <td
      className='EditSubreddit__radioGridRadioCol'
      children={ flatten(rowArguments.options.map(o => {
        return radio(rowArguments.name, o.value, rowArguments.selected, o.label)
      })) }
    />
  </tr>
);

const radio = (name, value, selectedValue, labelText) => ([
  <input
    type='radio'
    name={ name }
    defaultValue={ value }
    id={ `edit_${name}_${value}` }
    key={ `edit_${name}_${value}` }
    defaultChecked={ selectedValue === value }
    className='EditSubreddit__radioButton'
  />,
  <label htmlFor={ `edit_${name}_${value}` }>{ labelText }</label>
]);

const input = (name, placeholder, value) => (
  <div className='EditSubreddit__input' key={ `edit_input_${name}` }>
    <Input
      name={ name }
      placeholder={ placeholder }
      initialValue={ value }
    />
  </div>
);

const textarea = (name, placeholder, value) => (
  <div className='EditSubreddit__textarea' key={ `edit_text_${name}` }>
    <Textarea
      name={ name }
      placeholder={ placeholder }
      initialValue={ value }
    />
  </div>
);

const dropdown = (name, options, selected) => (
  <select className='EditSubreddit__selector' name={ name } defaultValue={ selected } key={ `edit_select_${name}` }>
    { options.map(({value, text}) => <option value={value} key={ value }>{ text }</option>) }
  </select>
);

const checkbox = (name, label, selected) => (
  <div className='EditSubreddit__checkboxRow'>
    <input
      className='EditSubreddit__checkbox'
      type='checkbox'
      defaultChecked={ selected ? 'checked' : null }
      name={ name }
      id={ `edit_checkbox_${name}` }
    />
    <label htmlFor={ `edit_checkbox_${name}` }>{ label }</label>
  </div>
);

class EditSubreddit extends React.Component {

  handleNavChange(navState) {
    return this.props.dispatch(editSubredditActions.setNavState(navState));
  }

  renderBasicInfo() {
    const { navState, subreddit } = this.props;
    const { title, publicDescription, lang, subredditType } = subreddit;

    return page(
      navState === 'navBasic',
      box(
        header('Title'),
        input('title', TEXT.TITLE, title)
      ),
      box(
        header('Description'),
        textarea('description', TEXT.DESCRIPTION, publicDescription)
      ),
      box(
        header('Type'),
        radioTable(
          radioTableRow('type', 'public', subredditType, 'public', TEXT.TYPE.PUBLIC),
          radioTableRow('type', 'restricted', subredditType, 'restricted', TEXT.TYPE.RESTRICTED),
          radioTableRow('type', 'private', subredditType, 'private', TEXT.TYPE.PRIVATE),
          radioTableRow('type', 'employees_only', subredditType, 'employees only', TEXT.TYPE.EMPLOYEES),
          radioTableRow('type', 'gold_only', subredditType, 'gold only', TEXT.TYPE.GOLD)
        )
      ),
      box(
        header('Language'),
        dropdown('lang', TEXT.LANGUAGE_OPTIONS, lang)
      )
    );
  }

  renderSidebar() {
    const { navState, subreddit } = this.props;
    const { description, relatedSubreddits } = subreddit;

    return page(
      navState === 'navSidebar',
      box(
        header('Sidebar'),
        textarea('sidebar', TEXT.SIDEBAR, description)
      ),
      box(
        header('Related Subreddits'),
        input('sr', null, relatedSubreddits.join(', '))
      )
    );
  }

  renderSubmissionText() {
    const {
      submissionType,
      submitText,
      submitLinkLabel,
      submitTextLabel,
    } = this.props.subreddit;

    return page(
      this.props.navState === 'navSubmissionText',
      box(
        header('Submission Text'),
        textarea('submit_text', TEXT.SUBMISSION_TEXT, submitText)
      ),
      box(
        header('Content Options'),
        radioTable(
          radioTableRow('link_type', 'any', submissionType, 'any', TEXT.LINK_TYPE.ANY),
          radioTableRow('link_type', 'link', submissionType, 'links only', TEXT.LINK_TYPE.LINKS_ONLY),
          radioTableRow('link_type', 'self', submissionType, 'text posts only', TEXT.LINK_TYPE.TEXT_ONLY)
        ),
        miniHeader(TEXT.LINK_TYPE.LB_HEAD),
        input('submit_link_label', TEXT.LINK_TYPE.LB_PLACE, submitLinkLabel),
        miniHeader(TEXT.LINK_TYPE.PB_HEAD),
        input('submit_text_label', TEXT.LINK_TYPE.PB_PLACE, submitTextLabel)
      ),
    );
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
            { this.renderBasicInfo() }
            { this.renderSidebar() }
            { this.renderSubmissionText() }
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
  (state) => state.moddedSubs.data[state.platform.currentPage.urlParams.subredditUUID],
  (navState, subreddit) => ({
    navState,
    subreddit,
  })
);

export default connect(selector)(EditSubreddit);
