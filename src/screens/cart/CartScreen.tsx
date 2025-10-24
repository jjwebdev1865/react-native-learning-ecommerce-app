import { StyleSheet } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItem from "../../components/cart/CartItem";

const CartScreen = () => {
  return (
    <AppSafeView>
      <HomeHeader />

      <CartItem />
      {/* <EmptyCart /> */}
    </AppSafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
