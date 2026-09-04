'use client';

import { motion } from 'motion/react';

type Item = {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  highlights: string[];
  sections?: {
    title: string;
    role?: string;
    items: string[];
  }[];
};

const experience: Item[] = [
  {
    title: 'Business Analyst',
    subtitle: 'PebbleRoad',
    description: 'Internship',
    date: 'May 2026 – Sept 2026',
    highlights: [
      'Engineered a 0-to-1 pipeline for automated process orchestration, incorporating agentic AI, guardrails (ie. Human-in-the-Loop, Agent-as-a-Judge), and dashboards to track performance',
      'Built 8+ data visualisations (ie. time series graphs, pie charts) and debugged code in React, TypeScript',
      'Conducted competitive market research to identify enterprise use cases and inform system architecture decisions',
      'Led stakeholder discovery interviews, translating raw pain points into POC designs and pitch materials',
      'Managed CMS information architecture across 300+ files while aligning teams via Jira/Confluence and driving stakeholder delivery.'
    ],
  },
  {
    title: 'Teaching Assistant (IS211 Interaction Design & Prototyping)',
    subtitle: 'Singapore Management University',
    date: 'Aug 2026 – Present',
    description: 'Under Prof Lee Min Hun',
    highlights: [
      'Mentoring and providing regular 1-1 consultations to 40+ students',
      'Advising on requirements delivery, UI/UX fixes, product ideation, usability, A/B testing, etc.'
    ],
  },
  {
    title: 'Teaching Assistant',
    subtitle: 'Singapore Management University',
    date: 'Aug 2025 – Nov 2025',
    description: 'Under Prof Serena Lim',
    highlights: [
      'Delivered structured feedback to 40+ students to help them hone professional communication and presentation skills.',
      'Partnered with professor to refine lesson materials via student feedback.'
    ],
  },
];

const education: Item[] = [
  {
    title: 'Singapore Management University',
    subtitle: 'BSc Information Systems (Business Analytics & Artificial Intelligence)',
    date: '2024 – Present',
    highlights: [
      'Module Distinctions: Computing Fundamentals, Interaction Design & Prototyping, Business Process Analysis & Solutioning, Management Communication, Big Questions',
    ],
    sections: [
      {
        title: 'Women in Tech',
        role: 'Member',
        items: [
          'UWS STEMentorship 2025',
          'UWS STEM First Fintech Programme 2026',
        ],
      },
      {
        title: 'Hackathons',
        items: [
          'Top 5 Finalist | SMU Hack For Cities 2026 | Pitched to panel from Infocomm Media Development Authority (IMDA)',
          'Top 30% | Ellipsis Code# 2025',
        ],
      },
    ],
  },
  {
    title: 'Anglo-Chinese Junior College',
    subtitle: 'GCE A Levels',
    date: '2022 – 2023',
    highlights: [
      'Distinctions: H2 English Literature, H1 General Paper, H1 Project Work',
    ],
    sections: [
      {
        title: 'AC Press',
        role: 'Vice President',
        items: [
          'Spearheaded coverage of Methodist Walk 2023', 
          'Fostered connections between club and wider student body to enrich articles',
        ],
      },
      {
        title: 'Debate & Oratorical Society',
        role: 'Member',
        items: [
          'Highest Speaker Score | Asian Online Debating Championships (WSDC) 2022',
          'Represented school in regional and international competitions',
          'Debate mentor for Junior Lexis (2022, 2023)',
        ],
      },
    ],
  },
];

function QualificationCard({ item }: { item: Item }) {
  return (
    <motion.article
      className="qualification-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="qualification-header">
        <div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>

          {item.description && (
            <small>{item.description}</small>
          )}
        </div>

        <span>{item.date}</span>
      </div>

      <ul className="qualification-list">
        {item.highlights.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {item.sections?.map((section) => (
        <div
          className="qualification-subsection"
          key={section.title}
        >
          <h4>
            {section.title}

            {section.role && (
              <span>{section.role}</span>
            )}
          </h4>

          <ul>
            {section.items.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      ))}
    </motion.article>
  );
}

function QualificationSection({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  return (
    <section className="qualification-section" id="qualifications">
      <motion.h2
        className="about-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        >
        {title}
    </motion.h2>

      <div className="qualification-grid">
        {items.map((item) => (
          <QualificationCard
            key={item.title}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default function Qualifications() {
  return (
    <main className="qualifications-page">
      <QualificationSection
        title="Experience"
        items={experience}
      />

      <QualificationSection
        title="Education"
        items={education}
      />
    </main>
  );
}
