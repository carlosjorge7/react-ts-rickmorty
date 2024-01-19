import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import { Character, Res } from "./models/home-model";
import { Input, Grid, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
    </>
  );
};

export default Home;
