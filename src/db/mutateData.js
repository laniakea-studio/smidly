import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { fireStore } from "../firebase";

//Set an object field: https://stackoverflow.com/questions/48537427/firestore-insert-object-field
// Update field in obj: https://stackoverflow.com/questions/48046672/update-a-field-in-an-object-in-firestore/48615398

export const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(fireStore, "projects"), projectData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.data();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// TODO: Remove also subcollections with server side code: https://stackoverflow.com/questions/49286764/delete-a-document-with-all-subcollections-and-nested-subcollections-in-firestore
export const removeProject = async (projectId) => {
  try {
    const docRef = await deleteDoc(doc(fireStore, "projects", projectId));
    console.log("Project removed: ", docRef.id);
  } catch (e) {
    console.error("Failed to remove project: ", e);
    console.error("Failed to remove project with ID: ", projectId);
  }
};

export const addModel = async (projectId, modelData, modelDataToProject) => {
  const collectionRef = doc(
    fireStore,
    `projects/${projectId}/models/`,
    modelData.uid
  );

  try {
    const docRef = await setDoc(collectionRef, modelData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document to model collection: ", e);
  }

  const projectRef = doc(fireStore, "projects", projectId);

  try {
    const projectModelsRef = await updateDoc(projectRef, {
      models: arrayUnion(modelDataToProject),
    });
    console.log("Document written with ID: ", projectModelsRef.id);
    return projectModelsRef.data();
  } catch (e) {
    console.error("Error adding model to project's model array: ", e);
  }
};

// TODO: Remove Model Info also from project object
export const removeModel = async (projectId, modelId, modeObjToRemove) => {
  console.log(projectId, modelId);
  try {
    const docRef = await deleteDoc(
      doc(fireStore, `projects/${projectId}/models/`, modelId)
    );
    console.log("Model removed: ", docRef.id);
  } catch (e) {
    console.error("Failed to remove model: ", e);
    console.error("Failed to remove model with ID: ", projectId);
  }

  // Remove model info from project object
  const projectRef = doc(fireStore, "projects", projectId);

  try {
    const projectModelsRef = await updateDoc(projectRef, {
      models: arrayRemove(modeObjToRemove),
    });
    console.log("Model info removed from project: ", projectModelsRef.id);
  } catch (e) {
    console.error("Error adding model to project's model array: ", e);
  }
};

// TODO: Return new values to front
export const updateModelFields = async (projectId, modelId, fieldsData) => {
  try {
    const docRef = doc(fireStore, `projects/${projectId}/models/`, modelId);

    await updateDoc(docRef, {
      fields: fieldsData,
    });
    return "success";
  } catch (e) {
    console.log("Failed to update fields.", e);
  }
};
