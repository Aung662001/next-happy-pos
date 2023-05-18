import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Menu } from "../typings/types";
import { Link, useNavigate } from "react-router-dom";

export default function EditForm({ id, name, price }: Menu) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState({});
  const query = new URLSearchParams(window.location.search);
  let locationId = query.get("locationId");

  async function updateHandle() {
    await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/menus/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });

    navigate(`/menus?locationId=${locationId}`, { replace: true });
  }
  useEffect(() => {
    setMenu({ ...menu, name: name, price: price });
  }, [name, price]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: "300px",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          mt: 3,
        }}
      >
        <TextField
          label="Menu Name"
          variant="outlined"
          type="text"
          defaultValue={name}
          onChange={(event) => setMenu({ ...menu, name: event.target.value })}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="text"
          defaultValue={price}
          onChange={(event) => setMenu({ ...menu, price: event.target.value })}
        />
        <Box gap={3}>
          <Button variant="contained" onClick={updateHandle}>
            Update
          </Button>
          <Link to="../">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
