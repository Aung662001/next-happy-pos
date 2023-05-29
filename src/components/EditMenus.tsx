import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import EditForm from "./EditForm";
import { BackofficeContext } from "../contexts/BackofficeContext";
// import { useParams } from "react-router-dom";

export default function EditMenus() {
  // const { id } = useParams();
  // const { menus, fetchData } = useContext(BackofficeContext);
  // console.log(menus);
  // const menu = menus.find((menu) => menu.id?.toString() === id);
  // if (!menu) return <h1>Loading...</h1>;
  // return (
  //   <>
  //     <Layout>
  //       <EditForm id={menu!.id} name={menu!.name} price={menu!.price} />
  //     </Layout>
  //   </>
  // );
  return <h2>menu detail Page</h2>;
}
