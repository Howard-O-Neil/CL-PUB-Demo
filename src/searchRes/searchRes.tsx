import styles from "./searchRes.module.scss";
import React, { ChangeEvent, FormHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "@/header/header";
import Footer from "@/footer/footer";
import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { AppContext, CateAutoComplete, LevelAutoComplete } from "@/AppContext";
import { fontSize, style } from "@mui/system";
import ModalView from "@/modalView/modalView";

const student_icon = "http://127.0.0.1:3001/img/student.png"
const heart_icon = "http://127.0.0.1:3001/img/heart.png"


export const SearchRes = () => {
    const navigate = useNavigate()
    const [appState, dispatch] = useContext(AppContext)

    const [cates, setCates] = useState<CateAutoComplete[]>([])
    const [levels, setLevels] = useState<LevelAutoComplete[]>([])
    const [page, setPage] = React.useState(1);
    const [sortType, setSortType] = React.useState(0);
    const floatSearchTool = useRef<HTMLDivElement>()
    const keepSpace = useRef<HTMLDivElement>()

    useEffect(() => {
        dispatch({ type: "update_autocomplete_cate", value: undefined })
    }, [])

    useEffect(() => {
        dispatch({ type: "update_autocomplete_level", value: undefined })
    }, [])

    useEffect(() => {
        setSortType(0)
    }, [appState.search_key])

    useEffect(() => {
        setCates([])
    }, [appState.search_key])


    useEffect(() => {
        setLevels([])
    }, [appState.search_key])

    useEffect(() => {
        setCates(appState.searchByCategories)
    }, [appState.searchByCategories])


    const onChangeCates = (e, v, d) => {
        setCates(v);
    }

    const onCHangeLevels = (e, v, d) => {
        setLevels(v);
    }

    const onApplyClick = (e) => {
        dispatch({
            type: "search_course", value: {
                cates, levels, search: undefined
            }
        })
    }

    const handleChangePage = (e, v) => {
        setPage(v);
    }

    const onCourseClick = (v) => {
        dispatch({type: "update_current_course", value: v});
        navigate("/detail");
    }

    const onSortedChange = (e) => {
        setSortType(e.target.value);

        if (e.target.value == 0) {
            dispatch({type: "sorted_search_course_by_relevance", value: undefined});
        } else if (e.target.value == 1) {
            dispatch({type: "sorted_search_course_by_student", value: undefined});
        } else if (e.target.value == 2) {
            dispatch({type: "sorted_search_course_by_liked", value: undefined});
        }
    }

    return (
        <div className={styles.mainPanel}>
            <ModalView />

            <div className={styles.headerMain}>
                <Header />
            </div>

            {[...Array(10)].map((x, _) => (
                <div style={{ height: "10px", position: "static" }}></div>
            ))}

            <div className={styles.mainGrid}>

                <div className={styles.searchPanel} ref={floatSearchTool}>
                    <div className={styles.searchTool}>

                        <div className={styles.filterHeader}>
                            <div className={styles.first}>
                                <div className={styles.header}>
                                    FILTERS
                                </div>
                                <div className={styles.clearFilter}
                                    onClick={() => {
                                        setCates([])
                                        setLevels([])
                                    }}>
                                    Clear all filters
                                </div>
                            </div>

                            <hr className={styles.second}>
                            </hr>
                        </div>

                        <div className={styles.categories}>
                            <div className={styles.first}>
                                <div className={styles.header}>
                                    Categories
                                </div>
                                <div className={styles.clear}
                                    onClick={() => {
                                        setCates([])
                                    }}>
                                    Clear
                                </div>
                            </div>

                            <div className={styles.categoryInput}>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    sx={{ width: "100%" }}
                                    options={appState.cateAutoCompleteList}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={[]}
                                    filterSelectedOptions
                                    value={cates}
                                    onChange={onChangeCates}
                                    ChipProps={{ sx: { fontSize: "20px" } }}
                                    renderOption={(props, option) => (
                                        <Box
                                            component="li"
                                            sx={{ "& > img": { mr: 2 } }}
                                            {...props}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`${option.icon}`}
                                                srcSet={`${option.icon}`}
                                                alt=""
                                            />
                                            <Typography
                                                variant="subtitle1"
                                                align="left"
                                                fontSize="20px">
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
                            </div>
                        </div>

                        <div className={styles.experienceLevel}>
                            <div className={styles.first}>
                                <div className={styles.header}>
                                    Experience level
                                </div>
                                <div className={styles.clear} 
                                 onClick={() => {
                                     setLevels([])
                                 }}>
                                    Clear
                                </div>
                            </div>

                            <div className={styles.categoryInput}>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    sx={{ width: "100%" }}
                                    options={appState.levelAutoCompleteList}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={[]}
                                    value={levels}
                                    onChange={onCHangeLevels}
                                    ChipProps={{ sx: { fontSize: "20px" } }}
                                    filterSelectedOptions
                                    renderOption={(props, option) => (
                                        <Box
                                            component="li"
                                            sx={{ "& > img": { mr: 2 } }}
                                            {...props}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`${option.icon}`}
                                                srcSet={`${option.icon}`}
                                                alt=""
                                            />
                                            <Typography
                                                variant="subtitle1"
                                                align="left"
                                                fontSize="20px">
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
                            </div>
                        </div>
                    </div>

                    <div className={styles.applyBtnWrapper}>
                        <div className={styles.applyBtn} onClick={onApplyClick}>
                            <p>Apply</p>
                        </div>
                    </div>

                </div>

                <div className={styles.listCourse}>
                    <div className={styles.topHeader}>
                        <div className={styles.result}>
                            {`Results (${appState.searchCourse.length})`}
                        </div>
                        <div className={styles.sortBy}>Sort by</div>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            sx={{ width: "180px", fontSize: "20px" }}
                            defaultValue={0}
                            value={sortType}
                            onChange={onSortedChange}
                        >
                            <MenuItem value={0} sx={{ fontSize: "20px" }}>Relevance</MenuItem>
                            <MenuItem value={1} sx={{ fontSize: "20px" }}>Student</MenuItem>
                            <MenuItem value={2} sx={{ fontSize: "20px" }}>Liked</MenuItem>
                        </Select>
                    </div>

                    <div className={styles.list}>
                        {
                            appState.searchCourse.slice((page - 1) * 7, 7 * page).map(x => {
                                return (
                                    <Card sx={{marginTop: "10px", background: "rgba(255, 255, 255, 0.35)"}}>
                                        <CardActionArea>
                                        <div className={styles.course}>
                                        
                                        <div className={styles.thumb}>
                                        <img  src={x.thumbnail} />
                                        </div>
                                        <div className={styles.des}>
                                            <div className={styles.header}>
                                                <p>{x.title}</p>
                                            </div>
  
                                            <div className={styles.txt}>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo eros. Donec aliquet maximus neque nec faucibus. Pellentesque congue magna sed tellus dapibus</p>
                                            </div>
                                            <div className={styles.listLevel}>
                                                    {
                                                    x.level.map(u => {
                                                        return (
                                                            <Chip label={u} variant="outlined" sx={{ margin: "2px" }}></Chip>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={styles.listChip}>
                                                {
                                                    x.categories.map(u => {
                                                        return (
                                                            <Chip label={u} sx={{ margin: "2px" }}></Chip>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={styles.flexReviews}>
                                                <img className={styles.studentIcon} src={student_icon}></img>
                                                <div className={styles.numStudent}>
                                                    <p>{x.num_students}</p>
                                                </div>
                                                <img className={styles.heartIcon} src={heart_icon}></img>
                                                <div className={styles.numLiked}>
                                                    <p>{x.liked}</p>
                                                </div>
                                            </div>
                                            <div className={styles.author}>
                                                <p>{x.teacher.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button sx={{color: "#C38D3C"}}  onClick={() => onCourseClick(x)}>Detail</Button>
                                    </CardActions>
                                    </Card>


                                )
                            })
                        }

                        {[...Array(2)].map((x, _) => (
                            <div style={{ height: "10px", position: "static" }}></div>
                        ))}

                        <Pagination sx={{fontSize: "20px"}} size="large" count={Math.floor(appState.searchCourse.length / 7)} page={page} onChange={handleChangePage} />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default SearchRes;