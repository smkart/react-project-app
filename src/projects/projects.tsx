import React, { useState } from 'react';

import { MOCK_PROJECTS } from './MockProjects';
import { Project } from './project';
import  ProjectLists from './ProjectLists';

function ProjectsPages() {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const onSaveClick = (project: Project) => { 
        let updatedProjects = projects.map((p) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    }
    return (
        <>
            <h1>My projects</h1>
            <ProjectLists projects={projects} onSave={onSaveClick}/>
        </>
    )
}

export default ProjectsPages;