import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { fromNow } from '../../utils/date';

const Post = styled(Link)`
  color: #444444;
  display: inline-block;
  border-bottom: 1px solid #ebebeb;
`;
const CoverWrap = styled.div`
  width: 4rem;
  height: 2.4rem;
  position: relative;
  overflow: hidden;
  > img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class PostList extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  };
  state = {
    test: 1,
  };
  render() {
    console.log(this.state.test);
    const { posts } = this.props;
    console.log('posts', posts);
    return (
      <Fragment>
        {posts.map(post => (
          <Post 
            key={post.id} 
            to={`/post/${post.id}`}
          >
            <div>
              <h3>{post.title}</h3>
              <CoverWrap>
                <img src={post.cover} alt="cover" />
              </CoverWrap>
              <p className="breaf">{post.brief}</p>
              <span>{fromNow(post.create_time)}</span>
            </div>
          </Post>            
        ))}
      </Fragment>
    )
  }
};
export default PostList;