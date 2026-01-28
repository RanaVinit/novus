import Article from "../models/Article.js";

export const getAllArticles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const skip = parseInt(req.query.skip) || 0;
    const { search, category, shuffle } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    let articles;
    let total;

    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $project: {
          "author.password": 0,
          "author.email": 0,
        },
      },
    ];

    if (shuffle === "true" && !search) {
      pipeline.push({ $sample: { size: limit } });
      articles = await Article.aggregate(pipeline);
      total = await Article.countDocuments(query);
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });
      articles = await Article.aggregate(pipeline);

      // Calculate total count of articles with valid authors for pagination
      const countPipeline = [
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorData",
          },
        },
        { $match: { authorData: { $ne: [] } } },
        { $count: "count" }
      ];
      const countResult = await Article.aggregate(countPipeline);
      total = countResult[0]?.count || 0;
    }

    res.status(200).json({
      articles,
      total,
      hasMore: shuffle === "true" ? (articles.length >= limit) : skip + limit < total,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name"
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.status(200).json(article);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createArticle = async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.user.userId,
    });

    await article.save();

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    article.title = req.body.title ?? article.title;
    article.content = req.body.content ?? article.content;
    article.thumbnail = req.body.thumbnail ?? article.thumbnail;
    article.category = req.body.category ?? article.category;
    article.tags = Array.isArray(req.body.tags) ? req.body.tags : article.tags;

    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const upvoteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    // Initialize if undefined (for old records)
    if (!article.upvotedBy) article.upvotedBy = [];

    if (article.upvotedBy.some((id) => id.toString() === req.user.userId)) {
      return res.status(400).json({ message: "Article already upvoted" });
    }

    article.upvotedBy.push(req.user.userId);
    article.upvotes = (article.upvotes || 0) + 1;

    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const downvoteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    // Initialize if undefined
    if (!article.upvotedBy) article.upvotedBy = [];

    if (!article.upvotedBy.includes(req.user.userId)) {
      return res.status(400).json({ message: "Article not upvoted" });
    }

    article.upvotedBy = article.upvotedBy.filter(
      (id) => id.toString() !== req.user.userId
    );
    article.upvotes = Math.max(0, (article.upvotes || 0) - 1);

    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
