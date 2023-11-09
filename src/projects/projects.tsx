import React, { useEffect, useState } from 'react';

import { Project } from './project';
import  ProjectLists from './ProjectLists';
// import { MOCK_PROJECTS } from './MockProjects';
import { projectAPI } from './ProjectApi';

function ProjectsPages() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
       async function loadProjects() {
        setLoading(true);
        try {
            const data = await projectAPI.get(currentPage);
            setError('');
            if (currentPage === 1) {
                setProjects(data);
            } else {
                setProjects((projects) => [...projects, ...data]);
            } 
        } catch (error) { 
            if (error instanceof Error) { 
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
       };
       loadProjects();
    }, [currentPage])
    const onSaveClick = (project: Project) => { 
        projectAPI.put(project)
        .then((updatedProject) => {
            let updatedProjects = projects.map((p) => {
                return p.id === project.id ? project : p;
            });
            setProjects(updatedProjects);
        })
        .catch((error) => {
            if (error instanceof Error) {
                setError(error.message);
            }
        });
    }

    const handleMoreClick = () => { 
        setCurrentPage((currentPage) => currentPage + 1);
    }

    return (
        <> { error && (
            <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}
            <h1>My projects</h1>
            <ProjectLists projects={projects} onSave={onSaveClick}/>
                  {!loading && !error && (
       <div className="row">
        <div className="col-sm-12">
          <div className="button-group fluid">
            <button className="button default" onClick={handleMoreClick}>
                More...
             </button>
            </div>
          </div>
        </div>
      )}
            { loading && (
            <div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
                </div>
            )}
        </>
    )
}

export default ProjectsPages;