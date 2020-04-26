import React, { Component } from 'react';
import { message, Checkbox } from 'antd';
// import TreeNode2 from '@components/EmployeeSelector/TreeNode';
import style from './comment.less';

let textDom = null;
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personDataList: [], //人员列表，默认前20个
      curSelectItem: null, //当前选中的人员
      total: 0,
    };
    this.selectStartIndex = -1; //是否搜索@人员的开始位置
    this.selectText = ''; //搜索的关键字
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keydownEvent, false);
    this.setState({
      personDataList: [],
      total: 0,
    });
    this.selectStartIndex = -1; //是否搜索@人员的开始位置
    this.selectText = ''; //搜索的关键字
    textDom = document.getElementById('textArea');
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownEvent, false);
  }
  keydownEvent = e => {
    //
    if (e.keyCode === 8) {
      const selection = document.getSelection();
      this.anchorNode = selection.anchorNode;
      const range = selection.getRangeAt(0);

      // 删除@模块
      if (selection.focusNode.parentNode.nodeName === 'SPAN') {
        textDom?.removeChild(range.startContainer.parentElement);
      }
    }
    if ([38, 40].indexOf(e.keyCode) > -1) {
      //up&down
      const { personDataList, curSelectItem } = this.state;
      personDataList.length > 0 && e.preventDefault(); //有下拉是阻止冒泡
      let targetIndex = 0;
      personDataList.forEach((item, index) => {
        targetIndex =
          item.employeeId === curSelectItem.employeeId ? index : targetIndex;
      });
      if (e.keyCode === 40) {
        //down
        targetIndex =
          targetIndex === personDataList.length - 1 ? 0 : targetIndex + 1;
      }
      if (e.keyCode === 38) {
        //up
        targetIndex =
          targetIndex === 0 ? personDataList.length - 1 : targetIndex - 1;
      }
      this.setState({ curSelectItem: personDataList[targetIndex] });
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      const { curSelectItem } = this.state;
      curSelectItem && this.selectPerson(curSelectItem);
      this.setState({ curSelectItem: null });
    }
  };
  //评论@人员
  onChangeAtPerson = () => {
    // if (textDom && textDom.innerText && textDom.innerText.length > 0) {
    //   this.props.setOkDisable(false);
    // } else {
    //   this.props.setOkDisable(true);
    // }
    const selection = document.getSelection();
    this.anchorNode = selection.anchorNode;
    const currentChar = selection.focusNode.nodeValue?.charAt(
      selection.anchorOffset - 1,
    );
    if (selection.focusNode.parentNode.nodeName === 'SPAN') {
      //不允许编辑@人员
      textDom?.removeChild(selection.focusNode.parentNode);
      this.setState({ personDataList: [] });
      this.selectStartIndex = -1;
    } else if (currentChar === '@') {
      //搜索模块
      this.selectStartIndex = selection.anchorOffset; //表示开启搜索
      this.setState({ personDataList: [] });
      this.getPersonByText('');
      this.selectText = '';
    } else if (
      currentChar !== '@' &&
      this.selectStartIndex > -1 &&
      this.selectStartIndex < selection.anchorOffset
    ) {
      //记录搜索字段
      this.selectText = selection.focusNode.nodeValue?.substring(
        this.selectStartIndex,
        selection.anchorOffset,
      );
      this.getPersonByText(this.selectText);
    } else {
      this.selectStartIndex = -1;
      this.setState({ personDataList: [] });
    }
    // this.props.stateChange(textDom);
  };
  //选择@人员
  selectPerson = item => {
    const anchorNode = this.anchorNode;
    const selectStartIndex = this.selectStartIndex;
    const atPresonDom = `&nbsp;<span style="background-color:#F4F4F6;padding: 3px 5px;border-radius: 3px;" id=${item.employeeId} name=${item.employeeName}>@${item.employeeName}</span>&nbsp;`;
    let reasonDom = '';
    const range = document.createRange();
    let targetDomIndex = 0;
    [...textDom.childNodes].forEach((each, index) => {
      if (each.nodeName === 'SPAN') {
        reasonDom += each.outerHTML;
      } else if (anchorNode === each) {
        targetDomIndex = index;
        const tempEachDom = each;
        const dom1 = tempEachDom.data.substring(0, selectStartIndex - 1);
        const dom2 = atPresonDom;
        const dom3 = tempEachDom.data.substring(
          selectStartIndex + this.selectText.length,
          each.data.length,
        );
        reasonDom += dom1 + dom2 + dom3;
      } else {
        reasonDom += each.data;
      }
    });
    textDom.innerHTML = reasonDom;
    const textDomChildList = [...textDom.childNodes];
    const textDomLastIndex =
      textDomChildList.length - 1 > -1 ? textDomChildList.length - 1 : 0;
    const targetIndex =
      targetDomIndex + 2 > textDomLastIndex
        ? textDomLastIndex
        : targetDomIndex + 2;
    const targetAnchorNode = textDomChildList[targetIndex];
    const selection = document.getSelection();
    range.setStart(targetAnchorNode, 1);
    range.setEnd(targetAnchorNode, 1);
    selection.removeAllRanges();
    selection.addRange(range);
    this.selectText = '';
    this.setState({ personDataList: [] });
    this.selectStartIndex = -1;
  };
  // 根据条件获取=>人员信息列表
  getPersonByText = async (selectText = '') => {
    const result = await this.props.getPerson(selectText);
    //
    if (result.code === 200) {
      this.setState({
        personDataList: result.data.records || [],
        total: result.data?.total || 0,
        curSelectItem: (result.data.records || [])[0],
      });
    } else {
      message.error(result.data.msg);
    }
  };
  resetDom = () => {
    textDom = null;
  };
  render() {
    const { personDataList, curSelectItem, total } = this.state;
    if (!textDom) {
      textDom = document.getElementById('textArea');
    }
    // this.okDisabled = textDom?.innerText?.length>0?false:true;
    return (
      <>
        <div className={style.comment}>
          <div style={{ padding: '3px 10px 0 0' }}>
            <label className={style.pass}>评论内容</label>
          </div>
          <div
            contentEditable="true"
            id="textArea"
            onInput={this.onChangeAtPerson}
            className={style.testArea}
            placeholder="请输入评论，可以@其他人"
          />
        </div>
        {personDataList.length > 0 && (
          <div className={style.personMenuList}>
            {
              // personDataList.map((item,index,key)=>{
              //   return<div
              //     key={key}
              //     style={curSelectItem.employeeId===item.employeeId?{backgroundColor:'rgba(12,140,246,0.1)'}:{}}
              //     className={style.personItem}
              //     onClick={()=>this.selectPerson(item)}
              //   >
              //       <TreeNode2
              //           {...item}
              //           parentNode="dropdownClassName"
              //           checkable={false}
              //           text={this.selectText}
              //       />
              //   </div>
              // })
            }
            {total > 5 && (
              <div
                style={{ textAlign: 'center', color: '#ADAFB7', fontSize: 12 }}
              >
                等{total}人，请输入姓名精确搜索
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
export default Comment;