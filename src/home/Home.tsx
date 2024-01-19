import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import { Character, Res } from "./models/home-model";
import { Input } from "@mui/material";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data: Res) => {
        console.log(data);
        setCharacters(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCharacters: Character[] = characters.filter(
    (character: Character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const count: number = filteredCharacters.length;
  let heading: string = "";
  if (count > 0) {
    const noun = count > 1 ? "Personajes" : "Personaje";
    heading = count + " " + noun;
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {count > 0 ? <h1>{heading}</h1> : <h1>No hay coincidencias</h1>}
      <div>
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};

export default Home;
