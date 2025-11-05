import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard from "../../components/cards/ProductCard";
import * as mockProducts from "../../data/products";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { getProductData } from "../../config/dataServices";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const useFirebase = false;
  const [products, setProducts] = useState(mockProducts.products);

  useEffect(() => {
    const fetchProducts = async () => {
      if (useFirebase) {
        const data = await getProductData();
        console.log("Fetched products:", data);
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

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
            onPress={() => dispatch(addItemToCart(item))}
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
