import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import { SKIP, visit } from 'unist-util-visit';

const remarkMermaid = () => (tree: Root) => {
  visit(tree, 'code', (node, index, parent) => {
    if (node.lang !== 'mermaid' || !parent || index === undefined) return;

    const element: MdxJsxFlowElement = {
      type: 'mdxJsxFlowElement',
      name: 'Mermaid',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'chart', value: node.value },
      ],
      children: [],
    };

    parent.children.splice(index, 1, element);
    return [SKIP, index];
  });
};

export default remarkMermaid;
