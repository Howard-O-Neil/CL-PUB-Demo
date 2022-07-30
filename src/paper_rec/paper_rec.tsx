import styles from "./paper_rec.module.scss"
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, TextField, Typography } from "@mui/material";
import { AppContext } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import axios from "axios";
import { API_PREFIX } from "@/App";
import InboxIcon from '@mui/icons-material/Inbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const PaperRec = () => {
    const navigate = useNavigate();
    const [appState, dispatch] = useContext(AppContext);

    return (
        <h1>Paper Rec</h1>
    )
}