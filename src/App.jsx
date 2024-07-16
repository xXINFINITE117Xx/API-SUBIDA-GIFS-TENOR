import React, { useState, useEffect } from "react";
import axios from "axios";
import GifList from "./Components/GifList/GifList";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const API_KEY = "AIzaSyAx8kKbyjd8ZfU1NfOrsbyiCn5Qid3eg4c";

  useEffect(() => {
    const fetchRandomGifs = async () => {
      try {
        const response = await axios.get("https://g.tenor.com/v2/featured", {
          params: {
            key: API_KEY,
            limit: 20,
          },
        });
        console.log("Datos recibidos:", response.data);
        setGifs(response.data.results);
      } catch (error) {
        console.error("Error fetching random GIFs:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Check your API key");
        }
      }
    };

    fetchRandomGifs();
  }, [API_KEY]);

  useEffect(() => {
    if (query.trim() !== "") {
      const fetchGifs = async () => {
        try {
          const response = await axios.get("https://g.tenor.com/v2/search", {
            params: {
              q: query,
              key: API_KEY,
              limit: 20,
            },
          });
          console.log("Datos recibidos:", response.data);
          setGifs(response.data.results);
        } catch (error) {
          console.error("Error fetching GIFs:", error);
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized: Check your API key");
          }
        }
      };
      fetchGifs();
    }
  }, [query, API_KEY]);

  return (
    <div>
      <h1>Search GIF</h1>
      <input
        className="input-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GIFs"
      />
      <p className="paragraph">Search any GIF that you want</p>
      <GifList gifs={gifs} />
    </div>
  );
};

export default App;
