import { supabase } from "@/src/lib/superbase";
import { View, Text, Button } from "react-native";

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>

      <Button
        title="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;

// mqIzet73GpNpxZ83

//qaesamqdgxoafccklqmx
//17204
