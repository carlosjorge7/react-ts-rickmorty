import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import { Character } from "./models/home-model";
import { Input, Grid, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    setCharacters(data.results);
  };

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

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleOpenDialog}>Filtrar</Button>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <span>Alive</span>
          <Checkbox></Checkbox> <br />
          <span>Dead</span>
          <Checkbox></Checkbox> <br />
          <span>Unknown</span>
          <Checkbox></Checkbox> <br />
          {/* Aquí puedes colocar tus opciones de filtros */}
          {/* Por ejemplo, podrías agregar más Input, Checkbox, etc. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
          <Button onClick={handleCloseDialog}>Aplicar Filtros</Button>
        </DialogActions>
      </Dialog>

      {count > 0 ? <h1>{heading}</h1> : <h1>No hay coincidencias</h1>}
      <div>
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Button onClick={handlePreviousPage}>Anterior</Button>
      <span>{page}</span>
      <Button onClick={handleNextPage}>Siguiente</Button>
    </>
  );
};

export default Home;
