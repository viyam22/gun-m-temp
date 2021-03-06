import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Avatar from '../../components/Avatar';

import PostList from './PostList';
import { posts } from '../../gqls/post';
import { Container, Topbar } from './index.style';
import Search from './Search';
class Index extends Component {
  static propTypes = {
    postsRes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  // onPulling = e => {
  //   console.log('e', e);
  //   const documentHeight = document.documentElement.clientHeight;
  //   const bodyHeight = document.body.clientHeight;
  //   const scrollToper = document.documentElement.scrollTop;
  //   console.log('触发', documentHeight, bodyHeight, scrollToper, this);
  // };
  state = {
    isShowSearch: false,
  };
  showSearch = () => {
    this.setState({
      isShowSearch: !this.state.isShowSearch,
    });
    // this.props.history.push('/search');
  };
  render() {
    const { isShowSearch } = this.state;
    const { auth } = this.props;
    const { posts = [] } = this.props.postsRes;
    return (
      <Container>
        <Topbar>
          <Icon type="search" onClick={this.showSearch} className="icon" />
          <div className="logo">logo</div>
          <Avatar src={auth.avatarUrl} className="avatar" />
        </Topbar>
        <PostList posts={posts} />
        {isShowSearch && <Search />}
      </Container>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(posts, {
    name: 'postsRes',
  }),
  connect(select)
);

export default wrapper(Index);
