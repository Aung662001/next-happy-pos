import {
  Card,
  CardContent,
  Typography,
  Box,
  SvgIconTypeMap,
} from "@mui/material";
import React, { ReactNode } from "react";
interface Prop {
  icon: ReactNode;
  name: string;
  itemCount?: number;
  childName?: string;
}
const ItemCard = ({ icon, name, itemCount, childName }: Prop) => {
  return (
    <Card
      sx={{
        width: 200,
        backgroundColor: "#E7EBF0",
        height: 200,
        marginTop: 9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => null}
    >
      <CardContent>
        {icon}
        <Typography gutterBottom>{name}</Typography>
      </CardContent>
      <CardContent>
        <Typography gutterBottom>
          <span style={{ fontWeight: "bold", display: "inline" }}>
            {itemCount}
          </span>
          {"  "}
          {childName}
        </Typography>
      </CardContent>
      <Typography>Click To Edit</Typography>
    </Card>
  );
};

export default ItemCard;
