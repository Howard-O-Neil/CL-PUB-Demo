import styles from "./clpub.module.scss";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, TextField, Typography } from "@mui/material";
import { AppContext, CateAutoComplete, LevelAutoComplete } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface AuthorSearch {
    author_id: string;
    author_name: string;
}

interface AuthorRecommend {
    author_id: string;
    author_name: string;
    author_rank: number;
}

export const ClPub = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [searchAuthorStr, setSearchAuthorStr] = React.useState<string>("");

    const [compareAuthor, setCompareAuthor] = React.useState<boolean>(false);
    const [recommendAuthor, setRecommendAuthor] = React.useState<AuthorRecommend[]>([
        { author_id: "ID1", author_name: "Author-1", author_rank: 999 },
        { author_id: "ID2", author_name: "Author-2", author_rank: 999 },
        { author_id: "ID3", author_name: "Author-3", author_rank: 999 },
        { author_id: "ID4", author_name: "...", author_rank: 999},
        { author_id: "ID5", author_name: "Author-N", author_rank: 999 },
    ])

    const [selectAuthor, setSelectAuthor] = React.useState<AuthorSearch>(
        { author_id: "...", author_name: "..." }
    );

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [searchRes, setSearchRes] = React.useState<AuthorSearch[]>([
        { author_id: "ID1", author_name: "Author-1" },
        { author_id: "ID2", author_name: "Author-2" },
        { author_id: "ID3", author_name: "Author-3" },
        { author_id: "ID4", author_name: "..." },
        { author_id: "ID5", author_name: "Author-N" },
    ])

    return (
        <div className={styles.mainPanel}>
            <div className={styles.sidePanel}>
                <Accordion expanded={expanded == 'panel3'} onChange={handleChange('panel3')} children={""}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Author recommender
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <TextField id="standard-basic" label="author name" variant="standard"
                            value={searchAuthorStr} onChange={(e) => setSearchAuthorStr(e.target.value)} />
                        <br />
                        <br />
                        <Button variant="outlined" onClick={() => {
                            axios.get(`${API_PREFIX}search_author`, { params: { name: searchAuthorStr } })
                                .then(message => {
                                    setCompareAuthor(false)
                                    setSearchRes(message.data["result"])
                                })
                        }}>Search</Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded == 'panel1'} onChange={handleChange('panel1')} children={""}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Search paper
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <TextField id="standard-basic" label="textbox" variant="standard" />
                        <br />
                        <br />
                        <Button variant="outlined">Search</Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded == 'panel2'} onChange={handleChange('panel2')} children={""}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Recommendations
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Button variant="outlined">View</Button>
                    </AccordionDetails>
                </Accordion>

            </div>


            <div className={styles.infoPane}>
                <Typography variant="h3" display="block" gutterBottom>
                    CLPUB System
                </Typography>

                {compareAuthor == false &&
                    <Paper style={{ maxHeight: 600, maxWidth: 750, overflow: 'auto' }}>
                        <List>
                            {searchRes.map((x, _) => (
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        setSelectAuthor(x)
                                        setCompareAuthor(true)

                                        axios.get(`${API_PREFIX}recommend`, { params: { id: x["author_id"] } })
                                            .then(message => {
                                                setRecommendAuthor(message.data["result"])
                                            })
                                    }}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={x.author_name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                }

                {compareAuthor == true &&
                    <Paper style={{ maxHeight: 600, maxWidth: 750, display: "flex"}}>
                        
                        <Paper style={{ height: "100%", width: "40%"}}>
                            <List>
                                {[selectAuthor].map((x, _) => (
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={x.author_name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>                          
                        </Paper>
                        
                        <div style={{width: "2%"}}></div>
                        <Paper style={{ height: "100%", width: "58%", maxHeight: 575, overflow: "auto"}}>
                            <List>
                                {recommendAuthor.map((x, _) => (
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={`${x.author_rank.toPrecision(5)} - ${x.author_name}`} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Paper>
                }
            </div>
        </div>
    )
}