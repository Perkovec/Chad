const React = require('react');
const ContentBarPostWrite = require('./ContentBarPostWrite');
const ContentBarPosts = require('./ContentBarPosts');
const ContentBarDrafts = require('./ContentBarDrafts');
const shallowCompare = require('react-addons-shallow-compare');
const PropTypes = require('prop-types');

class ContentBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'PostWrite',
    };

    this.props.signal.register('MenuWritePost', () => this.setState({ content: 'PostWrite' }));
    this.props.signal.register('MenuPosts', () => this.setState({ content: 'Posts' }));
    this.props.signal.register('MenuDrafts', () => this.setState({ content: 'Drafts' }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let content;
    if (this.state.content === 'PostWrite') {
      content = (<ContentBarPostWrite
        defaults={this.props.data.postWriteDefaults}
        signal={this.props.signal}
        local={this.props.local}
      />);
    } else if (this.state.content === 'Posts') {
      content = (<ContentBarPosts
        posts={this.props.data.posts}
        signal={this.props.signal}
        local={this.props.local}
      />);
    } else if (this.state.content === 'Drafts') {
      content = (<ContentBarDrafts
        drafts={this.props.data.drafts}
        signal={this.props.signal}
        local={this.props.local}
      />);
    }

    return (
      <div className="content-bar">
        {content}
      </div>
    );
  }
}
ContentBar.propTypes = {
  signal: PropTypes.object,
  data: PropTypes.object,
  local: PropTypes.object,
};

module.exports = ContentBar;
