import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, Component } from "react";

import { MAINTENANCE_MODE } from "../../config/constants";
import Header from "../Header/Header";
import Main from "../Pages/Main/Main";
import Maintenance from "../Pages/Maintenance/Maintenance";
import NotFound from "../Pages/NotFound/NotFound";
import Particles from "../Particles/Particles";
import LoadingState from "../LoadingState/LoadingState";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import { MusicProvider } from "../../contexts/MusicContext";

import "./App.css";

// Lazy load the Music page since it's not immediately needed
const Music = lazy(() => import("../Pages/Music/Music"));

// Loading component for lazy-loaded routes
const RouteLoader = () => (
  <div className="app__route-loader">
    <LoadingState type="default" message="Loading..." />
  </div>
);

// Error boundary for lazy-loaded components
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Route error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app__route-error">
          <ErrorDisplay
            error={this.state.error}
            onRetry={() => this.setState({ hasError: false, error: null })}
            type="component"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const appContent = (
    <BrowserRouter>
      <div className="app">
        <Particles />
        <Header />
        <main className="app__content">
          {MAINTENANCE_MODE ? (
            <Maintenance />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </main>
      </div>
    </BrowserRouter>
  );

  return MAINTENANCE_MODE ? appContent : <MusicProvider>{appContent}</MusicProvider>;
}

export default App;
