import React, { useState } from "react";

import { Project } from "./project";

interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}

function ProjectForm({ project: initialProject, onCancel, onSave }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    })
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(project);
    }

    function validate(project: Project) {
        const error = { name: '', description: '', budget: ''};
        if (project.name.length === 0) {
            error.name = 'Name is required';
        }
        if (project.description.length === 0) {
            error.description = 'Description is required';
        }
        if (project.budget === 0) {
            error.budget = 'Budget is required';
        }
        return error;
    }

    function isValid() {
        return (errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0);
    }

     const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = { [name]: updatedValue};
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
     }
    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" id="name" placeholder="Enter name" value={project.name} onChange={handleChange}/>
            {errors.name.length > 0 && (
                <div className="card error"><p>{errors.name}</p></div>
            )}
            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
            {errors.description.length > 0 && (
                <div className="card error"><p>{errors.description}</p></div>
            )}
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.budget.length > 0 && (
                <div className="card error"><p>{errors.budget}</p></div>
            )}
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" value={project.isActive} onChange={handleChange}/>
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span />
                <button type="button" className="bordered medium" onClick={onCancel}>
                    cancel
                </button>
                </div>
        </form>
    );
}

export default ProjectForm;