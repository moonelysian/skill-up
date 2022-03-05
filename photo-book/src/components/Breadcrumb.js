const _buildNode = (items) => {
  if (items) {
    return items.map((item) => `<div>${item.name}</div>`).join("");
  }
  return "";
};

export default function Breadcrumb({ $app, initState }) {
  this.state = initState;
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div>root</div>${_buildNode(this.state)}`;
  };
}
