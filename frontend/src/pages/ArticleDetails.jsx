import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { MetaBadge } from "../components/CategoryTag";

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // to navigate to related blogs
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const article = useMemo(
    () => articles.find((b) => String(b.id) === String(id)),
    [id]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 flex justify-center">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-24 flex justify-center">
        <h1 className="text-2xl font-semibold">Article Not Found</h1>
      </div>
    );
  }

  const displayDate = new Date(article.date).toLocaleDateString();

  return (
    <div className="pt-24 pb-20">
      <Navbar isLoggedIn={true} />

      <Helmet>
        <title>{article.title} | Novus</title>
        <meta name="description" content={article.description?.slice(0, 150)} />
      </Helmet>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Cover Image */}
        <img
          src={imgSrc || article.image}
          onError={() => setImgSrc("/placeholder.jpg")}
          alt={article.title}
          loading="lazy"
          className="w-full h-96 object-cover rounded-2xl shadow-md mb-10"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm mb-10">
          <MetaBadge text={article.author} />
          <MetaBadge text={displayDate} />
        </div>

        {/* Article Content */}
        <article className="text-lg text-gray-800 leading-relaxed space-y-6">
          {article.content}
        </article>

        {/* Related Articles */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs
              .filter((b) => b.id !== article.id) // exclude current article
              .slice(0, 3) // show any 3 related ones
              .map((related) => (
                <div
                  key={related.id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/article/${related.id}`)}
                >
                  <img
                    src={related.image || "/placeholder.jpg"}
                    alt={related.title}
                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:opacity-90 transition"
                  />
                  <h3 className="font-semibold text-lg group-hover:underline">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{related.author}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}