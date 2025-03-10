import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Swal from "sweetalert2";

function App() {
  // Separate states for registration and login
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [profile, setProfile] = useState(null);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        { username: regUsername, password: regPassword },
        { withCredentials: true }
      );
      Swal.fire({
        title: "Registration Successful",
        text: res.data.message,
        icon: "success",
      });
      // Clear registration fields after success
      setRegUsername("");
      setRegPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "An error occurred.",
        icon: "error",
      });
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { username: loginUsername, password: loginPassword },
        { withCredentials: true }
      );
      // Assuming your backend returns a token as res.data.token
      Swal.fire({
        title: "Login Successful",
        text: `Token: ${res.data.token}`,
        icon: "success",
      });
      // Clear login fields after success
      setLoginUsername("");
      setLoginPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "An error occurred.",
        icon: "error",
      });
    }
  };

  // Fetch protected profile data
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setProfile(res.data.user);
      Swal.fire({
        title: "Profile Fetched",
        text: "Profile data loaded successfully!",
        icon: "success",
      });
    } catch (error) {
      setProfile(null);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "An error occurred.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    // Optionally, fetch profile on mount if needed
    // fetchProfile();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Authentication Demo
      </Typography>

      {/* Registration Form */}
      <Box component="form" onSubmit={handleRegister} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>

      {/* Login Form */}
      <Box component="form" onSubmit={handleLogin} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <Button variant="contained" color="secondary" type="submit">
          Login
        </Button>
      </Box>

      {/* Profile Section */}
      <Button variant="outlined" onClick={fetchProfile} sx={{ mb: 2 }}>
        Get Profile
      </Button>

      {/* Show Profile if available */}
      {profile && (
        <Card>
          <CardContent>
            <Typography variant="h6">Profile</Typography>
            <Typography>ID: {profile._id}</Typography>
            <Typography>Username: {profile.username}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
