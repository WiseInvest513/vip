import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Root, Strong, Text } from "mdast";
import type { Node, Parent } from "unist";
import type { VFile } from "vfile";

const illustrationSizes: Record<string, { width: number; height: number }> = {
  "/images/articles/blackstone-ai-commissioning.webp": { width: 1600, height: 900 },
  "/images/articles/blackstone-ai-workflow.webp": { width: 1600, height: 900 },
  "/images/articles/blackstone-ai-returns.webp": { width: 1600, height: 900 },
  "/images/articles/blackstone-ai-adoption.webp": { width: 1600, height: 900 },
  "/images/articles/blackstone-ai-research.webp": { width: 1600, height: 900 },
};

// CommonMark leaves **中文。**后文 as plain text because punctuation touches
// the closing delimiter. Repair only literal Chinese text nodes, never source
// HTML, escaped delimiters, inline code or fenced code. The stored text and its
// original line positions remain untouched.
function remarkChineseStrong() {
  return (tree: Root, file: VFile) => {
    const source = String(file.value);
    const visit = (parent: Parent) => {
      parent.children = parent.children.flatMap((node): Node[] => {
        if ("children" in node) visit(node as Parent);
        if (node.type !== "text") return [node];
        const text = node as Text;
        const start = text.position?.start.offset;
        const end = text.position?.end.offset;
        if (start === undefined || end === undefined || source.slice(start, end) !== text.value) return [node];
        const pieces: Node[] = [];
        let cursor = 0;
        const pairs = /(?<!\*)\*\*(?!\*)([^\s*](?:[^*\n]*[^\s*])?)\*\*(?!\*)/g;
        for (const match of text.value.matchAll(pairs)) {
          const value = match[1];
          if (!/\p{Script=Han}/u.test(value) || !/^[\p{P}\p{S}]|[\p{P}\p{S}]$/u.test(value)) continue;
          if (match.index > cursor) pieces.push({ type: "text", value: text.value.slice(cursor, match.index) } as Text);
          pieces.push({ type: "strong", children: [{ type: "text", value }] } as Strong);
          cursor = match.index + match[0].length;
        }
        if (!pieces.length) return [node];
        if (cursor < text.value.length) pieces.push({ type: "text", value: text.value.slice(cursor) } as Text);
        return pieces;
      });
    };
    visit(tree);
  };
}

// Line-based anchors are deterministic and remain identical in preview/full text.
function remarkHeadingIds() {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== "heading") continue;
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: `section-${node.position?.start.line}` } };
    }
  };
}
export function articleOutline(body: string) {
  return body.split("\n").flatMap((line, index) => {
    const match = line.match(/^#{1,2}\s+(.+)$/);
    return match ? [{ id: `section-${index + 1}`, title: match[1].replace(/[*_`]/g, "") }] : [];
  });
}
export function ArticleMarkdown({ body }: { body: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm, remarkChineseStrong, remarkHeadingIds]} components={{
    h1: ({ node, ...props }) => <h2 {...props} />,
    p: ({ node, children, ...props }) => {
      const child = node?.children.length === 1 ? node.children[0] : undefined;
      if (child?.type === "element" && child.tagName === "img") {
        const caption = child.properties.title;
        return <figure>{children}{typeof caption === "string" && <figcaption>{caption}</figcaption>}</figure>;
      }
      return <p {...props}>{children}</p>;
    },
    img: ({ node, ...props }) => <img {...props} {...(typeof props.src === "string" ? illustrationSizes[props.src] : {})} loading="lazy" decoding="async" />,
    table: ({ node, ...props }) => <div tabIndex={0} role="region" aria-label="文章数据表格"><table {...props} /></div>,
    a: ({ node, ...props }) => <a {...props} rel="noopener noreferrer" />,
  }}>{body}</ReactMarkdown>;
}
