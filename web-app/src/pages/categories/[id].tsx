import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { CATEGORIES } from "@/components/Layout/Layout";
import Loader from "@/components/Loader/Loader";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Article } from "@/types";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Category() {
  const params = useParams();
  const id = params?.id as string;

  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchAds = async (categoryId: string) => {
      const response = await fetch(`/api/ads?category=${categoryId}`);
      const { ads } = (await response.json()) as { ads: Article[] };
      setArticles(ads);
    };

    if (id) {
      fetchAds(id);
    }
  }, [id]);

  const category = CATEGORIES.find((category) => category.id === +id);
  if (!category) {
    return "La catégorie sélectionnée n'existe pas.";
  }

  return (
    <PageContainer>
      <h1>{category.name}</h1>
      <CardGrid>
        {articles ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              price={article.price}
            />
          ))
        ) : (
          <Loader global />
        )}
      </CardGrid>
    </PageContainer>
  );
}
