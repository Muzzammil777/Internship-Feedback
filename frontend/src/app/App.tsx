import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "justify-center",
            content: "items-center",
            title: "w-full text-center",
            description: "w-full text-center",
          },
        }}
      />
    </AuthProvider>
  );
}