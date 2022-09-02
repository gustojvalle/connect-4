import { ChakraProvider } from "@chakra-ui/react";
import App from "components/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
      <ChakraProvider>
    <RecoilRoot>
    <App />
    </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);
