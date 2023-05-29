import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import Layout from "./Layout";
import { useState, useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { config } from "@/config/config";
import { AddonCategory } from "@/typings/types";
import { prisma } from "@/utils/db";
interface row {
  id: number;
  name: string;
  price: number;
  IsAvaiable: string;
  AddonCategorie: AddonCategory[];
}
const Addons = () => {
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState<number>();
  const [check, setCheck] = useState<boolean | string>(false);
  let defaultAddon = {
    name: "",
    price: 0,
    is_avaiable: check,
    addonCategories: "",
  };
  const [addonData, setAddonData] = useState(defaultAddon);
  const {
    addonCategories: ACdatas,
    addons,
    fetchData,
  } = useContext(AppContext);
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
      (data) => data.id!.toString() == addon.addon_categories_id
    );
    const is_avaiable = addon.is_avaiable.toString().toUpperCase();
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
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginY: "2rem",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "2px solid lightgray",
          paddingBottom: "2rem",
        }}
      >
        <TextField
          label="New Addon"
          variant="outlined"
          autoComplete="off"
          sx={{ mx: 3, width: "300px" }}
          value={addonData.name}
          onChange={(event) =>
            setAddonData({ ...addonData, name: event.target.value })
          }
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mx: 3, width: "300px" }}
          value={addonData.price ? addonData.price : ""}
          onChange={(e) =>
            setAddonData({ ...addonData, price: parseInt(e.target.value) })
          }
        />

        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">
            AddOn Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={addonData.addonCategories}
            label="Age"
            onChange={(e) =>
              setAddonData({
                ...addonData,
                addonCategories: e.target.value as string,
              })
            }
          >
            {ACdatas.map((addOnCat) => {
              return (
                <MenuItem value={addOnCat.id} key={addOnCat.id}>
                  {addOnCat.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={check as boolean}
              onClick={() => {
                setAddonData({ ...addonData, is_avaiable: !check });
                setCheck((prev) => !prev);
              }}
            />
          }
          label="IsAvaiable"
        />
        <Box>
          <Button
            variant="contained"
            onClick={() => (update ? updateHandler() : createNewAddon())}
            sx={{ margin: "2rem" }}
          >
            {update ? "Update" : "Submit"}
          </Button>
          {update ? <Button variant="outlined">Cancel</Button> : ""}
        </Box>
      </Box>
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
    const response = await fetch(`${config.apiUrl}/addons/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchData();
      alert("Deleted");
    }
  }
  async function updateHandler() {
    setUpdate(false);
    const response = await fetch(`${config.apiUrl}/addons/${updateId}`, {
      method: "PUT",
      body: JSON.stringify(addonData),
    });
    if (response.ok) {
      fetchData();
      alert("Updated Addon success!");
      setAddonData(defaultAddon);
    }
  }
  function editHandler(row: row) {
    window.scrollTo(0, 0);
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
    const response = await fetch(`${config.apiUrl}/addons`, {
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
