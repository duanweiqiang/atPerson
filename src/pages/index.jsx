import React, { Component } from 'react';
import styles from './index.less';
import Comment from './components/Comment';

class AtPerson extends Component {
  render() {
    return (
      <div style={{ paddingLeft: 20 }}>
        <div className={styles.title}>论坛@人员功能</div>
        <div className={styles.tips}>
          本功能由Duke提供，仅供技术探讨，禁止用于商业用途。
        </div>
        <div className={styles.tips}>
          更多信息请关注Duke的博客：
          <a target="_blank" href="https://duanweiqiang.github.io">
            https://duanweiqiang.github.io
          </a>
        </div>
        <Comment />
      </div>
    );
  }
}
export default AtPerson;
