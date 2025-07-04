import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/global";
import { FavoriteProductsProvider } from "./context/FavouritesContext";
import { AppContent } from "./components/AppContent";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProductsProvider>
        <GlobalStyles />
        <AppContent />
      </FavoriteProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
