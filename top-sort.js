'use strict';

/** https://stackoverflow.com/a/63261494/13378247 */

class Node {
  constructor(value, rankings) {
    this.value = value;
    this.prev = new Set;
    this.order = 0;
    this.a_before_b = (a, b) => rankings[a].inferiors.has(b) || rankings[b].superiors.has(a);
    this.b_before_a = (a, b) => rankings[b].inferiors.has(a) || rankings[a].superiors.has(b);
  }
  orderWith(other) {
    if (other === this) return;
    if (this.a_before_b(this.value, other.value) || this.b_before_a(other.value, this.value)) {
      other.prev.add(this);
    } else if (this.a_before_b(other.value, this.value) || this.b_before_a(this.value, other.value)) {
      this.prev.add(other);
    }
  }
  setOrder(path = new Set) {
    if (this.order) return
    if (path.has(this)) throw new Error('Topological sort encountered a cycle.');
    let order = 1;
    for (let prev of this.prev) {
      prev.setOrder(path.add(this));
      order = Math.max(order, prev.order + 1);
    }
    this.order = order; 
  }
}

export default function sort(arr, rankings) {
  let nodes = {}; 
  for (let value of arr) nodes[value] = nodes[value] || new Node(value, rankings);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      nodes[arr[i]].orderWith(nodes[arr[j]]);
    }
  }

  const nodeList = [];

  for (let node of Object.values(nodes)) {
    node.setOrder();
    const { value, order } = node;
    nodeList.push({ value, order });
  }

  return nodeList.sort((a, b) => a.order - b.order);
}
