/* eslint-disable no-unused-vars */
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Welcomepage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const retriveName = localStorage.getItem("name");
    if (retriveName) {
      setName(retriveName);
    }
  }, []);
  const handelNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };
  return (
    <div>
      <Container>
        <Box sx={{ marginTop: "2.5rem" }}>
          <Typography sx={{ fontSize: "3rem" }}>Welcome To</Typography>
          <Typography sx={{ fontSize: "3rem" }}>
            Not so Simple Todo 🫰
          </Typography>
        </Box>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography sx={{ fontSize: "1.5rem" }}>
            Please type your name to continue :
          </Typography>
        </Box>
        <TextField
          onChange={handelNameChange}
          placeholder="Here"
          size="medium"
          inputProps={{
            style: { fontSize: "1.5rem" },
          }}
          sx={{
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
            width: { sm: 200, md: 250 },
            "& .MuiInputBase-root": {
              height: 80,
            },
          }}
        />
        <Box>
          <Link to="/todos">
            <Button
              sx={{ fontSize: "1.5rem", textAlign: "left", color: "black" }}
            >
              Lets Go
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 10,
            left: 50,
            right: 0,
            padding: "10px",
            background: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
          }}
        >
          <a
            href="https://www.linkedin.com/in/animesh-deshmukh/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Typography>Made with Love ❤️ </Typography>
            <Typography>by Animesh 👨‍💻</Typography>
          </a>
        </Box>
      </Container>
    </div>
  );
};

export default Welcomepage;
