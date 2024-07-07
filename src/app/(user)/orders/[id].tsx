import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  const order = orders.find((item) => item?.id.toString() === id);

  if (!order) {
    return <Text>Not Found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
