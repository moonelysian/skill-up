const _buildNode = (node) => {
  return `<div class="Node" data-node-id=${
    node.id
  }><img src="../../assets/${node.type.toLowerCase()}.png"/><div>${
    node.name
  }</div></div>`;
};

export default function Nodes({ $app, initState, onClick }) {
  this.state = initState;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.onClick = onClick;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const allNodes = this.state.isRoot
      ? this.state.nodes
      : [{ type: "PREV", name: "", id: "prev" }, ...this.state.nodes];

    if (allNodes) {
      const innerNodes = allNodes.map((node) => _buildNode(node)).join("");
      this.$target.innerHTML = innerNodes;
    }

    this.$target.querySelectorAll(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        const { nodeId } = e.target.closest(".Node").dataset;
        const selectedNode = allNodes.find((node) => node.id === nodeId);
        if (selectedNode) {
          this.onClick(selectedNode);
        }
      });
    });
  };

  this.render();
}
