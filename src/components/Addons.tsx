import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import Layout from "./Layout";
import { useState, useContext } from "react";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { config } from "@/config/config";
import { addon_categories as AddonCategory } from "@prisma/client";
import EditAddon from "./editAddon/EditAddon";
interface row {
  id: number;
  name: string;
  price: number;
  IsAvaiable: string;
  AddonCategorie: AddonCategory[];
}
const Addons = () => {
  const {
    addonCategories: ACdatas,
    addons,
    fetchData,
  } = useContext(BackofficeContext);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState<number>();
  const [check, setCheck] = useState<boolean | string>(false);
  const defaultAddon = {
    name: "",
    price: 0,
    is_avaiable: check,
    addonCategories: "",
  };
  const [addonData, setAddonData] = useState(defaultAddon);

  //table related setting
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  function createData(
    id: number,
    name: string,
    price: number,
    IsAvaiable: string,
    AddonCategorie: AddonCategory[]
  ) {
    return { name, price, IsAvaiable, AddonCategorie, id };
  }
  const rows: row[] = [];
  addons.map((addon) => {
    const AddonCategorie = ACdatas.filter(
      (data) => data.id! == addon.addon_categories_id
    );
    const is_avaiable = addon.is_avaiable!.toString().toUpperCase();
    if (!addon.id) return;
    const data = createData(
      addon.id,
      addon.name,
      addon.price,
      is_avaiable,
      AddonCategorie
    );
    rows.push(data);
  });
  //end table setting
  return (
    <Layout title="Addons">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", right: 0 }}
      >
        Add New Addon +
      </Button>
      <EditAddon
        addonData={addonData}
        setAddonData={setAddonData}
        check={check}
        setCheck={setCheck}
        update={update}
        setUpdate={setUpdate}
        updateHandler={updateHandler}
        createNewAddon={createNewAddon}
        open={open}
        setOpen={setOpen}
      />

      <Box>
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 700, margin: "0 auto" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">IsAvaiable</StyledTableCell>
                <StyledTableCell align="right">AddonCategorie</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.IsAvaiable}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.AddonCategorie.map((a) => a.name)}
                  </StyledTableCell>
                  <StyledTableCell sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => editHandler(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteHandler(row.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
  async function deleteHandler(id: number) {
    const response = await fetch(`${config.backofficeUrl}/addons/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchData();
      alert("Deleted");
    }
  }
  async function updateHandler() {
    setUpdate(false);
    const response = await fetch(`${config.backofficeUrl}/addons/${updateId}`, {
      method: "PUT",
      body: JSON.stringify(addonData),
    });
    if (response.ok) {
      fetchData();
      alert("Updated Addon success!");
      setAddonData(defaultAddon);
      setUpdate(false);
    }
  }
  function editHandler(row: row) {
    setOpen(true);
    setUpdate(true);
    setUpdateId(row.id);
    setCheck(row.IsAvaiable === "TRUE" ? true : false);
    setAddonData({
      ...addonData,
      name: row.name,
      price: row.price,
      addonCategories: row.AddonCategorie[0].id?.toString() as string,
    });
  }
  async function createNewAddon() {
    const response = await fetch(`${config.backofficeUrl}/addons`, {
      method: "POST",
      body: JSON.stringify(addonData),
    });
    if (response.ok) {
      fetchData();
      alert("created Addon success!");
      setAddonData(defaultAddon);
    }
  }
};

export default Addons;
