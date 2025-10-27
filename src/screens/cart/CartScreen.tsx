import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { products } from "../../data/products";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  return (
    <AppSafeView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              quantity={1}
              onDeletePress={() => {}}
              onIncreasePress={() => {}}
              onDecreasePress={() => {}}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TotalsView itemPrice={120} />
      <AppButton
        title="To Checkout"
        onPress={() => navigation.navigate("CheckoutScreen")}
      />
    </AppSafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
