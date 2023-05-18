import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Layout from "./Layout";

const AddonCategories = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
        <TextField label="Name" variant="outlined" sx={{ mb: 2 }} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">IsRequired</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Is_Required"
          >
            <MenuItem value={"false"}>False</MenuItem>
            <MenuItem value={"true"}>True</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default AddonCategories;
