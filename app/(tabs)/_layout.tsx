import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Modal, Text, View } from "react-native";

import CustomDrawerContent from "@/components/CustomDrawerContent";
import Header from "@/components/Header";


const GradientHeader = () => (
  <LinearGradient
    colors={[colors.blue, colors.green, colors.yellow]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        initialRouteName="home/index"
        screenOptions={{
          headerBackground: () => <GradientHeader />,
          headerTitleStyle: {
            color: 'white'
          },      
          headerTintColor: 'white',
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            // header: () => <Header/>,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="products/index"
          options={{
            drawerLabel: "Produtos",
            title: "Produtos",
            header: () => <Header title="Produtos" />,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="units/index"
          options={{
            drawerLabel: "Unidades",
            title: "Unidades",
            headerBackground: () => <GradientHeader />,
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="groups/index"
          options={{
            drawerLabel: "Grupos",
            title: "Grupos",
            headerBackground: () => <GradientHeader />,
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="layer-group" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  HeaderStyles: {
    color: "white",
  },
});
