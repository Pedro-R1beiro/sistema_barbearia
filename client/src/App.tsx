import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider } from "./components/themeProvider";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
