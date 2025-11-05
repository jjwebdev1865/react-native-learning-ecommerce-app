import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// TODO: Network error. confirm that this on non slalom laptop
export const getProductData = async () => {
  try {
    // TODO: in video, set the rules in firebase to true from false. THIS IS BAD.
    // Need to make sure user is authenticated first. this is possible
    const querySnapshot = await getDocs(collection(db, "products"));
    const list: any[] = [];

    querySnapshot.forEach((doc) => {
      list.push(doc.data);
    });
    return list
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
