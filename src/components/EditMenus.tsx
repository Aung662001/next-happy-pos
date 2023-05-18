import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import EditForm from "./EditForm";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";

export default function EditMenus() {
  // const [editMenus, setEditMenus] = useState("");
  const { id } = useParams();
  const { menus, fetchData } = useContext(AppContext);
  console.log(menus);
  const menu = menus.find((menu) => menu.id?.toString() === id);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  if (!menu) return <h1>Loading...</h1>;
  return (
    <>
      <Layout>
        <EditForm id={menu!.id} name={menu!.name} price={menu!.price} />
      </Layout>
    </>
  );
}
