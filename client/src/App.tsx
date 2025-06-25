import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/themes/ThemeProvider";
import { queryClient } from "./lib/react-query";
import { router } from "./router";

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
