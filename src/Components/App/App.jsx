import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, Component } from "react";

import Header from "../Header/Header";
import Main from "../Pages/Main/Main";
import NotFound from "../Pages/NotFound/NotFound";
import Particles from "../Particles/Particles";
import LoadingState from "../LoadingState/LoadingState";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

import "./App.css";

// Lazy load the Music page since it's not immediately needed
const Music = lazy(() => import("../Pages/Music/Music"));

// Loading component for lazy-loaded routes
const RouteLoader = () => (
  <div className="route-loader">
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
        <div className="route-error">
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
  return (
    <BrowserRouter>
      <div className="app">
        <Particles />
        <Header />
        <main className="app__content">
          <ErrorBoundary>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/music" element={<Music />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
