import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {VariaProvider} from "./contexts/VariaContext.jsx";
import {ConfiguratorProvider} from "./contexts/ConfiguratorContext.jsx";
import {ContactProvider} from "./contexts/ContactContext.jsx";
import {RoomWallLightupProvider} from './contexts/RoomWallLightupContext.jsx';
import {DrawingProvider} from "./contexts/2dContext.tsx";
import "./i18n.ts";
import { ModuleProvider } from "./contexts/ModuleContext.jsx";
import { IntersectionProvider } from "./contexts/IntersectionContext.jsx";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <VariaProvider>
          <ContactProvider>
            <ConfiguratorProvider>
              <IntersectionProvider>
                <RoomWallLightupProvider>
                  <DrawingProvider>
                    <ModuleProvider>
                      <Routing/>
                    </ModuleProvider>
                  </DrawingProvider>
                </RoomWallLightupProvider>
              </IntersectionProvider>
            </ConfiguratorProvider>
          </ContactProvider>
        </VariaProvider>
      </BrowserRouter>
);
