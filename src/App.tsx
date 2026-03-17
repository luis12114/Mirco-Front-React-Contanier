import React, { Suspense, useState, useEffect } from "react";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Spinner from "./components/atoms/Spinner";

const RemoteApp = React.lazy(() => import("microapp/App"));

function App() {
  const [footerReady, setFooterReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFooterReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header loadingDelay={1200} />

      <main style={{ flex: 1 }}>
        <Suspense fallback={<Spinner />}> 
          <RemoteApp /> 
        </Suspense>
      </main>

      <Footer loading={!footerReady} />
    </>
  );
}

export default App;