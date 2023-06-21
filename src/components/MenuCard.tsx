import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { menus as Menu } from "@prisma/client";
interface Props {
  callback: (data: Menu) => void;
  data: Menu;
}
const MenuCard = ({ callback, data }: Props) => {
  return (
    <Box>
      <Card
        sx={{
          width: 300,
          backgroundColor: "#E7EBF0",
          height: 300,
          marginTop: 3,
        }}
        onClick={() => callback(data)}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="194"
            image={data.asseturl ? data.asseturl : ""}
            alt="Paella dish"
          />
          <Typography gutterBottom variant="h5">
            {data.name}
            <span style={{ color: "red" }}>{data.price}</span>
            <span style={{ fontSize: "18px" }}>Ks</span>
          </Typography>
          <Typography>{data.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MenuCard;
