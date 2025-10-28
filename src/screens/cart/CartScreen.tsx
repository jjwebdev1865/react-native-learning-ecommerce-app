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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";

const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((state: RootState) => state.cartSlice);

  const dispatch = useDispatch();

  const totalProductsPriceSum = items.reduce(
    (acc, item) => acc + item.price,
    0
  );
  return (
    <AppSafeView>
      <HomeHeader />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const { title, price, imageURL, quantity } = item;
              return (
                <CartItem
                  title={title}
                  price={price}
                  imageURL={imageURL}
                  quantity={quantity}
                  onDeletePress={() => dispatch(removeProductFromCart(item))}
                  onIncreasePress={() => dispatch(addItemToCart(item))}
                  onDecreasePress={() => dispatch(removeItemFromCart(item))}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <TotalsView itemPrice={totalProductsPriceSum} />
          <AppButton
            title="To Checkout"
            onPress={() => navigation.navigate("CheckoutScreen")}
          />
        </View>
      )}
    </AppSafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
