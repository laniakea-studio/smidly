import React, { useContext, useEffect, useState } from "react";
import { fireStore } from "../firebase";
import { collection, getDocs, doc, getDoc, query } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const ProjectContext = React.createContext();

export function useProject() {
  return useContext(ProjectContext);
}

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Ge the project id from router :id param or something....
  const location = useLocation();
  const path = location.pathname;
  let projectId = null;

  if (path.substring(0, 9) === "/project/") {
    projectId = path.substring(9, 29);
  }

  const getProject = async () => {
    const docRef = doc(fireStore, `projects/${projectId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCurrentProject(docSnap.data());
      setCurrentProjectId(docSnap.id);
    } else {
      console.log("No such document!");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (projectId === null) return;
    getProject();
  }, []);

  const value = {
    currentProjectId,
    currentProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {!loading && children}
    </ProjectContext.Provider>
  );
};
