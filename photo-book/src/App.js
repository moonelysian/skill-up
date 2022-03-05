import Nodes from "./components/Nodes.js";
import { request } from "./apis/api.js";
import Breadcrumb from "./components/Breadcrumb.js";

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const handleClick = async (node) => {
    if (node.type === "PREV") {
      const depth = [...this.state.depth];
      const now = depth.pop();
      const prevNodeId = now.parent ? now.parent.id : null;
      const prevNodes = await request(prevNodeId);
      this.setState({
        isRoot: prevNodeId ? false : true,
        nodes: prevNodes,
        depth: [...depth],
      });
    }
    if (node.type === "DIRECTORY") {
      const nextNodes = await request(node.id);
      this.setState({
        isRoot: false,
        nodes: nextNodes,
        depth: [...this.state.depth, node],
      });
    }
    if (node.type === "FILE") {
      alert("file");
    }
  };

  const breadcrumb = new Breadcrumb({ $app, initState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: handleClick,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({ ...this.state, isRoot: true, nodes: rootNodes });
    } catch (e) {
      alert(e.message);
    }
  };
  init();
}
