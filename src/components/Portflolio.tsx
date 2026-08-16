import React from 'react';
import { config } from '../config';
import { ContactIcon } from './ui/ContactIcon';
import { getContactItems, getPrimaryEmail } from '../utils/contacts';
import { normalizeSkill } from '../utils/skills';

export const Portfolio: React.FC = () => {
    const fullName = `${config.personal.name} ${config.personal.surname}`;
    const initials = `${config.personal.name[0]}${config.personal.surname[0]}`.toUpperCase();
    const contactItems = getContactItems(config.contact);
    const primaryEmail = getPrimaryEmail(config.contact);

    return (
        <div className="page-wrapper">
            <main className="container">

                {/* Hero */}
                <header className="hero card">
                    <div className="hero-avatar-wrap">
                        <img
                            src={config.personal.image}
                            alt={fullName}
                            className="hero-avatar"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fb = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fb) fb.style.display = 'flex';
                            }}
                        />
                        <div className="hero-avatar-fallback">
                            {initials}
                        </div>
                    </div>

                    <div className="hero-body">
                        <h1 className="hero-name">{fullName}</h1>
                        <p className="hero-title">{config.personal.title}</p>
                        <p className="hero-description">{config.personal.description}</p>

                        <div className="hero-contacts">
                            {primaryEmail && (
                                <a href={`mailto:${primaryEmail}`} className="contact-link contact-link-primary">
                                    <ContactIcon type="email" className="w-4 h-4" />
                                    {primaryEmail}
                                </a>
                            )}
                            {contactItems.filter(c => !c.isEmail).map((c) => (
                                <a
                                    key={c.key}
                                    href={c.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <ContactIcon type={c.icon} className="w-4 h-4" />
                                    {c.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Body: main content + sidebar */}
                <div className="body-layout">

                    {/* Main column */}
                    <div className="main-col">

                        <section aria-label="Experience" className="card section-card">
                            <h2 className="section-title">Experience</h2>
                            <div className="timeline">
                                {config.experience.map((exp, i) => (
                                    <article key={i} className="tl-item">
                                        <div className="tl-dot" />
                                        <div className="tl-content">
                                            <div className="tl-top">
                                                <span className="tl-position">{exp.position}</span>
                                                <time className="tl-date">{exp.duration}</time>
                                            </div>
                                            <div className="tl-company">{exp.company}</div>
                                            <p className="tl-desc">{exp.description}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section aria-label="Education" className="card section-card">
                            <h2 className="section-title">Education</h2>
                            <div className="timeline">
                                {config.education.map((edu, i) => (
                                    <article key={i} className="tl-item">
                                        <div className="tl-dot" />
                                        <div className="tl-content">
                                            <div className="tl-top">
                                                <span className="tl-position">{edu.degree}</span>
                                                <time className="tl-date">{edu.year}</time>
                                            </div>
                                            <div className="tl-company">{edu.institution}</div>
                                            {edu.description && (
                                                <p className="tl-desc">{edu.description}</p>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <aside className="sidebar">

                        <section aria-label="Skills" className="card section-card">
                            <h2 className="section-title">Skills</h2>
                            <div className="skill-list">
                                {config.skills.map((skill, i) => {
                                    const s = normalizeSkill(skill);
                                    return s.level ? (
                                        <div key={i} className="skill-row">
                                            <span className="skill-name">{s.name}</span>
                                            <div className="skill-bar-track" title={`${s.level}/10`}>
                                                <div
                                                    className="skill-bar-fill"
                                                    style={{ width: `${(s.level / 10) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={i} className="skill-row">
                                            <span className="skill-tag">{s.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </aside>
                </div>

                {/* Projects — full width */}
                <section aria-label="Projects" className="card section-card">
                    <h2 className="section-title">Projects</h2>
                    <div className="project-grid">
                        {config.projects.map((p, i) => (
                            <article key={i} className="project-item">
                                <div className="project-top">
                                    <span className="project-title">{p.title}</span>
                                    <div className="project-links">
                                        {p.github && (
                                            <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                                GitHub
                                            </a>
                                        )}
                                        {p.demo && (
                                            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="project-desc">{p.description}</p>
                                <div className="tech-tags">
                                    {p.tech.map((t, j) => (
                                        <span key={j} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};
