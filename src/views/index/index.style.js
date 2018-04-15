import styled from 'styled-components';
import px2rem from '../../styles/px2rem';

export const Container = styled.div `
  overflow: scroll;
  > .load {
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: red;
  }
`

export const Topbar = styled.div `
  height: ${px2rem(140)};
  width: 100%;
  padding: ${px2rem(40)};
  > .icon {
    height: ${px2rem(60)};
    font-size: ${px2rem(34)};
    line-height: ${px2rem(60)};
    float: left;
    color: #C7C7D3;
  }
  > .avatar {
    width: ${px2rem(60)};
    height: ${px2rem(60)};
    float: right;
  }
  > .logo {
    display: block;
    margin: 0 auto;
    float: left;
  }
`