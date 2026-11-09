import React from 'react';
import { config } from '../config';
import { ContactIcon } from './ui/ContactIcon';
import { getContactItems } from '../utils/contacts';
import { RichText } from './ui/RichText';
import type { Highlight } from '../config/schema';

const Highlights: React.FC<{ items?: Highlight[] }> = ({ items }) =>
    items?.length ? (
        <ul className="tl-list">
            {items.map((h, i) =>
                typeof h === 'string' ? (
                    <li key={i}><RichText text={h} /></li>
                ) : (
                    <li key={i}>
                        <RichText text={h.text} />
                        <Highlights items={h.items} />
                    </li>
                )
            )}
        </ul>
    ) : null;

export const Portfolio: React.FC = () => {
    const fullName = `${config.personal.name} ${config.personal.surname}`;
    const initials = `${config.personal.name[0]}${config.personal.surname[0]}`.toUpperCase();
    const contactItems = getContactItems(config.contact);

    return (
        <div className="page-wrapper">
            <main className="container">

                {/* Hero */}
                <header className="hero card">
                    <div className="hero-avatar-wrap">
                        <img
                            src={config.personal.image}
                            alt={fullName}
                            width={84}
                            height={84}
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
                            {contactItems.map((c) => (
                                <a
                                    key={c.key}
                                    href={c.href}
                                    target={c.isEmail ? undefined : '_blank'}
                                    rel={c.isEmail ? undefined : 'noopener noreferrer'}
                                    className="contact-link"
                                >
                                    <ContactIcon type={c.icon} />
                                    <span>{c.label}</span>
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
                                            <div className="tl-company">
                                                {exp.company}{exp.location && ` · ${exp.location}`}
                                            </div>
                                            {exp.description && (
                                                <p className="tl-desc"><RichText text={exp.description} /></p>
                                            )}
                                            <Highlights items={exp.highlights} />
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
                                            <div className="tl-company">
                                                {edu.institution}{edu.location && ` · ${edu.location}`}
                                            </div>
                                            {edu.description && (
                                                <p className="tl-desc"><RichText text={edu.description} /></p>
                                            )}
                                            <Highlights items={edu.highlights} />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {config.volunteering && (
                            <section aria-label="Volunteering" className="card section-card">
                                <h2 className="section-title">Volunteering</h2>
                                <div className="timeline">
                                    {config.volunteering.map((v, i) => (
                                        <article key={i} className="tl-item">
                                            <div className="tl-dot" />
                                            <div className="tl-content">
                                                <div className="tl-top">
                                                    <span className="tl-position">{v.organization}</span>
                                                    <time className="tl-date">{v.duration}</time>
                                                </div>
                                                <p className="tl-desc"><RichText text={v.description} /></p>
                                                <Highlights items={v.highlights} />
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar */}
                    <aside className="sidebar">

                        <section aria-label="Skills" className="card section-card">
                            <h2 className="section-title">Skills</h2>
                            {config.skills.map((g) => (
                                <div key={g.name} className="skill-group">
                                    <h3 className="skill-group-title">{g.name}</h3>
                                    <div className="skill-group-items">
                                        {g.items.map((item) => (
                                            <span key={item} className="skill-tag">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
                                {p.date && <time className="tl-date project-date">{p.date}</time>}
                                <p className="project-desc"><RichText text={p.description} /></p>
                                <Highlights items={p.highlights} />
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
