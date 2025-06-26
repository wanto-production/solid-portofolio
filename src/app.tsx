import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer"
import "./app.css";
import { Meta, MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Meta name="keywords" content={["portofolio", "portofolio ikhwan satrio", "ikhwan satrio"].join(", ")} />

          <Nav />
          <Suspense>{props.children}</Suspense>
          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
