import { ReactNode } from 'react';

interface RichTextNode {
  type: string;
  text?: string;
  content?: RichTextNode[];
  attrs?: any;
  marks?: any[];
}

interface RichTextRendererProps {
  content: RichTextNode | RichTextNode[] | any;
}

export const RichTextRenderer = ({ content }: RichTextRendererProps) => {
  if (!content) return null;

  // Handle if content is the full richtext object with a 'content' property
  const nodes = content.content || (Array.isArray(content) ? content : [content]);

  const renderNode = (node: RichTextNode, index: number): ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.type === 'text') {
      let text = node.text || '';
      
      // Apply marks (bold, italic, etc.)
      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type === 'bold') {
            text = `**${text}**`;
          }
          if (mark.type === 'italic') {
            text = `*${text}*`;
          }
        });
      }
      
      return <span key={index}>{text}</span>;
    }

    // Handle paragraph
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
          {node.content?.map((child, i) => renderNode(child, i))}
        </p>
      );
    }

    // Handle headings
    if (node.type === 'heading') {
      const level = node.attrs?.level || 2;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const className = level === 1 ? "text-3xl font-bold mb-4 mt-8" :
                       level === 2 ? "text-2xl font-bold mb-3 mt-6" :
                       "text-xl font-semibold mb-2 mt-4";
      
      return (
        <HeadingTag key={index} className={className}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </HeadingTag>
      );
    }

    // Handle lists
    if (node.type === 'bullet_list') {
      return (
        <ul key={index} className="list-disc list-inside mb-4 space-y-2">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );
    }

    if (node.type === 'ordered_list') {
      return (
        <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );
    }

    if (node.type === 'list_item') {
      return (
        <li key={index} className="text-foreground/90">
          {node.content?.map((child, i) => renderNode(child, i))}
        </li>
      );
    }

    // Handle blockquote
    if (node.type === 'blockquote') {
      return (
        <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
          {node.content?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );
    }

    // Handle code block
    if (node.type === 'code_block') {
      return (
        <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
          <code className="text-sm">
            {node.content?.map((child, i) => renderNode(child, i))}
          </code>
        </pre>
      );
    }

    // Handle horizontal rule
    if (node.type === 'horizontal_rule') {
      return <hr key={index} className="my-8 border-border" />;
    }

    // Handle image
    if (node.type === 'image') {
      return (
        <img
          key={index}
          src={node.attrs?.src}
          alt={node.attrs?.alt || ''}
          className="w-full rounded-lg my-6"
        />
      );
    }

    // Fallback: render children if they exist
    if (node.content) {
      return (
        <div key={index}>
          {node.content.map((child, i) => renderNode(child, i))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {nodes.map((node: RichTextNode, index: number) => renderNode(node, index))}
    </div>
  );
};
