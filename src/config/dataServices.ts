import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { store } from "../store/store";

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

export type OrderDetail = {
  id: number;
  totalPrice: number;
  completedDate: Date;
};


export type TOrders = {
  id: string;
  data: OrderDetail[];
}

const dummyData: TOrders = {
  id: 'docID-1',
  data: [
  {
    id: 1,
    totalPrice: 150,
    completedDate: new Date(),
  },
  {
    id: 2,
    totalPrice: 90,
    completedDate: new Date(),
  },
  {
    id: 3,
    totalPrice: 250,
    completedDate: new Date(),
  },
]};

export const fetchUserOrders = async (useFirbase: boolean) => {
  let userId = ''
  try {
    const userIdFromRedux = store.getState().userSlice.userData.uid;
    if (useFirbase) {
      const userIdFromFirebase = auth.currentUser?.uid;
      userId = userIdFromFirebase as string;

      const userOrdersRef = collection(doc(db, "users", userIdFromRedux), "orders");
      const querySnapshot = await getDocs(userOrdersRef);

      const orderList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return orderList;
    } else {
      // Mock data for testing without Firebase
      return dummyData;
    }



  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}
