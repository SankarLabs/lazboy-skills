import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface Props {
  content: string;
}

export default function SkillContentViewer({ content }: Props) {
  return (
    <div className="prose max-w-none prose-headings:text-[#1B3A6B] prose-a:text-[#C0392B]">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
