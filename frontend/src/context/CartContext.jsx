import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/cart`, { withCredentials: true });
      setItems(data.items || []);
    } catch (e) { setItems([]); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const requireLogin = () => {
    if (!user) {
      setLoginModalOpen(true);
      return false;
    }
    return true;
  };

  const addItem = async (product) => {
    if (!requireLogin()) return;
    const payload = {
      product_id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    };
    const { data } = await axios.post(`${API}/cart/add`, payload, { withCredentials: true });
    setItems(data.items || []);
    setDrawerOpen(true);
  };

  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return;
    const { data } = await axios.post(`${API}/cart/update`, { product_id: productId, quantity }, { withCredentials: true });
    setItems(data.items || []);
  };

  const removeItem = async (productId) => {
    const { data } = await axios.post(`${API}/cart/remove`, { product_id: productId }, { withCredentials: true });
    setItems(data.items || []);
  };

  const clearCart = async () => {
    const { data } = await axios.post(`${API}/cart/clear`, {}, { withCredentials: true });
    setItems(data.items || []);
  };

  const checkout = async () => {
    const { data } = await axios.post(`${API}/checkout`, {}, { withCredentials: true });
    setItems([]);
    return data;
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const value = {
    items, totalItems, totalPrice, loading,
    drawerOpen, setDrawerOpen,
    loginModalOpen, setLoginModalOpen,
    successOrder, setSuccessOrder,
    addItem, updateQty, removeItem, clearCart, checkout, requireLogin,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
