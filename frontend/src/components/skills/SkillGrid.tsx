import type { SkillListItem } from '../../types';
import SkillCard from './SkillCard';

interface Props {
  skills: SkillListItem[];
}

export default function SkillGrid({ skills }: Props) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No skills found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
