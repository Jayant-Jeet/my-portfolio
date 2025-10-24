/*
 * Half-Blood Coder Portfolio
 * Copyright (c) 2025 Jayant Jeet Tomar
 * All Rights Reserved
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this software, via any medium, is strictly prohibited.
 * 
 * For licensing inquiries: https://www.halfbloodcoder.com/contact
 */

"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/navbar';

// Sample projects data based on actual GitHub repositories
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features interactive animations, bento grid layouts, and a beautiful gradient-based design system.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/Jayant-Jeet/my-portfolio",
    liveUrl: "https://halfbloodcoder.com",
    image: "/featured.png",
    category: "Featured",
    size: "large"
  },
  {
    id: 9,
    title: "Cron-jutsu",
    description: "A web application designed to help developers learn, test, and master cron schedule expressions with confidence. It offers an intuitive interface, real-time validation, and contextual guidance to demystify time-based job scheduling. Ideal for developers, DevOps engineers, and technical learners seeking a reliable and interactive way to sharpen their cron skills.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Jayant-Jeet/my-portfolio/tree/master/src/app/cron-jutsu",
    liveUrl: "https://halfbloodcoder.com/cron-jutsu",
    image: "/ui-ux.png",
    category: "Frontend",
    size: "large"
  },
  {
    id: 8,
    title: "Offer Checkout",
    description: "A playful, order-style offer summary generator with image export and email features. Built in Next.js using html-to-image and a serverless email endpoint.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "html-to-image", "Nodemailer"],
    githubUrl: "https://github.com/Jayant-Jeet/my-portfolio/tree/master/src/app/offer-checkout",
    liveUrl: "https://halfbloodcoder.com/offer-checkout",
  image: "/ui-ux.png",
    category: "Frontend",
    size: "large"
  },
  {
    id: 2,
    title: "L&TT SME Planner App Frontend",
    description: "A comprehensive Angular application for managing Subject Matter Expert (SME) scheduling and effort tracking. This application provides a user-friendly interface for planning, scheduling, and monitoring SME activities across different projects and teams.",
    tech: ["Angular", "TypeScript", "SCSS"],
    githubUrl: "https://github.com/Jayant-Jeet/sme-planner",
    liveUrl: "#",
    image: "/ui-ux.png",
    category: "Frontend",
    size: "large"
  },
  {
    id: 3,
    title: "L&TT SME Planner App Backend",
    description: "A Spring Boot REST API backend for the Learning & Training Team (L&TT) SME (Subject Matter Expert) Planner application. This system helps manage SME activities, schedules, and resource planning.",
    tech: ["SpringBoot", "REST API", "MySQL"],
    githubUrl: "https://github.com/Jayant-Jeet/ltt-sme-planner-backend",
    liveUrl: "#",
    image: "/backend.png",
    category: "Backend",
    size: "large"
  },
  {
    id: 4,
    title: "Competitive Programming Solutions",
    description: "A comprehensive collection of competitive programming solutions and algorithms implemented in Java. Covers various problem-solving techniques and data structures.",
    tech: ["Java", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/Jayant-Jeet/cp",
    liveUrl: "#",
    image: "/hackathon.png",
    category: "Programming",
    size: "large"
  },
  {
    id: 5,
    title: "SIH 2020 - Sixth Sense",
    description: "Smart India Hackathon 2020 project for sign language based communication and information system for deaf and mute people. Uses Machine Learning and Mediapipe for gesture recognition.",
    tech: ["Machine Learning", "Mediapipe", "C++"],
    githubUrl: "https://github.com/Amankumar1456/SIH2020_IC464_Sixth_Sense_GitRepository_MLRIT",
    liveUrl: "#",
    image: "/machine-learning.png",
    category: "Machine Learning",
    size: "large"
  },
  {
    id: 6,
    title: "Kanoon - Legal Query System",
    description: "Law made easy! An intelligent app that allows users to query about punishments for any offense using Natural Language Processing. Built with Jina core and Jinabox for semantic search.",
    tech: ["JavaScript", "NLP", "Jina", "Machine Learning"],
    githubUrl: "https://github.com/Jayant-Jeet/kanoon",
    liveUrl: "#",
    image: "/machine-learning.png",
    category: "Machine Learning",
    size: "large"
  },
  {
    id: 7,
    title: "Save The Planet",
    description: "An engaging memory game built with Flutter/Dart that promotes environmental awareness while challenging players' memory skills with beautiful graphics and smooth animations.",
    tech: ["Flutter", "Dart", "Mobile Development"],
    githubUrl: "https://github.com/Jayant-Jeet/save-the-planet",
    liveUrl: "#",
    image: "/mobile-development.png",
    category: "Mobile",
    size: "large"
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const sizeClasses: Record<string, string> = {
    large: "project-card-large",
    medium: "project-card-medium",
    small: "project-card-small"
  };

  return (
    <div className={`project-card ${sizeClasses[project.size]}`}>
      <div className="project-card-content">
        <div className="project-image">
          <Image
            src={project.image}
            alt={project.title}
            width={60}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <div className="project-info">
          <div className="project-category">{project.category}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
          
          <div className="project-links">
            <Link 
              href={project.githubUrl} 
              className="project-link github-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/github.svg" alt="GitHub" width={20} height={20} />
              Code
            </Link>
            {project.liveUrl !== "#" && (
              <Link 
                href={project.liveUrl} 
                className="project-link live-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/globe.svg" alt="Live Demo" width={20} height={20} />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  const categories = ['All', 'Featured', 'Frontend', 'Backend', 'Full Stack', 'Machine Learning', 'Mobile', 'Programming'];

  return (
    <div>
      <Navbar />
      
      <main className="projects-main">
        <div className="projects-container">
          <div className="projects-header">
            <h1 className="projects-title">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="projects-subtitle">
              A collection of my work spanning full-stack development, 
              data science, and everything in between.
            </p>
          </div>

          <div className="projects-filter">
            {categories.map((category) => {
              const count = category === 'All' ? projects.length : projects.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category} <span className="filter-count">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="bento-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="no-projects">
                <div className="no-projects-content">
                  <Image src="/file.svg" alt="No projects" width={60} height={60} style={{ opacity: 0.5 }} />
                  <h3>No projects found</h3>
                  <p>Try selecting a different category filter.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
