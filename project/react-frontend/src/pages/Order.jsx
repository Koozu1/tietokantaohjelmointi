import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [weight, setWeight] = useState(null);
  const [price, setPrice] = useState(null);
  const [shippingCosts, setShippingCosts] = useState(null);
  const [orderStatus, setOrderStatus] = useState("open");

  const { user, token } = useAppContext();

  const refreshData = async () => {
    const results = await axios.get(
      `http://localhost:5001/getCart?userId=${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Data is", results.data);
    setOrder(results.data.cartItems);
    setWeight(results.data.weight);
    setPrice(results.data.itemPrice);
    setShippingCosts(
      results.data.cartItems.length === 0 ? null : results.data.shippingCost
    );
    setOrderStatus(results.data.orderStatus);
  };

  useEffect(() => {
    refreshData();
  }, [token, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const getCart = (ids) => {
    if (order === null) {
      return <>Ei vielä mitään</>;
    }
    return order.map(({ id, price, status, title, author }) => {
      return (
        <div class="flex items-center justify-between border-b py-3">
          <div>
            <p class="text-lg font-medium">{title}</p>
            <p class="text-gray-500">{author}</p>
          </div>
          <p class="text-lg font-bold">{price}€</p>
        </div>
      );
    });
  };

  const handleReserve = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/order/reserve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setOrderStatus("varattu");
        console.log("GOT SUCCESS!");
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert(
          "Poistettiin osa tuotteista ostoskorista sillä ne eivät olleet enää saatavilla"
        );
        refreshData();
      }
      console.error("Error fetching books:", error);
      return null;
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/order/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setOrderStatus("completed");
        console.log("Order completed");
      }
    } catch (error) {}
  };

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/order/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setOrderStatus("cancelled");
        console.log("GOT SUCCESS!");
      }
      refreshData();
    } catch (error) {
      console.error("Error fetching books:", error);
      return null;
    }
  };

  const getButton = () => {
    console.log("ORDER STATUS IS", orderStatus);
    switch (orderStatus) {
      case "varattu": {
        return (
          <>
            <button
              onClick={handleConfirm}
              class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Vahvista tilaus
            </button>
            <button
              onClick={handleCancel}
              class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Peruuta tilaus
            </button>
          </>
        );
      }
      case "completed": {
        return (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow-md text-center">
            Tilaus vahvistettu!
          </div>
        );
      }
      case "cancelled": {
        return (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow-md text-center">
            Tilaus peruttu
          </div>
        );
      }
      default: {
        if (order == null || order.length === 0) {
          return <p>Lisää ensin kirjoja ostoskoriin</p>;
        }
        return (
          <button
            onClick={handleReserve}
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            Tee tilaus
          </button>
        );
      }
    }
  };

  return (
    <div class="bg-white min-h-screen flex items-start justify-cente p-4 space-y-4">
      <div class="max-w-[800px] w-full mx-auto p-4 space-y-4 bg-[#f9f9f9] shadow-md rounded-lg">
        <div class="bg-white shadow rounded-lg p-4 bg-[#f9f9f9]">
          <h2 class="text-2xl font-bold mb-4">Ostoskori</h2>

          {getCart()}
          <div class="mt-4 text-right space-y-2">
            {price != null && (
              <p class="text-lg font-medium">
                Hinta: <span class="font-semibold">{price.toFixed(2)}€</span>
              </p>
            )}
            {shippingCosts != null && (
              <p class="text-lg font-medium">Postikulut: {shippingCosts.toFixed(2)}€</p>
            )}
            {price != null && shippingCosts != null && (
              <p class="text-xl font-semibold border-t pt-2">
                Yhteensä: {(price + shippingCosts).toFixed(2)}€
              </p>
            )}
            {weight != null && (
              <p class="text-lg font-medium text-gray-700">
                Tilauksen paino: {weight}g
              </p>
            )}
          </div>
          <div class="col-span-1 rounded-lg p-4 flex flex-col justify-center space-y-4">
            {getButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
