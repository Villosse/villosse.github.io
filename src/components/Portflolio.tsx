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
            <div className="container">

                {/* Hero */}
                <div className="card hero">
                    <div className="hero-avatar-wrap">
                        <img
                            src={config.personal.image}
                            alt={fullName}
                            className="hero-avatar"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="hero-avatar-fallback" style={{ display: 'none' }}>
                            {initials}
                        </div>
                    </div>

                    <div className="hero-body">
                        <h1 className="hero-name">{fullName}</h1>
                        <p className="hero-title">{config.personal.title}</p>
                        <p className="hero-description">{config.personal.description}</p>

                        <div className="hero-actions">
                            {primaryEmail && (
                                <a href={`mailto:${primaryEmail}`} className="btn btn-primary btn-lg">
                                    Get in touch
                                </a>
                            )}
                            <div className="hero-contacts">
                                {contactItems.map((c) => (
                                    <a
                                        key={c.key}
                                        href={c.href}
                                        target={c.isEmail ? undefined : '_blank'}
                                        rel={c.isEmail ? undefined : 'noopener noreferrer'}
                                        className="contact-link"
                                    >
                                        <ContactIcon type={c.icon} className="w-4 h-4" />
                                        {c.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills + Experience */}
                <div className="two-col">

                    {/* Skills */}
                    <div className="card">
                        <div className="card-header">
                            <p className="section-title">Skills</p>
                        </div>
                        <div className="card-content">
                            <div className="skill-list">
                                {config.skills.map((skill, i) => {
                                    const s = normalizeSkill(skill);
                                    return s.level ? (
                                        <div key={i} className="skill-row">
                                            <span className="skill-name">{s.name}</span>
                                            <div className="skill-bar-track">
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
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="card">
                        <div className="card-header">
                            <p className="section-title">Experience</p>
                        </div>
                        <div className="card-content">
                            <div className="timeline">
                                {config.experience.map((exp, i) => (
                                    <div key={i} className="timeline-item">
                                        <div className="timeline-top">
                                            <span className="timeline-position">{exp.position}</span>
                                            <span className="timeline-date">{exp.duration}</span>
                                        </div>
                                        <div className="timeline-company">{exp.company}</div>
                                        <p className="timeline-desc">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects + Education */}
                <div className="two-col">

                    {/* Projects */}
                    <div className="card">
                        <div className="card-header">
                            <p className="section-title">Projects</p>
                        </div>
                        <div className="card-content">
                            <div className="project-list">
                                {config.projects.map((p, i) => (
                                    <div key={i} className="project-item">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="card">
                        <div className="card-header">
                            <p className="section-title">Education</p>
                        </div>
                        <div className="card-content">
                            <div className="timeline">
                                {config.education.map((edu, i) => (
                                    <div key={i} className="timeline-item">
                                        <div className="timeline-top">
                                            <span className="timeline-position">{edu.degree}</span>
                                            <span className="timeline-date">{edu.year}</span>
                                        </div>
                                        <div className="timeline-company">{edu.institution}</div>
                                        {edu.description && (
                                            <p className="timeline-desc">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
