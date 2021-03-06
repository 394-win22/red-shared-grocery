import React, { useEffect } from "react";
import "./App.css";
import { useData, useUserState, setData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import UserGroceryList from "./components/UserGroceryList.js";
import ButtonAppBar from "./components/AppBar.js";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import AddNewItem from "./components/AddNewItem";
import SimpleBottomNavigation from "./components/BottomNavBar";
import CheckoutButton from "./components/CheckoutButton";
import CreateGroupView from "./components/CreateGroupView";
import { wait } from "@testing-library/user-event/dist/utils";
import { ForkLeft } from "@mui/icons-material";

const App = () => {
  const [database, loading, error] = useData("/");
  const [user] = useUserState();
  // Nav bar value passed into SimpleBottomNavigation & GroceryList
  const [navValue, setNavValue] = React.useState(0);

  const [summaryUser, setSummaryUser] = React.useState();
  useEffect(() => {
    if (user != null) {
      setSummaryUser(user.uid);
    }
  }, [user]);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  let joinCode = "Shared Groceries App";
  let uid = "0";
  if (user && database.users[user.uid].group_id !== "unassigned") {
    joinCode = database.users[user.uid].group_id;
    uid = user.uid;
  }

  const handleChangeForSummaryUser = (event) => {
    setSummaryUser(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <ButtonAppBar
          joinCode={joinCode}
          userId={uid}
          groupExists={joinCode !== "Shared Groceries App"}
        />
      </div>
      {!user ? (
        <>
          <p className="sign-in-remind">Please sign in first</p>
        </>
      ) : database.users[user.uid] &&
        database.users[user.uid].group_id == "unassigned" ? (
        <>
          <CreateGroupView
            userList={database.users}
            groupList={database.groups}
            currentUser={user}
          ></CreateGroupView>
        </>
      ) : (
        <>
          <div className="grocery-list">
            <GroceryList
              items={database.groups[database.users[user.uid].group_id].items}
              users={database.users}
              navValue={navValue}
              groupId={database.users[user.uid].group_id}
              summaryUser={summaryUser}
            />
            <div
              style={{
                position: "fixed",
                bottom: "50px",
                display: "flex",
                justifyContent: "right",
                // marginLeft:"18.5px"
              }}
            >
              {
                navValue === 0 ? (
                  <AddNewItem
                    user={user}
                    groupId={database.users[user.uid].group_id}
                    items={
                      database.groups[database.users[user.uid].group_id].items
                    }
                    uid = {uid}
                  />
                ) : navValue === 2 ? (
                  <FormControl fullWidth style={{ paddingBottom: 20 }}>
                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={summaryUser}
                      label="User"
                      onChange={handleChangeForSummaryUser}
                    >
                      {Object.keys(database.users)
                        .filter(
                          (uid2) =>
                            database.users[uid2].group_id ==
                            database.users[user.uid].group_id
                        )
                        .map((uid) => (
                          <MenuItem key={uid} value={uid}>
                            {database.users[uid].display_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                ) : (
                  <>
                    <CheckoutButton
                      items={
                        database.groups[database.users[user.uid].group_id].items
                      }
                      groupId={database.users[user.uid].group_id}
                    ></CheckoutButton>
                  </>
                ) /*<CheckoutButton items={groceryList.items}></CheckoutButton>*/
              }
            </div>

            {/* <div className="grocery-list">
        <UserGroceryList items={groceryList.items} users={groceryList.users} /> */}
            {/* </div> */}

            {/* Botton nav component */}

            <SimpleBottomNavigation
              value={navValue}
              setValue={setNavValue}
              style={{ paddingBottom: 20}}
            />

          </div>
        </>
      )}
    </div>
  );
};

export default App;
