import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("./pages/Landing"));
const HomeFeed = lazy(() => import("./pages/HomeFeed"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));

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
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </Suspense>
  );
}