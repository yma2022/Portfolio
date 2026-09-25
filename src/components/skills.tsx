import { skillsData } from '@/lib/skills-data';

const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'aiml', name: 'AI & data' },
  { id: 'devops', name: 'Infrastructure & tools' },
] as const;

export const Skills = () => (
  <div className="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
    {categories.map(({ id, name }) => (
      <div key={id} className="border-t pt-5">
        <h3 className="eyebrow mb-6">{name}</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-5">
          {skillsData
            .filter((skill) => skill.category === id)
            .map(({ icon, name: skill }) => (
              <li key={skill} className="flex w-16 flex-col items-center gap-2">
                <span aria-hidden="true" className="[&>svg]:size-9">
                  {icon}
                </span>
                <span className="text-center text-xs leading-5 text-muted-foreground">
                  {skill}
                </span>
              </li>
            ))}
        </ul>
      </div>
    ))}
  </div>
);
