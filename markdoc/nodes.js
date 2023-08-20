import { nodes as defaultNodes } from '@markdoc/markdoc'
import { Fence } from '@/components/Fence'
import { Tag } from '@markdoc/markdoc';


const nodes = {
  document: {
    render: undefined,
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
    },
  },
  image: {
    ...defaultNodes.image,
    transform: (node, config) => {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);
  
      return [
        new Tag(
          `img`,
          { ...attributes, class: 'mb-2' },
          children
        ),
        new Tag(
          'span',
          { class: 'text-sm text-center mt-4 mb-4 text-slate-400 block' },
          [node.attributes.title]
        )
      ]
    }
  }
}

export default nodes
