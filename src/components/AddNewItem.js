import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { setData } from "../utilities/firebase";

const AddNewItem = ({ items }) => {
  const [itemName, setItemName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(items, itemName, "Alex", "Notes testing.");
    setItemName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="item-name-input"
        variant="outlined"
        onInput={(e) => setItemName(e.target.value)}
        value={itemName}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
};

const addItem = (items, itemName, userName, note) => {
  const newItem = {
    name: itemName,
    quantity: { userName: 1 },
    total_quantity: 1,
    purchased: false,
    notes: note,
  };
  setData(`/items/`, [...items, newItem]);
};

export default AddNewItem;
