import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { loginRequest } from "../../configs/authConfig";
import { LayoutProps } from "../../types/types";
import "./layout.scss";
import { InteractionType } from "@azure/msal-browser";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";

const Layout = ({ children }: LayoutProps) => {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">{children}</div>
        </div>
        <Footer />
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Layout;
