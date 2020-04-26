import React, { Component } from 'react';
import styles from './index.less';
import Comment from './components/Comment';

class AtPerson extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>sss</h1>
        <Comment />
      </div>
    );
  }
}
export default AtPerson;
