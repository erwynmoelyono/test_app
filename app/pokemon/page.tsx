import Header from "@/app/components/Header";
import PokemonData from "../components/PokemonData";

export default function NewProduct() {
  return (
    <>
      <Header></Header>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Pokemon
      </h5>
      <PokemonData></PokemonData>
    </>
  );
}
