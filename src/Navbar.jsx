import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import "./todo.css";

export default function Navbar() {
  return (
    <>
      <div id="nav">
        <h1 style={{ textAlign: "center", fontSize: "80px" }}>مهامي</h1>
        <hr />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>الكل</Button>
            <Button>منجز</Button>
            <Button>غير منجز</Button>
          </ButtonGroup>
        </Box>
      </div>
    </>
  );
}
