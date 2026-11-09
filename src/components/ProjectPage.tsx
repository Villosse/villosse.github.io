import React from 'react';
import { config } from '../config';
import { RichText } from './ui/RichText';
import { Highlights } from './ui/Highlights';

const fullName = `${config.personal.name} ${config.personal.surname}`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="page-wrapper">
        <main className="container">
            <div>
                <a href="/">← {fullName}</a>
            </div>
            {children}
        </main>
    </div>
);

export const ProjectPage: React.FC<{ slug: string }> = ({ slug }) => {
    const project = config.projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <Layout>
                <header className="card section-card">
                    <h1 className="hero-name">Project not found</h1>
                    <p className="tl-desc">There is no project at this address.</p>
                </header>
            </Layout>
        );
    }

    return (
        <Layout>
            <header className="card section-card">
                <div className="tl-top">
                    <h1 className="hero-name">{project.title}</h1>
                    <div className="project-links">
                        {project.date && <time className="tl-date">{project.date}</time>}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                GitHub
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                                Demo
                            </a>
                        )}
                    </div>
                </div>
                {project.role && <div className="tl-company">{project.role}</div>}
                <p className="hero-description"><RichText text={project.description} /></p>
                <div className="tech-tags">
                    {project.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                    ))}
                </div>
            </header>

            {project.highlights?.length ? (
                <section aria-label="Highlights" className="card section-card">
                    <h2 className="section-title">Highlights</h2>
                    <Highlights items={project.highlights} />
                </section>
            ) : null}

            {project.details?.length ? (
                <section aria-label="Details" className="card section-card">
                    <h2 className="section-title">Details</h2>
                    {project.details.map((d, i) => (
                        <p key={i} className="hero-description"><RichText text={d} /></p>
                    ))}
                </section>
            ) : null}

            {project.images?.length ? (
                <section aria-label="Images" className="card section-card">
                    {project.images.map((img) => (
                        <figure key={img.src}>
                            <img src={img.src} alt={img.alt} loading="lazy" />
                            {img.caption && <figcaption className="tl-desc"><RichText text={img.caption} /></figcaption>}
                        </figure>
                    ))}
                </section>
            ) : null}
        </Layout>
    );
};
