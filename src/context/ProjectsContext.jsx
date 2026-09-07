import { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects } from '../data/projects';

const STORAGE_KEY = 'paimana_projects_v1';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return null;
  }
  return null;
};

const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => loadFromStorage() || initialProjects);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // storage unavailable - keep in-memory only
    }
  }, [projects]);

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const resetProjects = () => {
    setProjects(initialProjects);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const getProjectById = (id) => projects.find(p => p.id === id);

  const getMinistries = () => [...new Set(projects.map(p => p.ministry))];

  const getSectors = () => [...new Set(projects.map(p => p.sector))];

  const value = {
    projects,
    updateProject,
    resetProjects,
    getProjectById,
    getMinistries,
    getSectors
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

export default ProjectsContext;