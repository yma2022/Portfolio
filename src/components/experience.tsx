import { experienceStories } from '@/lib/experience';

export const Experience = () => (
  <ol className="career-timeline">
    {experienceStories.map((item) => (
      <li key={item.name}>
        <div className="career-date">
          <span className="eyebrow">{item.date}</span>
          <span>{item.location}</span>
        </div>
        <article className="career-entry">
          <p className="eyebrow">{item.role}</p>
          <h2>{item.name}</h2>
          <h3>{item.focus}</h3>
          <p className="muted-copy">{item.text}</p>
          <ul className="tech-inline">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </article>
      </li>
    ))}
  </ol>
);
