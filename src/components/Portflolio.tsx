import React from 'react';
import { config } from '../config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/Avatar';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { ContactIcon } from './ui/ContactIcon';
import { getContactItems, getPrimaryEmail } from '../utils/contacts';
import { normalizeSkill, getSkillBarColor, getSkillCardColor } from '../utils/skills';

export const Portfolio: React.FC = () => {
    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
    };
    
    const getFullName = (name: string, surname: string) => {
        return `${name} ${surname}`;
    };

    // Get dynamic contact items
    const contactItems = getContactItems(config.contact);
    const primaryEmail = getPrimaryEmail(config.contact);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="container py-12">
                {/* Hero Section */}
                <Card className="max-w-4xl mx-auto mb-8 hero-card">
                    <CardHeader className="text-center pb-8">
                        <div className="flex justify-center mb-6">
                            <Avatar style={{ width: '80px', height: '80px' }} className="ring-4 ring-primary/10 hero-avatar">
                                <AvatarImage 
                                    src={config.personal.image} 
                                    alt={getFullName(config.personal.name, config.personal.surname)}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                                <AvatarFallback className="text-lg font-semibold">
                                    {getInitials(config.personal.name, config.personal.surname)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-4xl font-bold mb-2 hero-title">{getFullName(config.personal.name, config.personal.surname)}</CardTitle>
                        <CardDescription className="text-xl text-muted-foreground mb-4 hero-subtitle">
                            {config.personal.title}
                        </CardDescription>
                        <p className="text-muted-foreground max-w-2xl mx-auto hero-description">
                            {config.personal.description}
                        </p>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                        <div className="flex gap-4 justify-center mb-6 hero-buttons">
                            <Button size="lg" className="font-semibold">
                                View My Work
                            </Button>
                            {primaryEmail && (
                                <Button variant="outline" size="lg">
                                    <a href={`mailto:${primaryEmail}`} className="text-inherit no-underline">
                                        Get In Touch
                                    </a>
                                </Button>
                            )}
                        </div>
                        
                        {/* Dynamic Contact Links */}
                        {contactItems.length > 0 && (
                            <div className="flex gap-4 justify-center text-sm text-muted-foreground flex-wrap hero-contacts">
                                {contactItems.map((contact) => (
                                    <a 
                                        key={contact.key}
                                        href={contact.href} 
                                        target={contact.isEmail ? undefined : "_blank"} 
                                        rel={contact.isEmail ? undefined : "noopener noreferrer"} 
                                        className="flex items-center gap-2 hover:text-primary transition-colors"
                                    >
                                        <ContactIcon type={contact.icon} className="w-4 h-4" />
                                        <span>{contact.label}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Skills & Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                    {/* Skills Section */}
                    <Card className="skill-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Skills & Technologies</CardTitle>
                            <CardDescription>
                                Technologies I work with on a regular basis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                {config.skills.map((skill, index) => {
                                    const skillItem = normalizeSkill(skill);
                                    return (
                                        <div 
                                            key={index}
                                            className={`skill-card px-4 py-4 rounded-lg border transition-all hover:scale-[1.01] ${getSkillCardColor(skillItem.level)}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="font-semibold text-foreground min-w-[8rem]">{skillItem.name}</div>
                                                {skillItem.level ? (
                                                    <ProgressBar 
                                                        value={skillItem.level} 
                                                        max={10}
                                                        color={getSkillBarColor(skillItem.level)}
                                                        className="flex-1"
                                                    />
                                                ) : (
                                                    <div className="flex-1"></div>
                                                )}
                                                
                                                {skillItem.description && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {skillItem.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Projects Section */}
                    <Card className="project-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Featured Projects</CardTitle>
                            <CardDescription>
                                Some of my recent work and side projects
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {config.projects.map((project, index) => (
                                <div key={index} className="project-item border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-foreground">{project.title}</h4>
                                        <div className="flex gap-2">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" 
                                                   className="text-xs text-primary hover:underline">
                                                    GitHub
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                                   className="text-xs text-primary hover:underline">
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tech.map((tech, techIndex) => (
                                            <span 
                                                key={techIndex}
                                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Experience & Education Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Experience Section */}
                    <Card className="experience-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Work Experience</CardTitle>
                            <CardDescription>
                                My professional journey and career highlights
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {config.experience.map((exp, index) => (
                                <div key={index} className="experience-item border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-foreground">{exp.position}</h4>
                                        <span className="text-xs text-muted-foreground">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-2">{exp.company}</p>
                                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Education Section */}
                    <Card className="education-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Education</CardTitle>
                            <CardDescription>
                                My academic background and qualifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {config.education.map((edu, index) => (
                                <div key={index} className="education-item border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                                        <span className="text-xs text-muted-foreground">{edu.year}</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary mb-2">{edu.institution}</p>
                                    {edu.description && (
                                        <p className="text-sm text-muted-foreground">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};