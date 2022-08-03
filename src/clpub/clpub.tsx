import styles from "./clpub.module.scss";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, TextField, Typography } from "@mui/material";
import { AppContext } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthorRec } from "@/author_rec/author_rec";
import { OrgRec } from "@/org_rec/org_rec";
import { PaperRec } from "@/paper_rec/paper_rec";
import { GlobModal } from "@/glob_modal/glob_modal";

interface AuthorSearch {
    author_id: string;
    author_name: string;
}

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

export const ClPub = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel3');
    const [appState, dispatch] = useContext(AppContext);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={styles.mainPanel}>
            <div className={styles.sidePanel}>
                <Accordion expanded={expanded == 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Single author
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            Given author name, the system will search and recommend top 50 other authors, order by ranking.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded == 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Among 2 organization
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            Assign ranking and sorting among all possible collaboration pair from candidate among 2 specified universities.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded == 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary>
                        <Typography variant="button" display="block" gutterBottom>
                            Paper clicks
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            Searching and browsing for papers. The system will search and recommend top 50 authors based on what your clicked.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>

            <div className={styles.infoPane}>
                <Typography variant="h3" display="block" gutterBottom>
                    CLPUB System
                </Typography>

                {!appState.gloab_modal &&
                    <>
                        {expanded == "panel3" &&
                            <AuthorRec />
                        }
                        {expanded == "panel1" &&
                            <OrgRec />
                        }
                        {expanded == "panel2" &&
                            <PaperRec />
                        }
                    </>
                }
                {appState.gloab_modal &&
                    <GlobModal />
                }


            </div>
        </div>
    )
}