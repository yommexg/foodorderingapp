import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "../lib/notification";
import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "../lib/superbase";
import { useAuth } from "./AuthProvider";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  const { profile } = useAuth();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);

    //update the token in database
    if (newToken) {
      await supabase
        .from("profiles")
        .update({ expo_push_token: newToken })
        .eq("id", profile.id);
    }
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log("Push Token", expoPushToken);
  console.log(notification);

  return <>{children}</>;
};

export default NotificationProvider;
