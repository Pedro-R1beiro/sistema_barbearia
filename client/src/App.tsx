import { RouterProvider } from "react-router";

import { ThemeProvider } from "./components/themes/ThemeProvider";
import { ArchivedAppointmentsProvider } from "./contexts/ArchivedAppointmentContext/ArchivedAppointmentsProvider";
import { queryClient } from "./lib/react-query";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <ArchivedAppointmentsProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ArchivedAppointmentsProvider>
    </QueryClientProvider>
  );
}
