import React from 'react';
import Image from 'next/image';

interface Skill {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'api' | 'tools' | 'languages';
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'languages' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'languages' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'languages' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'languages' },
  { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', category: 'languages' },
  
  // Frontend Technologies
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'frontend' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'frontend' },
  { name: 'Sass', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', category: 'frontend' },
  { name: 'Less', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg', category: 'frontend' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
  { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'frontend' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', category: 'frontend' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend' },
  
  // Backend Technologies
  { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'backend' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'backend' },
  { name: 'Microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'backend' },
  
  // Databases
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database' },
  { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', category: 'database' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'database' },
  
  // APIs
  { name: 'REST API', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg', category: 'api' },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'api' },
  
  // DevOps & Tools
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'devops' },
  { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', category: 'devops' },
  { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', category: 'devops' },
  
  // Tools
  { name: 'ESLint', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg', category: 'tools' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'tools' },
  { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', category: 'tools' },
  { name: 'Apollo Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'api' },
  { name: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'api' },
  { name: 'Insomnia', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/insomnia/insomnia-original.svg', category: 'api' },
  { name: 'Splunk', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/splunk/splunk-original-wordmark.svg', category: 'devops' }
];

const SkillsScroll: React.FC = () => {
  // Duplicate the skills array to create seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return 'var(--teal)';
      case 'backend': return 'var(--orange)';
      case 'database': return 'var(--red)';
      case 'devops': return 'var(--cream)';
      case 'api': return '#9333ea';
      case 'languages': return '#10b981';
      case 'tools': return '#f59e0b';
      default: return 'var(--teal)';
    }
  };

  return (
    <div className="skills-scroll-container">
      <div className="skills-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', justifyContent: 'center' }}>
        <h2 className="skills-title">My Toolbox</h2>
        <div className="toolbox-icon" style={{ marginTop: '2px' }}>
          <Image
            src="/toolbox-removebg.png"
            alt="Toolbox icon"
            width={48}
            height={48}
          />
        </div>
      </div>
      
      <div className="skills-scroll-wrapper">
        <div className="skills-scroll-track">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="skill-item"
              style={{ '--category-color': getCategoryColor(skill.category) } as React.CSSProperties}
            >
              <div className="skill-logo">
                <Image
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={40}
                  height={40}
                  style={{ filter: 'brightness(1.2)' }}
                />
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsScroll;
