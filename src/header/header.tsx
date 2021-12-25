import React, {
  ChangeEvent,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./header.module.scss";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png";
const logo_white = "http://127.0.0.1:3001/img/Logo_White.png";
const search = "http://127.0.0.1:3001/img/search.png";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { AppContext, SearchAutoComplete } from "@/AppContext";

const Header = () => {
  const [appState, dispatch] = useContext(AppContext);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  // const searchString = useRef<string>("")
  const timeoutId = useRef<number>(0);
  const navigate = useNavigate();

  const [searchBoxVal, setSearchBoxVal] = useState<SearchAutoComplete>({
    name: "",
    type: "course",
  });

  const onChangeSearch = (e, v, d) => {
    setSearchBoxVal(v);
  };

  const onInputChange = (e, v) => {
    setSearchBoxVal({
      ...searchBoxVal,
      name: v,
    });
  };

  useEffect(() => {
    dispatch({
      type: "update_autocomplete_search",
      value: undefined,
    });
  }, []);

  useEffect(() => {
    if (appState.avatar.length > 0) {
      setIsLogin(true);
    }
  }, [appState]);

  const onSearchClick = (e) => {
    dispatch({
      type: "search_course",
      value: {
        cates: [],
        levels: [],
        search: searchBoxVal.name,
      },
    });
    setSearchBoxVal({
      name: appState.search_key,
      type: "course",
    });
    navigate("/search");
    // dispatch({ type: "update_search_key", value: searchString.current, callback: () => {
    //   navigate("/search")
    // }})
  };

  return (
    <div className={styles.mainPanel}>
      <div className={styles.searchPanel}>
        <div className={styles.txt}>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: "100%", fontSize: "20px" }}
            options={appState.autocompleteList}
            autoHighlight
            getOptionLabel={(option) => option.name}
            value={searchBoxVal}
            onChange={onChangeSearch}
            onInputChange={onInputChange}
            renderOption={(props, option) => (
              <Box component="li" sx={{ "& > img": { mr: 2 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`http://127.0.0.1:3001/icon/${option.type.toLowerCase()}.png`}
                  srcSet={`http://127.0.0.1:3001/icon/${option.type.toLowerCase()}.png`}
                  alt=""
                />
                <Typography variant="subtitle1" align="left" fontSize="20px">
                  {option.name}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ width: "100%" }}
                label="Search anything"
                variant="standard"
                size="medium"
                type="text"
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: 20 },
                  autoComplete: "off", // disable autocomplete and autofill
                }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                autoComplete="off"
              />
            )}
          />
          {/* <TextField
            style={{ width: "100%" }}
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            type="text"
            id="standard-basic"
            label="Search anything"
            variant="standard"
            size="medium"
          /> */}
        </div>
        <img className={styles.icon} src={search} onClick={onSearchClick}></img>
      </div>

      <img
        className={styles.logo}
        src={logo_white}
        onClick={(e) => {
          navigate("/home");
        }}
      ></img>

      <div className={styles.buttonDiv}>
        <div className={styles.norm}>
          <p>Become a teacher</p>
        </div>

        <div className={styles.norm}>
          <p>Categories</p>
        </div>

        {isLogin == false ? (
          <>
            <div
              className={styles.login}
              onClick={() =>
                dispatch({ type: "handle_open_signin", value: undefined })
              }
            >
              <p>Log In</p>
            </div>

            <div
              className={styles.signup}
              onClick={() =>
                dispatch({ type: "handle_open_signup", value: undefined })
              }
            >
              <p>Sign Up</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.divider}></div>

            <div className={styles.username}>
              <p>{appState.username}</p>
            </div>

            <img className={styles.avatar} src={appState.avatar}>
            </img>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
