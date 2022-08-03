import styles from "./glob_modal.module.scss"
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

export const GlobModal = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);
    
    return (
        <div>
            <h1>
                This is a glob modal
            </h1>
            <Button onClick={() => {dispatch({
                type: "set_glob_modal",
                value: false,
                callback: () => null
            })}}>
                Close
            </Button>
            GlobalModal
        </div>
    )
}