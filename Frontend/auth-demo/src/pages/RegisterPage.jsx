// frontend/src/pages/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // new email field
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/register",
        { username, email, password },
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in.",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Registration failed.",
      });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter your details to register
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.2 }}
          >
            Register
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
