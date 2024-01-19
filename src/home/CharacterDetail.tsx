import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Character } from "./models/home-model";
import { Button } from "@mui/material";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<string>();
  const [character, setCharacter] = useState<Character>({
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: { name: "", url: "" },
    location: { name: "", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  });

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((character: Character) => {
        console.log(character);
        setCharacter(character);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const episodes: number = character.episode.length;

  return (
    <div>
      <Link to="/">
        <Button variant="text">Volver</Button>
      </Link>
      <h2>Detalles del Personaje {id}</h2>
      <img src={character.image} /> <br />
      <span>{character.name}</span> <br />
      <span>{character.status}</span> <br />
      <span>Numero de episodios : {episodes}</span>
    </div>
  );
};

export default CharacterDetail;
