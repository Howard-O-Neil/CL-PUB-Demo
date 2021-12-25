import React, {
    ChangeEvent,
    FormHTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./home.module.scss";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png";
const happy_girl = "http://127.0.0.1:3001/img/thumb_up_girl.png";
const vector_9 = "http://127.0.0.1:3001/img/vector_9.png";
const mail = "http://127.0.0.1:3001/img/email.png";
const lock = "http://127.0.0.1:3001/img/lock.png";
import { TextField } from "@mui/material";
import { AppContext } from "@/AppContext";
import Header from "@/header/header";
const left_arrow_1 = "http://127.0.0.1:3001/img/left_arrow_1.png";
const right_arrow_1 = "http://127.0.0.1:3001/img/right_arrow_1.png";
const student_icon = "http://127.0.0.1:3001/img/student.png";
const heart_icon = "http://127.0.0.1:3001/img/heart.png";
const right_arrow_2 = "http://127.0.0.1:3001/img/right_arrow_2.png";
import Footer from "@/footer/footer";
import SwipeableViews from "react-swipeable-views";
import ModalView from "@/modalView/modalView";

const Home = () => {
    const [appState, dispatch] = useContext(AppContext);

    const bigGRidRef = useRef<HTMLDivElement>();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: "update_top_20_cate",
            value: undefined,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "update_top_4_cate",
            value: undefined,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "update_top_6_cate_week",
            value: undefined,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "update_top_20_courses",
            value: undefined,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "update_top_20_trending",
            value: undefined,
        });
    }, []);

    const [courseIndex, setCourseIndex] = useState<number>(0);
    const onChangeCourseIndex = (index) => {
        setCourseIndex(index);
    };

    const [courseIndex_2, setCourseIndex_2] = useState<number>(0);
    const onChangeCourseIndex_2 = (index) => {
        setCourseIndex_2(index);
    };

    return (
        <div className={styles.mainPanel}>
            <ModalView />

            <div className={styles.headerMain}>
                <Header />
            </div>
            {[...Array(5)].map((x, _) => (
                <div style={{ height: "10px", position: "static" }}></div>
            ))}

            <div className={styles.onTrend}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <p>On trend this months</p>
                    </div>

                    <div className={styles.listCourse}>
                        <div className={styles.carousel}>

                            <img
                                className={styles.leftBtn}
                                src={left_arrow_1}
                                onClick={() => {
                                    setCourseIndex_2(
                                        courseIndex_2 - 1 < 0 ? 4 : courseIndex_2 - 1
                                    );
                                }}
                            />
                            <div className={styles.container}>

                                <SwipeableViews
                                    axis={"x"}
                                    index={courseIndex_2}
                                    onChangeIndex={onChangeCourseIndex_2}
                                >
                                    {[...Array(5)].map((_, i) => {
                                        return (
                                            <div className={styles.subContainer}>
                                                {appState.top_20_trending
                                                    .slice(i * 4, 4 * (i + 1))
                                                    .map((x) => {
                                                        return (
                                                            <div className={styles.courseCard}>
                                                                <img
                                                                    className={styles.thumbnail}
                                                                    src={x.thumbnail}
                                                                />
                                                                <div className={styles.header}>
                                                                    <p>{x.title}</p>
                                                                </div>

                                                                <div className={styles.flexReviews}>
                                                                    <img
                                                                        className={styles.studentIcon}
                                                                        src={student_icon}
                                                                    ></img>
                                                                    <div className={styles.numStudent}>
                                                                        <p>{x.num_students}</p>
                                                                    </div>
                                                                    <img
                                                                        className={styles.heartIcon}
                                                                        src={heart_icon}
                                                                    ></img>
                                                                    <div className={styles.numLiked}>
                                                                        <p>{x.liked}</p>
                                                                    </div>
                                                                </div>

                                                                <hr className={styles.divider}></hr>
                                                                <div className={styles.author}>
                                                                    <img
                                                                        className={styles.icon}
                                                                        src={x.teacher.avatar}
                                                                    ></img>
                                                                    <div className={styles.name}>
                                                                        <p>{x.teacher.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        );
                                    })}
                                </SwipeableViews>
                            </div>

                            <img
                                className={styles.rightBtn}
                                src={right_arrow_1}
                                onClick={() => {
                                    setCourseIndex_2((courseIndex_2 + 1) % 5);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {[...Array(5)].map((x, _) => (
                <div style={{ height: "10px", position: "static" }}></div>
            ))}

            <div className={styles.topMostPopular}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <p>The most popular</p>
                    </div>

                    <div className={styles.listCourse}>
                        <div className={styles.carousel}>
                            <img
                                className={styles.leftBtn}
                                src={left_arrow_1}
                                onClick={() => {
                                    setCourseIndex(courseIndex - 1 < 0 ? 4 : courseIndex - 1);
                                }}
                            />

                            <div className={styles.container}>
                                <SwipeableViews
                                    axis={"x"}
                                    index={courseIndex}
                                    onChangeIndex={onChangeCourseIndex}
                                >
                                    {[...Array(5)].map((_, i) => {
                                        return (
                                            <div className={styles.subContainer}>
                                                {appState.top_20_courses
                                                    .slice(i * 4, 4 * (i + 1))
                                                    .map((x) => {
                                                        return (
                                                            <div className={styles.courseCard}>
                                                                <img
                                                                    className={styles.thumbnail}
                                                                    src={x.thumbnail}
                                                                />
                                                                <div className={styles.header}>
                                                                    <p>{x.title}</p>
                                                                </div>

                                                                <div className={styles.flexReviews}>
                                                                    <img
                                                                        className={styles.studentIcon}
                                                                        src={student_icon}
                                                                    ></img>
                                                                    <div className={styles.numStudent}>
                                                                        <p>{x.num_students}</p>
                                                                    </div>
                                                                    <img
                                                                        className={styles.heartIcon}
                                                                        src={heart_icon}
                                                                    ></img>
                                                                    <div className={styles.numLiked}>
                                                                        <p>{x.liked}</p>
                                                                    </div>
                                                                </div>

                                                                <hr className={styles.divider}></hr>
                                                                <div className={styles.author}>
                                                                    <img
                                                                        className={styles.icon}
                                                                        src={x.teacher.avatar}
                                                                    ></img>
                                                                    <div className={styles.name}>
                                                                        <p>{x.teacher.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        );
                                    })}
                                </SwipeableViews>
                            </div>
                            <img
                                className={styles.rightBtn}
                                src={right_arrow_1}
                                onClick={() => {
                                    setCourseIndex((courseIndex + 1) % 5);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {[...Array(15)].map((x, _) => (
                <div style={{ height: "10px", position: "static" }}></div>
            ))}

            <div className={styles.categoryThisWeek}>
                <div className={styles.bigHead}>
                    <p>CATEGORIES</p>
                </div>
                <div className={styles.smallHead}>
                    <p>THIS WEEK</p>
                </div>
            </div>

            <div className={styles.top6Cate} ref={bigGRidRef}>
                <div className={styles.wrap}>
                    <div className={styles.row}>
                        {appState.top_20_categories.slice(0, 3).map((x) => {
                            return (
                                <div className={styles.element}
                                    onClick={() => {
                                        dispatch({type: "search_by_cates", value: {cates: [{
                                            icon: x.icon,
                                            name: x.name
                                        }]}});
                                        navigate("/search")
                                    }}>
                                    <img className={styles.icon} src={x.icon}></img>
                                    <div className={styles.header}>
                                        <p>{x.name}</p>
                                    </div>
                                    <div className={styles.txt}>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Aenean laoreet nunc quis ex pharetra tincidunt.
                                        </p>
                                    </div>
                                    <img className={styles.rightArrow} src={right_arrow_2}></img>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.row}>
                        {appState.top_20_categories.slice(3, 6).map((x) => {
                            return (
                                <div className={styles.element} 
                                onClick={() => {
                                    dispatch({type: "search_by_cates", value: {cates: [{
                                        icon: x.icon,
                                        name: x.name
                                    }]}})
                                    navigate("/search")
                                }}>
                                    <img className={styles.icon} src={x.icon}></img>
                                    <div className={styles.header}>
                                        <p>{x.name}</p>
                                    </div>
                                    <div className={styles.txt}>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Aenean laoreet nunc quis ex pharetra tincidunt.
                                        </p>
                                    </div>
                                    <img className={styles.rightArrow} src={right_arrow_2}></img>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {[...Array(5)].map((x, _) => (
                <div style={{ height: "10px", position: "static" }}></div>
            ))}

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
