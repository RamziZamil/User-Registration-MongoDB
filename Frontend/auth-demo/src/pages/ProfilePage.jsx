// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([
    { name: "", price: "", quantity: 1 },
  ]);
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch user profile & orders
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
      setProfile(res.data.user);
      setOrders(res.data.orders);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Failed to fetch profile.",
      }).then(() => {
        // If not authenticated, redirect to login
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  // Add a new product row
  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "", quantity: 1 }]);
  };

  // Update product fields
  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // Create a new order
  const handleCreateOrder = async () => {
    const parsedProducts = products.map((p) => ({
      ...p,
      price: parseFloat(p.price) || 0,
      quantity: parseInt(p.quantity) || 1,
    }));

    try {
      await axios.post(
        "http://localhost:5000/orders",
        { products: parsedProducts },
        { withCredentials: true }
      );
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
      // reset form
      setProducts([{ name: "", price: "", quantity: 1 }]);
      // refresh orders
      fetchProfile();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Failed to create order.",
      });
    }
  };

  if (!profile) {
    return (
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Typography variant="h6">Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(168deg, #6A9C89, #D5E5D5)",
        py: 1,
        overflow: "hidden",
      }}
    >
      {showSuccessAlert && (
        <Box
          sx={{
            mx: "auto",
            maxWidth: 600,
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "#e0f7e6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: 1,
          }}
        >
          <Typography sx={{ color: "#2a7741", fontWeight: 500 }}>
            Order created successfully
          </Typography>
          <IconButton size="small" onClick={() => setShowSuccessAlert(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            textAlign: "center",
            fontWeight: 700,
            color: "#333",
          }}
        >
          User Profile
        </Typography>

        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <Grid container spacing={3}>
            {/* Left Side: Personal Info & New Order */}
            <Grid item xs={12} md={6}>
              {/* Personal Information */}
              <Paper sx={{ p: 2, borderRadius: 2, mb: 2, boxShadow: 1 }}>
                {/* Updated heading style */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#5E33D1",
                  }}
                >
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Username
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {profile.username}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {profile.email || "No email provided"}
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#5E33D1",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#4C29AA" },
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#ff4d4f",
                        color: "#ff4d4f",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#ff7875",
                          color: "#ff7875",
                        },
                      }}
                    >
                      Delete Account
                    </Button>
                  </Box>
                </Box>
              </Paper>

              {/* Create New Order */}
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
                {/* Updated heading style */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#5E33D1",
                  }}
                >
                  Create New Order
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ backgroundColor: "#f9f9f9", p: 2, borderRadius: 1 }}>
                  {products.map((product, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <TextField
                        label="Product Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., Wireless Headphones"
                        sx={{ mb: 1 }}
                      />
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <TextField
                            label="Price ($)"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={product.price}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={product.quantity}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={handleAddProduct}
                    sx={{
                      mb: 2,
                      width: "100%",
                      textTransform: "none",
                      borderColor: "#e0e0e0",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#d0d0d0",
                      },
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add Another Product
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateOrder}
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1,
                    backgroundColor: "#5E33D1",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#4C29AA" },
                  }}
                >
                  Create Order
                </Button>
              </Paper>
            </Grid>

            {/* Right Side: Orders */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
              >
                {/* Updated heading style */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#5E33D1",
                  }}
                >
                  Your Orders
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
                  {orders && orders.length > 0 ? (
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      {orders.map((order) => (
                        <Paper
                          key={order._id}
                          sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}
                        >
                          {order._id && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: "block", mb: 1 }}
                            >
                              Order ID: {order._id}
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body1">Status</Typography>
                            <Chip
                              label={order.status || "pending"}
                              size="small"
                              sx={{
                                backgroundColor: "#fff9db",
                                color: "#856404",
                                fontWeight: 500,
                                borderRadius: 1,
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body1">Total</Typography>
                            <Typography variant="h6" fontWeight="500">
                              ${order.total?.toFixed(2) || "0.00"}
                            </Typography>
                          </Box>

                          <Typography variant="body1" sx={{ mb: 1 }}>
                            Products
                          </Typography>
                          <List disablePadding>
                            {order.products?.map((prod, idx) => (
                              <ListItem
                                key={idx}
                                disablePadding
                                sx={{
                                  py: 0.5,
                                  px: 0,
                                  borderBottom:
                                    idx < order.products.length - 1
                                      ? "1px solid #f5f5f5"
                                      : "none",
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {prod.name} × {prod.quantity}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        fontWeight="medium"
                                      >
                                        $
                                        {(prod.price * prod.quantity).toFixed(
                                          2
                                        )}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      ))}
                    </Stack>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 3 }}>
                      <Typography color="text.secondary">
                        No orders found.
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.disabled"
                        sx={{ mt: 1 }}
                      >
                        Create your first order using the form.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
