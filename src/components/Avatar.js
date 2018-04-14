import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import user from '../static/icon/user-circle.svg';
import px2rem from '../styles/px2rem';

const Wrap = styled.div`
  width: ${px2rem(100)};
  height: ${px2rem(100)};
  img {
    width: 100%;
    height: 100%;
  }
`;

const Avatar = ({ src }) => (
  <Wrap>
    <img src={src || user} alt="avatar" />
  </Wrap>
);
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};
Avatar.defaultProps = {};
export default Avatar;