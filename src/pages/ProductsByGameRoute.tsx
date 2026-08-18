import { useParams } from "react-router-dom";
import { gameMap } from "../data/products";
import ProductsByGame from "./ProductsByGame";
import NotFound from "./NotFound";

export default function ProductsByGameRoute() {
  const { gameSlug } = useParams();

  if (!gameSlug || !gameMap[gameSlug]) {
    return <NotFound />;
  }

  return <ProductsByGame gameSlug={gameSlug} />;
}
