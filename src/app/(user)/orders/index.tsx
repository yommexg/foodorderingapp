import { Text, FlatList } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function OorderScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
}
