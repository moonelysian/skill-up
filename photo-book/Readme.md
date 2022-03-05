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
