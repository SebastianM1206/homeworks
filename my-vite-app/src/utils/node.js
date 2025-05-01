export class sideBarNode {
  constructor(title, link = "", component = null) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}
