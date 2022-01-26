import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ButtonGroup, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddNewItem from "./AddNewItem";
import { setData, delData } from "../utilities/firebase";
import "../utilities/helperFunctions";
import { sumDict } from "../utilities/helperFunctions";
import "../App.css";
import { useUserState } from "../utilities/firebase.js";
import Popup from "./Popup"

export default function GroceryList({ items }) {

  if (!items) {
    items = {};
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(-1);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [user] = useUserState();
  const checked = Object.keys(items)
    .map((key, index) => (items[key].purchased ? index : -1))
    .filter((index) => index != -1);

  const handleToggle = (key) => () => {
    if (items[key].purchased == false) {
      setData(`/items/${key}/purchased`, true);
    } else {
      setData(`/items/${key}/purchased`, false);
    }
  };

  return !user ? (
    <></>
  ) : (
    <div>
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {Object.keys(items).map((key, index) => {
        const labelId = `checkbox-list-secondary-label-${items[key].name}`;
        return (
          <ListItem
            className="item-list"
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(key)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton onClick={() => {
                togglePopup();
                setActiveKey(key);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar ${items[key].name}`}
                  src={`/static/images/avatar/${items[key].name}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                id={labelId}
                primary={
                  <Typography
                    type="body1"
                    style={
                      items[key].purchased
                        ? {
                            /*fontFamily: 'cursive'*/
                            textDecoration: "line-through",
                            color: "lightgray",
                            minWidth: "100px",
                          }
                        : { minWidth: "100px" }
                    } // font style
                    align="center"
                  >
                    {" "}
                    {items[key].name.length > 10
                      ? items[key].name.substring(0, 7) + "..."
                      : items[key].name}{" "}
                  </Typography>
                }
              />

              <ListItemText
                disableTypography
                className="item-total-quantity"
                primary={
                  <Typography
                    type="body1"
                    style={
                      items[key].purchased
                        ? {
                            /*fontFamily: 'cursive'*/
                            textDecoration: "line-through",
                            color: "lightgray",
                          }
                        : {}
                    } // font style
                    align="center"
                  >
                    {" "}
                    {sumDict(items[key].quantity)}{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    {isOpen && <Popup
      item={items[activeKey]}
      handleClose={togglePopup}
      user={user}
    />}
    
    </div>
  );
}
