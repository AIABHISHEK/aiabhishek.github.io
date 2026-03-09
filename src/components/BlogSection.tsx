import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, MessageCircle, Clock } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
}

const DEVTO_USERNAME = "aiabhishek";

const BlogSection = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=6`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader command="cat ~/blog/*.md" title="Blog Posts" />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-terminal animate-pulse h-64" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-primary">&gt;</span> No articles found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-terminal group flex flex-col"
              >
                {article.cover_image && (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="rounded-md mb-4 w-full h-36 object-cover"
                    loading="lazy"
                  />
                )}

                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tag_list.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mt-auto">
                  <span className="flex items-center gap-1">
                    <Heart size={12} /> {article.public_reactions_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {article.comments_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.reading_time_minutes}m
                  </span>
                  <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={`https://dev.to/${DEVTO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
          >
            <span>&gt; view all posts on dev.to</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
