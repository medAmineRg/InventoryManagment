import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: { backgroundColor: "#000", color: "#fff" },
        }}>
        <Stack.Screen name="signin/index" />
        <Stack.Screen name="signup/index" />
        <Stack.Screen name="session/index" />
        <Stack.Screen name="updatestock/index" />
      </Stack>
    </QueryClientProvider>
  );
}
