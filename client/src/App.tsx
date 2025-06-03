import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider } from "./components/themes/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
