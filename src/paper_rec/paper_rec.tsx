import styles from "./paper_rec.module.scss"
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Badge, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, TextField, Typography } from "@mui/material";
import { AppContext } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoadingButton from '@mui/lab/LoadingButton';

export const PaperRec = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);
    const [searchOrgTxt, setSearchOrgTxt] = useState("");
    const [isRecommend, setIsRecommend] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [recommendLoading, setRecommendLoading] = useState(false)

    const on_search_change = (e) => {
        setSearchOrgTxt(e.target.value)
    }
    const on_search_click = () => {
        setSearchLoading(true)

        axios.get(`${API_PREFIX}search_paper`, { params: { name: searchOrgTxt } })
            .then(message => {
                dispatch({
                    type: "set_paper_search",
                    value: message.data["result"],
                    callback: () => null
                })
                setSearchLoading(false)
            })
    }
    const on_paper_click = (x) => {
        dispatch({
            type: "append_recorded_paper_click",
            value: x,
            callback: () => null
        })
    }

    const on_recommend_click = () => {
        setRecommendLoading(true)

        axios.post(`${API_PREFIX}recommend_author_on_paper`, {
            recorded: appState.recorded_author_list
        }).then(message => {
            dispatch({
                type: "set_recommend_author_for_user",
                value: message.data["result"],
                callback: () => null
            })
            setIsRecommend(true)
            setRecommendLoading(false)
        })
    }

    return (
        <div>
            {!isRecommend &&
                <div>
                    <Box sx={{ maxWidth: '70%', padding: '5px' }}>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <Badge badgeContent={appState.recorded_author_list.length} color="primary">
                                <Paper>
                                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                                        <NotesIcon />
                                        <Typography variant="subtitle1" sx={{ marginLeft: "5px" }}>
                                            Recorded papers
                                        </Typography>
                                    </Box>
                                </Paper>

                            </Badge>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Button variant="contained"
                                    disabled={appState.recorded_author_list.length == 0}
                                    sx={{ marginLeft: "25px", marginRight: "10px" }}
                                    onClick={() => on_recommend_click()}
                                >Recommend
                                </Button>

                                {recommendLoading &&
                                    <CircularProgress size={24} />
                                }
                            </Box>

                        </Box>
                    </Box>

                    <br></br>

                    <Paper elevation={3} sx={{ maxWidth: '70%', maxHeight: '500px', padding: '5px', overflow: 'auto' }}>
                        <Box sx={{ display: "flex", alignItems: 'flex-end' }}>
                            <SearchIcon sx={{ marginRight: '10px' }} />
                            <TextField id="standard-basic"
                                label="Paper title"
                                variant="standard"
                                sx={{ width: "250px" }}
                                value={searchOrgTxt}
                                onChange={on_search_change} />

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Button sx={{ marginLeft: '10px', marginRight: '10px' }}
                                    variant="outlined"
                                    onClick={() => on_search_click()}>
                                    Search
                                </Button>

                                {searchLoading &&
                                    <CircularProgress size={24} />
                                }
                            </Box>

                        </Box>

                        <List>
                            {[...appState.paper_search].map((x, i) => (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => on_paper_click(x.author_id)}>
                                        <Box>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <NewspaperIcon sx={{ marginRight: "5px" }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{x.paper_title}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}>
                                                {[...x.author_name].map((x, i) => (
                                                    <Chip sx={{ margin: "2px" }} avatar={<AccountCircleIcon />} variant="outlined" label={x} />
                                                ))}
                                            </Box>
                                            <Typography variant="subtitle1">{`${parseInt(x.year.toString())}, ${x.venue_raw}`}</Typography>
                                            <Typography variant="subtitle1">{`DOI: ${x.doi != "" ? x.doi : "unknown"}`}</Typography>
                                        </Box>

                                    </ListItemButton>
                                </ListItem>))}
                        </List>
                    </Paper>
                </div>
            }
            {isRecommend &&
                <div>
                    <Button variant="outlined"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => setIsRecommend(false)}>
                        Back
                    </Button>

                    <br></br>
                    <br></br>

                    <Typography variant="h6">
                        Recommend authors for you
                    </Typography>

                    <Paper elevation={3} sx={{ maxHeight: '500px', overflow: 'auto' }}>
                        <List>
                            {[...appState.recommend_athor_for_user].map((x, i) => (
                                <ListItem disablePadding>
                                    <ListItemButton>
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
                </div>
            }
        </div>
    )
}