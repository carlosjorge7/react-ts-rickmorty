import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CharacterProps } from "./models/home-model";
import { Link } from "react-router-dom";

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardMedia sx={{ height: 250 }} image={character.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/character/${character.id}`}>
          <Button size="small">Detalle</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
