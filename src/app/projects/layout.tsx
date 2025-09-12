import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Featured projects including Cron-jutsu and enterprise-grade full-stack solutions.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
