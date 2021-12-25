import styles from "./courseDetail.module.scss";
import React, { ChangeEvent, FormHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "@/header/header";
import Footer from "@/footer/footer";
import ReactPlayer from 'react-player'
import faker from "faker"
import { AppContext } from "@/AppContext";
import { Box, List, ListItemButton, ListItemText, Tab, Tabs } from "@mui/material";
import SwipeableViews from 'react-swipeable-views';
import { Carousel } from "react-responsive-carousel";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const playIcon = "http://127.0.0.1:3001/img/play.png"
const speakerIcon = "http://127.0.0.1:3001/img/speaker.png"
const mediaFullScreen = "http://127.0.0.1:3001/img/media-fullscreen.png"
const pauseIcon = "http://127.0.0.1:3001/img/pause.png"
const muteIcon = "http://127.0.0.1:3001/img/mute.png"

const program_about = "http://127.0.0.1:3001/img/program_about.png"
const program_review = "http://127.0.0.1:3001/img/program_review.png"
const program_info = "http://127.0.0.1:3001/img/program_info.png"


interface VideoPart_t {
    time: number;
    title: string;
}

const introContentUrlStyle = {
    position: "static",
    width: "819px",
    minHeight: "100px",
    height: "max-content",
    background: "rgb(231,217,191,0.3)",
    // flex: "none",
    // order: 1,
    // flexGrow: 0,
    // margin: "19px 0px 19px 0px",
    // bgcolor: 'background.paper'
}

const LoveSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

const switchLabel = { inputProps: { 'aria-label': 'I love this' } };

const CourseDetail = () => {
    const player = useRef<ReactPlayer>();
    const [fullDuration, setFullDuration] = useState<number>(-9);
    const [playing, setPlaying] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentTimeTrack, setCurrentTimeTrack] = useState<number>(0);
    const [numParts, setNumParts] = useState<number>(0);

    const [isLiked, setIsLiked] = useState<boolean>(false);

    const videoParts = useRef<VideoPart_t[]>([])

    const navigate = useNavigate()
    const [appState, dispatch] = useContext(AppContext)

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [tabChoose, setTabChoose] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setTabChoose(newValue);
    };

    const handleChangeTabIndex = (index) => {
        setTabChoose(index);
    }

    const handleListItemClick = (_, index) => {
        setSelectedIndex(index);
        setCurrentTime(videoParts.current[index].time);
    };

    useEffect(() => {
        console.log(player.current.getDuration())
    }, [])

    useEffect(() => {
        setIsLiked(appState.currentCourse.isLiked);
        console.log("liked")
    }, [appState.currentCourse])

    useEffect(() => {
        if (fullDuration != -9) {
            const splitSize = Math.floor((Math.random() * 10) + 7);
            const partSize = Math.floor(fullDuration / splitSize);

            for (let i = 0; i < splitSize; i++) {
                videoParts.current.push({
                    time: partSize * i,
                    title: faker.name.title()
                })
            }
            setNumParts(splitSize);
            setPlaying(true);
        }
    }, [fullDuration])

    const onVidProgress = (vidState) => {
        setCurrentTimeTrack(vidState.playedSeconds)
    }

    const convertFromDuration = (duration: number): string => {
        return new Date(duration * 1000).toISOString().substr(11, 8);
    }

    const trackedPercentage = () => {
        return (currentTimeTrack / fullDuration) * 100;
    }

    const longCourseName = (name: string) => {
        if (name.length >= 80) {
            return name.substring(0, 80) + "...";
        } else return name;
    }

    const onChangeLiked = (e: any) => {
        setIsLiked(e.target.checked);
        dispatch({type: "update_liked", value: {
            course: appState.currentCourse,
            liked: e.target.checked
        }});
    }

    return (
        <div className={styles.mainPanel}>
            <div className={styles.headerMain}>
                <Header />
            </div>

            <div className={styles.bigFrame}>
                <div className={styles.vidMain}>
                    <div className={styles.vidArea}>

                        <div className={styles.header}>
                            <div className={styles.text}>
                                <p> <b>{"COURSE"}</b> {` - ${longCourseName(appState.currentCourse.title)}`}</p>
                            </div>
                            <div className={styles.join}>Join Now</div>
                        </div>
                        <div className={styles.vid}>
                            <ReactPlayer
                                url={`${appState.currentCourse.intro.list_content[0].url}#t=${currentTime}`}
                                ref={player}
                                playing={playing}
                                muted={muted}
                                width={"100%"}
                                height={"100%"}
                                onProgress={onVidProgress}
                                onDuration={(dur) => {
                                    setFullDuration(dur)
                                }}
                            >
                            </ReactPlayer>

                            <div className={styles.toolBar}>
                                <img className={styles.playBtn} src={playing ? playIcon : pauseIcon} onClick={() => {
                                    setPlaying(!playing);
                                }}></img>
                                <div className={styles.progressBarParent}>
                                    <div className={styles.progressBarChild} style={{ width: `${trackedPercentage()}%` }}>

                                    </div>
                                    <div className={styles.time}>
                                        {`${convertFromDuration(currentTimeTrack)} / ${convertFromDuration(fullDuration)}`}
                                    </div>
                                </div>
                                <img className={styles.playBtn} src={muted ? muteIcon : speakerIcon} onClick={() => {
                                    setMuted(!muted);
                                }}></img>
                                <img className={styles.playBtn} src={mediaFullScreen}>

                                </img>
                            </div>
                        </div>

                        <div className={styles.flexReviews}>
                                <LoveSwitch {...switchLabel} value={+ isLiked} onChange={onChangeLiked}  />

                                <div className={styles.numStudent}>
                                    <p>Liked</p>
                                </div>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Tabs value={tabChoose} onChange={handleChangeTab} variant="fullWidth" aria-label="icon label tabs example">
                            <Tab icon={<img src={program_info} />} label="Programs" />
                            <Tab icon={<img src={program_review} />} label="Reviews" />
                            <Tab icon={<img src={program_about} />} label="About" />
                        </Tabs>

                        <SwipeableViews
                            axis={'x'}
                            index={tabChoose}
                            onChangeIndex={handleChangeTabIndex}
                        >
                            <div className={styles.programWrapper}>
                                {
                                    appState.currentCourse.contents.map((r, i) => {
                                        return (
                                            <div className={styles.program}>
                                                <div className={styles.header}>
                                                    <p>{r.name}</p>
                                                </div>
                                                <div className={styles.metric}>
                                                    <p>{`Lesson ${i + 1}  |  ${r.length} min`}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className={styles.reviewWrapper}>
                                {
                                    appState.currentCourse.reviews.map(r => {
                                        return (
                                            <div className={styles.review}>
                                                <div className={styles.author}>
                                                    <img className={styles.icon} src={r.avatar}></img>
                                                    <div className={styles.name}>
                                                        <p>{r.name}</p>
                                                    </div>
                                                </div>
                                                <div className={styles.comment}>
                                                    <p>{r.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className={styles.aboutWrapper}>
                                <div className={styles.about}>
                                    <div className={styles.title}>
                                        <p>{appState.currentCourse.title}</p>
                                    </div>

                                    <h2>Author</h2>
                                    
                                    <div className={styles.author}>
                                        <img className={styles.icon} src={appState.currentCourse.teacher.avatar} />
                                        <div className={styles.txt}>
                                            <p>{appState.currentCourse.teacher.name}</p>
                                        </div>
                                    </div>

                                    <h2>Description</h2>

                                    <div className={styles.description}>
                                    <p >{appState.currentCourse.description}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </SwipeableViews>
                    </div>
                </div>
                <div className={styles.vidContent}>
                    <List sx={{ width: "90%", height: "max-content", margin: "auto 0px auto 10px" }} component="nav" aria-label="main mailbox folders">
                        {[...Array(numParts)].map((x, i) => (
                            <ListItemButton
                                sx={{ height: "30px", backgroundColor: "transparent" }}
                                selected={selectedIndex === i}
                                onClick={(event) => handleListItemClick(event, i)}
                            >
                                <ListItemText primary={`${convertFromDuration(videoParts.current[i].time)}`} sx={{ width: "30%" }} />
                                <ListItemText primary={`${videoParts.current[i].title}`} sx={{ width: "70%" }} />
                            </ListItemButton>
                        ))}


                    </List>
                </div>

            </div>

            <Footer />
        </div>

    )
}

export default CourseDetail;