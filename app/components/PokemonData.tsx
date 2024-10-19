"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
interface pokemonList {
  name: string;
  url: string;
}
export default function PokemonData() {
  const [data, setData] = useState<pokemonList[]>([]);
  const columns = [
    {
      name: "Name",
      selector: (row: pokemonList) => row.name,
      sortable: true,
    },
    {
      name: "URL",
      sortable: true,
      selector: (row: pokemonList) => row.url,
    },
  ];
  function fetchData() {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
        setData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }
  createTheme("theme", {
    text: {
      primary: "#5db2f0",
      secondary: "#2aa198",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },

    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div data-aos="fade-down">
      <DataTable
        title="Table"
        theme="theme"
        columns={columns}
        data={data}
        pagination
        persistTableHead
        pointerOnHover
        highlightOnHover
        expandableRows
      />
    </div>
  );
}
