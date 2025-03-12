// frontend/src/pages/LoginPage.jsx
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/login",
        { username, password },
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      }).then(() => {
        navigate("/profile");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Login failed.",
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter your credentials to access your account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
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
            color="secondary"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.2 }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
