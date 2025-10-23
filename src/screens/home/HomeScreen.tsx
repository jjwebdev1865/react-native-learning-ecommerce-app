import { FlatList, StyleSheet } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard from "../../components/cards/ProductCard";
import { products } from "../../data/products";
import { scale, verticalScale } from "react-native-size-matters";

const HomeScreen = () => {
  return (
    <AppSafeView>
      <HomeHeader />

      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price.toString()}
            imageUrl={item.imageURL}
            onPress={() => console.log("pressed", item.title)}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: verticalScale(10),
        }}
        contentContainerStyle={{ paddingHorizontal: scale(10) }}
      />
    </AppSafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
