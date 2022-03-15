import Nodes from "./Nodes.js";
import { request } from "../apis/api.js";
import Breadcrumb from "./Breadcrumb.js";
import Modal from "./Modal.js";

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    isLoading: false,
    selectedImage: null,
  };

  const handleClick = async (node) => {
    if (node.type === "PREV") {
      const depth = [...this.state.depth];
      const now = depth.pop();
      const prevNodeId = now.parent ? now.parent.id : null;
      this.setState({ ...this.state, isLoading: true });
      const prevNodes = await request(prevNodeId);
      this.setState({
        isRoot: prevNodeId ? false : true,
        nodes: prevNodes,
        depth: [...depth],
        isLoading: false,
        selectedImage: null,
      });
    }
    if (node.type === "DIRECTORY") {
      this.setState({ ...this.state, isLoading: true });
      const nextNodes = await request(node.id);
      this.setState({
        isRoot: false,
        nodes: nextNodes,
        depth: [...this.state.depth, node],
        isLoading: false,
        selectedImage: null,
      });
    }
    if (node.type === "FILE") {
      this.setState({
        ...this.state,
        selectedImage: node.filePath,
      });
    }
  };

  const handleClose = (e) => {
    if (e.keyCode === 27) {
      const $target = document.querySelector(".ImageViewer");
      return ($target.style.display = "none");
    }
    if (e.target.classList.value === "Modal ImageViewer") {
      return (e.target.style.display = "none");
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
  const modals = new Modal({ $app, initState: this.state, handleClose });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    modals.setState({
      isLoading: this.state.isLoading,
      selectedImage: this.state.selectedImage,
    });
  };

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isRoot: true,
        isLoading: true,
      });
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      });
    } catch (e) {
      alert(e.message);
    }
  };
  init();
}
