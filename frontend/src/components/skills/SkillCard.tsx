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
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-[#1B3A6B]/30 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-[#2C2C2C] line-clamp-1">{skill.name}</h3>
        <span className="inline-flex items-center gap-1 text-xs text-[#2C2C2C]/50 shrink-0">
          <Download className="w-3 h-3" />
          {skill.install_count}
        </span>
      </div>

      <p className="text-sm text-[#2C2C2C]/60 line-clamp-2 mb-3">{skill.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#1B3A6B]/10 text-[#1B3A6B]">
          {skill.category.name}
        </span>
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#8FAF8A]/20 text-[#2C2C2C]/70"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#2C2C2C]/40">
        <span>by {skill.author.display_name || skill.author.username}</span>
        <span>v{skill.version}</span>
      </div>
    </Link>
  );
}
