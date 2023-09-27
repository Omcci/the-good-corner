import Link from "next/link";

import * as styled from "./ArticleCard.styled";
import { BaseLink } from "../Link/BaseLink";
// import  Modal  from "../Modal/Modal";

export default function ArticleCard({
  id,
  title,
  price,
  // convert
  currency,
}: {
  id: number;
  title: string;
  price: number;
  // convert: boolean
  currency: "EURO" | "DOLLAR";
}) {
  return (
    <styled.Container>
      <BaseLink href={`/articles/${id}`}>
        <styled.Image src={`/images/${id}.webp`} />
        <styled.Text>
          <styled.Title>{title}</styled.Title>
          {/* // <styled.Price>{price}{convert ? "$" : "€" }</styled.Price> */}
          <styled.Price>
            {price} {currency === "EURO" ? "€" : "$"}
          </styled.Price>
        </styled.Text>
      </BaseLink>
    </styled.Container>
  );
}
