import { TablesInsert } from "@/src/database.types";
import { supabase } from "@/src/lib/superbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(items: TablesInsert<"order_item">[]) {
      const { data: newOrder, error } = await supabase
        .from("order_item")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return newOrder;
    },

    async onSuccess() {
      await queryClient.invalidateQueries();
    },
  });
};
