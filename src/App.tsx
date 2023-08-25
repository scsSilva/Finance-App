import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import Home from "./pages/Home";
import TransactionsProvider from "./contexts/TransactionsContext";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Home />
      </TransactionsProvider>
    </ThemeProvider>
  );
};

export default App;
