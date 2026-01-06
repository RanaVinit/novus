import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("./pages/Landing"));
const HomeFeed = lazy(() => import("./pages/HomeFeed"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const CreateArticle = lazy(() => import("./pages/CreateArticle"));

export default function App() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/create-article" element={<CreateArticle />} />
      </Routes>
    </Suspense>
  );
}