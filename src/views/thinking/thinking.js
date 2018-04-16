import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { thinkings, createThinking } from '../../gqls/thinking';
// import { NavLink } from 'react-router-dom';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';
import { fromNow } from '../../utils/date';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';
import EditModal from './EditModal';

class Thingking extends Component {
  static propTypes = {
    thinkingsRes: PropTypes.object.isRequired,
    createThinking: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // match: PropTypes.object.isRequired
  };
  state = {
    isShowEditModal: false,
  };
  onThinkingSubmit = async thinkingValue => {
    console.log(thinkingValue);
    const { auth } = this.props;
    const { post_id: postId } = this.query;
    console.log('auth', auth);

    try {
      await this.props.createThinking({
        variables: {
          input: {
            content: thinkingValue,
            userId: auth.id,
            postId,
            status: 1,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
    this.toggleEditModal();
  };
  get query() {
    return parseQuery(this.props.location.search);
  }
  toggleEditModal = () => {
    console.log(this.state.isShowEditModal);
    this.setState({
      isShowEditModal: !this.state.isShowEditModal,
    });
  };
  render() {
    const { thinkings, loading } = this.props.thinkingsRes;
    const { isShowEditModal } = this.state;
    console.log('query', this.query);
    console.log('thinkings', thinkings);
    if (loading) return <Loading />;
    if (!thinkings) return <div>没有找到您需要的内容</div>;
    return (
      <div>
        <PostAndThinkingHeader postId={this.query.post_id} />
        {thinkings.map(thinking => (
          <div key={thinking.id}>
            <div dangerouslySetInnerHTML={{ __html: thinking.content }} />
            <span>{fromNow(thinking.updateTime)}</span>
            <Avatar src={thinking.owner.avatarUrl} />
          </div>
        ))}
        <Button
          onClick={this.toggleEditModal}
          style={{ backgroundColor: '#ED642A', color: '#fff' }}
        >
          添加
        </Button>
        {isShowEditModal && (
          <EditModal
            toggleEditModal={this.toggleEditModal}
            onThinkingSubmit={this.onThinkingSubmit}
          />
        )}
      </div>
    );
  }
}

const wrapper = compose(
  graphql(thinkings, {
    name: 'thinkingsRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { postId: query.post_id },
      };
    },
  }),
  graphql(createThinking, {
    name: 'createThinking',
    options: {
      refetchQueries: ['thinkings'],
    },
  }),
  connect(select)
);

function select(state) {
  return {
    auth: state.auth,
  };
}

export default wrapper(Thingking);
