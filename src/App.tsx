import { Route, Routes } from "react-router-dom";
import { AppProps } from "./types/types";
import Home from "./pages/home/Home";
import Workloads from "./pages/workloads/Workloads";
import Workload from "./pages/workload/Workload";
import Feedbacks from "./pages/feedbacks/Feedbacks";
import Feedback from "./pages/feedback/Feedback";
import { MsalProvider } from "@azure/msal-react";
import Layout from "./components/layout/Layout";
import "./styles/global.scss";

function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <Layout>
        <Pages />
      </Layout>
    </MsalProvider>
  );
}

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workloads" element={<Workloads />} />
      <Route path="/workloads/:id" element={<Workload />} />
      <Route path="/feedbacks" element={<Feedbacks />} />
      <Route path="/feedbacks/:id" element={<Feedback />} />
    </Routes>
  );
};

export default App;
