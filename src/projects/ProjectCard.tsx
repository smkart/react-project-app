import { Link } from 'react-router-dom';
import { Project } from "./project";
import React from "react";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function ProjectCard({ project, onEdit }: ProjectCardProps) {
    function formatDescription(description: string): string {
        return description.substring(0, 60) + '...';
      }

      const handleClickEvent = ( project: Project) => {
        onEdit(project);
      }
      
    return (
        <div key={project.id} className="cols-sm">
        <div className="card">
            
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
            <Link to={'/projects/' + project.id} className="link">
                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>
                <p>
                    {formatDescription(project.description)}
                </p>
                <p>
                    budget: {project.budget.toLocaleString()}
                </p>
             </Link>
                <button className=" bordered" onClick={() => {
                    handleClickEvent(project);
                }}>
                    <span className="icon-edit "></span>
                    Edit
                </button>
            </section> 
        </div>
    </div>
    )
}

export default ProjectCard;