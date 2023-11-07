import React, { useState } from "react";

import { Project } from "./project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListsProps {
    projects: Array<Project>;
    onSave: (project: Project) => void;
}

function ProjectLists({ projects, onSave }: ProjectListsProps) {
    const [ projectBeingEdited, setProjectBeingEdited ] = useState({});

    const handleClick = (project: Project) => {
        setProjectBeingEdited(project);
        console.log(project);
    }

    const onCancelClick = () => {
        setProjectBeingEdited({});
    }
    return (
        <div className="row">
            {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                    {
                        projectBeingEdited === project ? ( <ProjectForm onCancel={onCancelClick} onSave={onSave} project={project}/> ) : ( <ProjectCard project={project} onEdit={handleClick}/> )
                    }
                </div>
            ))
            }
        </div>
    )
}


export default ProjectLists;