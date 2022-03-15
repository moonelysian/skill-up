### 문제

https://programmers.co.kr/skill_check_assignments/100

### 참고

https://prgms.tistory.com/53

### 나의 풀이

> 프로그래머스의 설명과 다르게 진행한 부분 위주

#### Node.js

```javascript
export default function Nodes({ $app, initState, onClick }) {
  /*
  ...
  생략
  ...
  */
  this.render = () => {
    const allNodes = this.state.isRoot
      ? this.state.nodes
      : [{ type: "PREV", name: "", id: "prev" }, ...this.state.nodes];
    /* 뒤로가기 함수를 따로 안 넘겨도 type통해 onClick 내부에서 구분이 가능하게 구현했습니다. */
  };
}
```
<br/>

#### Modal.js

> 프로그래머스 풀이에서는 Loading과 ImageViewer를 나눴다. 하지만 난 둘이 src만 다르고 기본 형태가 동일하여 하나에 묶었다.
> 
```javascript
export default function Modal({ $app, initState, handleClose }) {
  /*
  initState로 isLoading과 selectedImage가 넘어옵니다. 이 둘을 가지고 Loading용 modal인지 이미지를 위한 modal인지 구분합니다.
  */
  this.render = () => {
    /* 
    selectedImage가 있을 때만 click과 keydown 이벤트를 인지할 수 있게 합니다.
    이때 keydown의 경우는 인식을 위해 document에 이벤트 리스너를 설정합니다.
    두 가지 이벤트가 일어나면 handleClose 함수를 실행합니다.
    */
  };
}
