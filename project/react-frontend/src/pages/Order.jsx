import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Order = () => {
  const [books, setBooks] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [order, setOrder] = useState(null);
  const [weight, setWeight] = useState(null);
  const [price, setPrice] = useState(null);
  const [orderStatus, setOrderStatus] = useState("open");

  const { user, cart, setCart, token } = useAppContext();

  const refreshData = async () => {
    const results = await axios.get(
      `http://localhost:5001/getCart?userId=${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrder(results.data.cartItems);
    setWeight(results.data.weight);
    setPrice(results.data.totalPrice);
    console.log("got data2: ", results.data);
  };

  useEffect(() => {
    async function getData() {
      const results = await axios.get(
        `http://localhost:5001/getCart?userId=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(results.data.cartItems);
      setWeight(results.data.weight);
      setPrice(results.data.totalPrice);
      console.log("got data2: ", results.data);
    }
    getData();
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
        setOrderStatus("reserved");
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

  const getButton = () => {
    switch (orderStatus) {
      case "reserved": {
        return (
          <>
            <button
              onClick={handleConfirm}
              class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Vahvista tilaus
            </button>
            <button
              //onClick={}
              class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Peruuta tilaus
            </button>
          </>
        );
      }
      case "completed": {
        return <p>asdasd tilaus done</p>;
      }
      default: {
        if (order == null || order.length === 0) {
          return <p>Lisää ensin kirjoja ostoskoriin</p>;
        }
        return (
          <button
            onClick={handleReserve}
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Tee tilaus
          </button>
        );
      }
    }
  };

  return (
    <>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="w-full max-w-6xl mx-auto grid grid-cols-3 gap-4 p-4">
          <div class="col-span-2 bg-white shadow rounded-lg p-4">
            <h2 class="text-2xl font-bold mb-4">Ostoskori</h2>

            {getCart()}

            <div class="mt-4 text-right">
              <p class="text-xl font-semibold">
                {price != null &&
                  `Yhteenlaskettu hinta postikuluineen: ${price}€`}
              </p>
              <p class="text-xl font-semibold">
                {weight != null && `Paino yhteensä: ${weight}g`}
              </p>
            </div>
          </div>

          <div class="col-span-1 bg-white shadow rounded-lg p-4 flex flex-col justify-center space-y-4">
            {getButton()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
