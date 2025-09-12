import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on Java, Spring Boot, Angular, Microservices, and cloud-native development.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
