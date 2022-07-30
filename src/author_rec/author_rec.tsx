import styles from "./author_rec.module.scss"
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { AppContext } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface AuthorRecommend {
    author_id: string;
    author_name: string;
    author_rank: number;
}

const default_author_recommend = [
    { author_id: "ID1", author_name: "Author-1", author_rank: 999 },
    { author_id: "ID2", author_name: "Author-2", author_rank: 999 },
    { author_id: "ID3", author_name: "Author-3", author_rank: 999 },
    { author_id: "ID4", author_name: "...", author_rank: 999 },
    { author_id: "ID5", author_name: "Author-N", author_rank: 999 },
]

const default_author_search = [
    { author_id: "ID1", author_name: "Author-1" },
    { author_id: "ID2", author_name: "Author-2" },
    { author_id: "ID3", author_name: "Author-3" },
    { author_id: "ID4", author_name: "..." },
    { author_id: "ID5", author_name: "Author-200" },
]

export const AuthorRec = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);
    const [searchTxt, setSearchTxt] = useState("")

    const onSearchChange = (e) => {
        setSearchTxt(e.target.value)
    }

    const onSearchClick = (e) => {
        axios.get(`${API_PREFIX}search_author`, {params: {name: searchTxt}})
            .then(message => {
                dispatch({
                    type: "set_search_res",
                    value: message.data["result"],
                    callback: () => null
                })
            })
    }

    const author_click = (x) => {
        dispatch({
            type: "set_author_chosen",
            value: x,
            callback: () => null
        })

        axios.get(`${API_PREFIX}recommend`, {params: {id: x.author_id}})
            .then(message => {
                setIsSearch(false)
                dispatch({
                    type: "set_recommend_author",
                    value: message.data["result"],
                    callback: () => null
                })
            })
    }

    const [isSearch, setIsSearch] = useState(true)

    return (
        <div>
            {isSearch &&
                <div>
                    <Box sx={{ display: "flex", alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ marginRight: '10px' }} />
                        <TextField id="standard-basic" label="Search author name" variant="standard"
                            onChange={onSearchChange} value={searchTxt} />

                        <Button variant="outlined" sx={{marginLeft: '10px'}} onClick={onSearchClick}>
                            Search
                        </Button>

                    </Box>

                    <br></br>

                    <Paper elevation={3} sx={{ maxWidth: '70%', maxHeight: '500px', overflow: 'auto' }}>
                        <List>
                            {[...appState.search_res].map((x, i) => (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {author_click(x)}}>
                                        <ListItemIcon>
                                            <AccountBoxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${x.author_name}`} >

                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                </div>
            }
            {!isSearch &&
                <div>
                    <Button variant="outlined"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => setIsSearch(true)}>
                        Back
                    </Button>

                    <br></br>
                    <br></br>

                    <Stack direction="row" spacing={2} sx={{ maxWidth: '70%', width: '70%' }}>
                        <Paper elevation={3} sx={{ maxHeight: '500px', overflow: 'auto', width: '45%' }}>
                            <List>
                                {[appState.author_chosen].map((x, i) => (
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccountBoxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={`${x.author_name}`} >

                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                        </Paper>

                        <Paper elevation={3} sx={{ maxHeight: '500px', overflow: 'auto', width: '55%' }}>
                            <List>
                                {[...appState.recommend_author].map((x, i) => (
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setIsSearch(false)}>
                                            <ListItemIcon>
                                                <AccountBoxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={`${x.author_rank.toPrecision(5)} - ${x.author_name}`} >
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                        </Paper>
                    </Stack>

                </div>
            }
        </div>
    )
}