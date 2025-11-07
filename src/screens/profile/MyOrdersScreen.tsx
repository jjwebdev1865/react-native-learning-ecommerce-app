import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import OrderDetails from "../../components/OrderDetails";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { TOrders, fetchUserOrders } from "../../config/dataServices";

const MyOrdersScreen = () => {
  const useFirebase = false;
  const [ordersList, setOrdersList] = useState<TOrders>();

  const getOrders = async () => {
    const response = (await fetchUserOrders(useFirebase)) as TOrders;
    setOrdersList(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <AppSafeView style={{ paddingHorizontal: sharedPaddingHorizontal }}>
      <FlatList
        data={(ordersList as TOrders).data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderDetails order={item} />}
      />
    </AppSafeView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({});
