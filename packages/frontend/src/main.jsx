// index.jsx
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./store/store.js";
import App from "./App.jsx";
import Loading from "./components/ui/Loading.jsx";
import "./index.css";

const HomePage = lazy(() => import("./pages/home/HomePage.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const EditResume = lazy(() => import("./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx"));
const ViewResume = lazy(() => import("./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx"));
const AuthPage = lazy(() => import("./pages/auth/customAuth/AuthPage.jsx"));

import { useSelector } from "react-redux";
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => {
    const u = state.editUser?.userData;
    return Boolean(u && u !== "");
  });

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/edit-resume/:resume_id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <EditResume />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/view-resume/:resume_id",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <ViewResume />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "auth/sign-in",
        element: (
          <Suspense fallback={<Loading />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md text-center">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">404 — Not Found</h1>
              <p className="text-gray-600 mb-6">The page you requested does not exist.</p>
              <a
                href="/"
                className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Go home
              </a>
            </div>
          </main>
        ),
      },
    ],
  },
]);

// Render
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <React.StrictMode>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// Error page (kept exported)
export function ErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We couldn't load this route. Try refreshing, or head back home.
        </p>

        <a
          href="/"
          className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
