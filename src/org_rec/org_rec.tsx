import styles from "./org_rec.module.scss"
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { AppContext } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BusinessIcon from '@mui/icons-material/Business';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

const default_org_search = [
    "Org-1/Uni-1",
    "Org-2/Uni-2",
    "Org-3/Uni-3",
    "...",
    "Org-N/Uni-N",
]

export const OrgRec = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);

    const [isRecommend, setIsRecommend] = useState(false)
    const [searchOrgTxt, setSearchOrgTxt] = useState("")

    const on_org1_click = (x) => {
        if (x != appState.org_2) {
            dispatch({
                type: 'set_org_1',
                value: x,
                callback: () => null
            })
        }
    }

    const on_org2_click = (x) => {
        if (x != appState.org_1) {
            dispatch({
                type: 'set_org_2',
                value: x,
                callback: () => null
            })
        }
    }

    const on_recommend_click = () => {
        console.log(appState.org_1)
        console.log(appState.org_2)

        axios.post(`${API_PREFIX}recommend_org`, {
            "org1": appState.org_1,
            "org2": appState.org_2,
        }).then(message => {
            dispatch({
                type: "set_among_org_rec",
                value: message.data["result"],
                callback: () => null
            })
            setIsRecommend(true)
        })
    }

    const on_search_change = (e) => {
        setSearchOrgTxt(e.target.value)
    }

    const on_search_click = () => {
        axios.get(`${API_PREFIX}search_org`, {params: {name: searchOrgTxt}})
            .then(message => {
                dispatch({
                    type: "set_search_org",
                    value: message.data["result"],
                    callback: () => null
                })
            })
    }

    return (
        <div>
            {!isRecommend &&
                <div>
                    <Paper elevation={3} sx={{ maxWidth: '70%', padding: '5px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LooksOneIcon color="success" />
                            <Typography sx={{ marginLeft: '5px' }}>Org/Uni</Typography>
                            <Switch
                                checked={appState.org_1 != ""}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ marginRight: '5px' }}
                            />

                            <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {appState.org_1 != "" ? appState.org_1 : "Not yet selected..."}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LooksTwoIcon color="secondary" />
                            <Typography sx={{ marginLeft: '5px' }}>Org/Uni</Typography>
                            <Switch
                                checked={appState.org_2 != ""}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ marginRight: '5px' }}
                            />

                            <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {appState.org_2 != "" ? appState.org_2 : "Not yet selected..."}
                            </Typography>
                        </Box>

                        <br></br>
                        <Button variant="contained"
                            disabled={appState.org_1 == "" || appState.org_2 == ""}
                            onClick={() => on_recommend_click()}>Recommend</Button>
                    </Paper>

                    <br></br>

                    <Paper elevation={3} sx={{ maxWidth: '70%', maxHeight: '450px', padding: '5px', overflow: 'auto' }}>
                        <Box sx={{ display: "flex", alignItems: 'flex-end' }}>
                            <SearchIcon sx={{ marginRight: '10px' }} />
                            <TextField id="standard-basic"
                                label="Search Organization/University"
                                variant="standard"
                                sx={{ width: "250px" }}
                                value={searchOrgTxt}
                                onChange={on_search_change} />

                            <Button variant="outlined" sx={{ marginLeft: '10px' }}
                                onClick={() => on_search_click()}>
                                Search
                            </Button>

                        </Box>

                        <List>
                            {[...appState.org_search].map((x, i) => (
                                <ListItem >
                                    <ListItemIcon>
                                        <BusinessIcon />
                                    </ListItemIcon>
                                    <ListItemText>{x}</ListItemText>
                                    <IconButton color="success" onClick={() => on_org1_click(x[0])}>
                                        <LooksOneIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => on_org2_click(x[0])}>
                                        <LooksTwoIcon />
                                    </IconButton>
                                </ListItem>))}
                        </List>
                    </Paper>
                </div>
            }
            {isRecommend &&
                <div>
                    <Button variant="outlined"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => setIsRecommend(false)}>Back
                    </Button>

                    <br></br>
                    <br></br>

                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
                        <LooksOneIcon color="success" />
                        <Typography sx={{ marginLeft: '5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {appState.org_1 != "" ? appState.org_1 : "Not yet selected..."}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
                        <LooksTwoIcon color="secondary" />
                        <Typography sx={{ marginLeft: '5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {appState.org_2 != "" ? appState.org_2 : "Not yet selected..."}
                        </Typography>
                    </Box>

                    <Paper elevation={3} sx={{ maxWidth: '70%', maxHeight: '500px', overflow: 'auto' }}>
                        <List>
                            {[...appState.among_org_rank].map((x, i) => (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{width: '5%'}}>
                                            <AccountBoxIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText sx={{width: '30%'}} primary={`${x.author_name_1}`} >
                                        </ListItemText>

                                        <ListItemIcon sx={{width: '5%'}}>
                                            <AccountBoxIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText sx={{width: '30%'}} primary={`${x.author_name_2}`} >
                                        </ListItemText>

                                        <ListItemText sx={{width: '30%'}} primary={`${x.rank.toPrecision(5)}`} >
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