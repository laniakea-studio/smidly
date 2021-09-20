import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { fireStore } from "../firebase";

//Set an object field: https://stackoverflow.com/questions/48537427/firestore-insert-object-field
// Update field in obj: https://stackoverflow.com/questions/48046672/update-a-field-in-an-object-in-firestore/48615398

export const getProjects = async () => {
  const query = await getDocs(collection(fireStore, "/projects"));

  let projects = [];

  query.forEach((doc, i) => {
    projects.push({ ...doc.data(), _id: doc.id });
  });

  console.log(projects);
  return projects;
};

export const getModel = async (projectId, modelId) => {
  const docSnap = await getDoc(
    doc(fireStore, `projects/${projectId}/models/${modelId}`)
  );

  try {
    return docSnap.data();
  } catch {
    console.log("Failed to load model");
  }
};

export const getModels = async () => {
  const query = await getDocs(
    collection(fireStore, "/projects/pP1dxqmU9VXrPCMlJpbi/models")
  );

  query.forEach((doc) => {
    console.log("doc.id", doc.data());
  });
};

export const getParentFields = async () => {
  const q = query(
    collection(
      fireStore,
      "/projects/pP1dxqmU9VXrPCMlJpbi/models/AHUOJjABeeKD96ElgfoK/fields"
    ),
    where("has_parent", "==", true)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};
