import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import type { SkillListItem } from '../../types';

interface Props {
  skill: SkillListItem;
}

export default function SkillCard({ skill }: Props) {
  return (
    <Link
      to={`/skills/${skill.slug}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{skill.name}</h3>
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 shrink-0">
          <Download className="w-3 h-3" />
          {skill.install_count}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{skill.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
          {skill.category.name}
        </span>
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>by {skill.author.display_name || skill.author.username}</span>
        <span>v{skill.version}</span>
      </div>
    </Link>
  );
}
