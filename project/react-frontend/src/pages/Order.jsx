import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Order = () => {
  const [books, setBooks] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [order, setOrder] = useState(null);

  const { user, cart, setCart, token } = useAppContext();

  useEffect(() => {
    async function getData() {
      const results = await axios.get(
        `http://localhost:5001/getCart?userId=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(results.data);
      console.log("got data: ", results.data);
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

  const handleClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/cart`, {
        ids: { ids },
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
      console.log(books);
      results = response.data.books;
    } catch (error) {
      console.error("Error fetching books:", error);
      return null;
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
                Total: $123456.00 Tää täytyy vielä laskea
              </p>
            </div>
          </div>

          <div class="col-span-1 bg-white shadow rounded-lg p-4 flex flex-col justify-center space-y-4">
            <button
              //onClick={handleClick}
              class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Tee tilaus
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
