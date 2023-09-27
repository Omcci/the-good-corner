import { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckboxLabel";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import Modal from "@/components/Modal/Modal";
import { Article } from "@/types";

// const article = [
//   {id : 1, title : "Table", price : 120, category : "Ameublement", image : "/images/table.webp"},
//   {id : 2, title : "Dame Jeanne", price : 20, category : "Ameublement", image : "/images/dame-jeanne.webp"},
//   {id : 3, title : "Canapé", price : 200, category : "Ameublement", image : "/images/canape.webp"},
//   {id : 4, title : "Chaise", price : 50, category : "Ameublement", image : "/images/chaise.webp"},
//   {id : 5, title : "Lampe", price : 30, category : "Ameublement", image : "/images/lampe.webp"},
//   {id : 6, title : "Bureau", price : 100, category : "Ameublement", image : "/images/bureau.webp"},
// ]

// const DOLLARINEURO = 1.06

// export default function Home() {
//   const [convert, setConvert] = useState(false)

//   const handleConvert = () => {
//     setConvert(!convert)
//   }

//   return (
//     <>
//       <h2>Annonces récentes</h2>
//       <input type="checkbox" onClick={handleConvert} />
const DOLLAR_IN_EURO = 1.06;

const Container = styled.div`
  display: grid;
  gap: 12px;
`;

const MainContentTitle = styled.h2`
  margin: 0 0 4px;
`;

// type Ad = {
//   id: number;
//   title: string;
//   price: number;
//   // Add other properties as needed
// };

export default function Home() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");
  // const [toggleModal, setToggleModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[] | null>(null);

  function toggleCurrency() {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  }

  function toggleModal() {
    return setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch("/api/ads");
      const { ads } = (await response.json()) as { ads: Article[] };
      setArticles(ads);
    };

    fetchAds();
  }, []);

  return (
    <Container >
      <MainContentTitle>Annonces récentes</MainContentTitle>
      <CheckboxLabel>
        <input type="checkbox" onChange={toggleCurrency} />
        Afficher les prix en dollars
      </CheckboxLabel>
      {/* // <PrimaryButton onClick={() => setToggleModal(true)}>Afficher la modale</PrimaryButton>
      // {toggleModal && <Modal setToggleModal={setToggleModal}>Confirmation </Modal>} */}
      <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton>
      <CardGrid>
        {articles
          ? articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                price={
                  currency === "EURO"
                    ? article.price
                    : article.price * DOLLAR_IN_EURO
                }
                currency={currency}
              />
            ))
          : "Chargement des annonces…"}
      </CardGrid>
      {isModalOpen && <Modal onClose={toggleModal}>Contenu de la modale</Modal>}
    </Container>
  );
}
