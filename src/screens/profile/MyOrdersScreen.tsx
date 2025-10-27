import { FlatList, StyleSheet } from "react-native";
import React from "react";
import OrderDetails from "../../components/OrderDetails";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";

export type OrderDetail = {
  id: number;
  totalPrice: number;
  completedDate: Date;
};

const dummyData: OrderDetail[] = [
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
];

const MyOrdersScreen = () => {
  return (
    <AppSafeView style={{ paddingHorizontal: sharedPaddingHorizontal }}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderDetails order={item} />}
      />
    </AppSafeView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({});
