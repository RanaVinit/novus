const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMG = "";

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/articles/${id}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });

        if (!res.ok) {
          const message =
            res.status === 401
              ? "Please log in to view this article."
              : `Failed to fetch article (${res.status})`;
          throw new Error(message);
        }

        const data = await res.json();
        const normalized = {
          id: data._id,
          title: data.title,
          content: data.content,
          image: data.thumbnail || "/placeholder.jpg",
          author:
            typeof data.author === "string"
              ? { name: data.author }
              : data.author,
          category: data.category,
          createdAt: data.createdAt,
        };
        setArticle(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    const fetchRelated = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/articles`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        const list = data.articles || data;
        const normalizedList = list.map((a) => ({
          id: a._id,
          title: a.title,
          content: a.content,
          image: a.thumbnail || "/placeholder.jpg",
          author: typeof a.author === "string" ? { name: a.author } : a.author,
          category: a.category,
          createdAt: a.createdAt,
        }));
        setRelated(
          normalizedList.filter((r) => String(r.id) !== String(id)).slice(0, 3)
        );
      } catch (err) {
        console.error("Failed to fetch related articles:", err);
      }
    };

    fetchArticle();
    fetchRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 flex justify-center">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 flex justify-center">
        <h1 className="text-2xl font-semibold">{error}</h1>
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

  const displayDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString()
    : "";

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className="pt-24 pb-20">
      <Navbar isLoggedIn={isLoggedIn} />

      <Helmet>
        <title>{article.title} | Novus</title>
        <meta name="description" content={article.content?.slice(0, 150)} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-96 object-cover rounded-2xl shadow-md mb-10"
        />

        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-sm mb-10">
          {article.author?._id ? (
            <Link to={`/profile/${article.author._id}`} className="hover:opacity-80 transition-opacity">
              <MetaBadge text={article.author?.name} />
            </Link>
          ) : (
            <MetaBadge text={article.author?.name} />
          )}
          {displayDate && <MetaBadge text={displayDate} />}
        </div>

        <article className="text-lg text-gray-800 leading-relaxed space-y-6">
          {article.content}
        </article>

        <div className="max-w-4xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/article/${rel.id}`)}
              >
                <img
                  src={rel.image || "/placeholder.jpg"}
                  alt={rel.title}
                  className="w-full h-32 object-cover rounded-lg mb-3 group-hover:opacity-90 transition"
                />
                <h3 className="font-semibold text-lg group-hover:underline">
                  {rel.title}
                </h3>
                <p className="text-gray-600 text-sm">{rel.author?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
