import React, {
  ChangeEvent,
  FormHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./landing.module.scss";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import ReactFullpage from "@fullpage/react-fullpage";

const landingImg = "http://127.0.0.1:3001/img/landing_img.png";
const vector_1 = "http://127.0.0.1:3001/img/vector_1.png";
const vector_2 = "http://127.0.0.1:3001/img/vector_2.png";
const vector_3 = "http://127.0.0.1:3001/img/vector_3.png";
const vector_4 = "http://127.0.0.1:3001/img/vector_4.png";
const vector_5 = "http://127.0.0.1:3001/img/vector_5.png";
const vector_6 = "http://127.0.0.1:3001/img/vector_6.png";
const vector_7 = "http://127.0.0.1:3001/img/vector_7.png";
const vector_8 = "http://127.0.0.1:3001/img/vector_8.png";
const rec1 = "http://127.0.0.1:3001/img/rec1.png";
const rec2 = "http://127.0.0.1:3001/img/rec2.png";
const rec3 = "http://127.0.0.1:3001/img/rec3.png";
const rec4 = "http://127.0.0.1:3001/img/rec4.png";

const celina = "http://127.0.0.1:3001/img/celina.png";
const benny = "http://127.0.0.1:3001/img/benny.png";
const karen = "http://127.0.0.1:3001/img/karen.png";
const zoey = "http://127.0.0.1:3001/img/zoey.png";

const logoWhite = "http://127.0.0.1:3001/img/Logo_White.png";
const logoBlack = "http://127.0.0.1:3001/img/Logo_Black.png";
const man_grind = "http://127.0.0.1:3001/img/man_grind.png";
const man_work = "http://127.0.0.1:3001/img/work_man.png";

const left_arrow_1 = "http://127.0.0.1:3001/img/left_arrow_1.png";
const right_arrow_1 = "http://127.0.0.1:3001/img/right_arrow_1.png";
import Footer from "@/footer/footer";

const udemy = "http://127.0.0.1:3001/img/udemy.png";
const khan = "http://127.0.0.1:3001/img/khan.png";
const alison = "http://127.0.0.1:3001/img/alison.png";
const mitocw = "http://127.0.0.1:3001/img/mitocw.png";
const skillshare = "http://127.0.0.1:3001/img/skillshare.png";
const right_arrow = "http://127.0.0.1:3001/img/right_arrow.png";

const student_icon = "http://127.0.0.1:3001/img/student.png";
const heart_icon = "http://127.0.0.1:3001/img/heart.png";

const side_left = "http://127.0.0.1:3001/img/side_left.png";
const side_right = "http://127.0.0.1:3001/img/side_right.png";

import { AppContext } from "@/AppContext";
import { Box, Modal, Typography } from "@mui/material";
import SignIn from "@/signin/signin";
import SignUp from "@/signup/signup";
import ModalView from "@/modalView/modalView";
import { Carousel } from "react-responsive-carousel";

const account_modal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 1,
};

const Landing = () => {
  const navigate = useNavigate();

  const [appState, dispatch] = useContext(AppContext);
  const [courseIndex, setCourseIndex] = useState<number>(0);
  const [cateIndex, setCateIndex] = useState<number>(0);

  useEffect(() => {
    dispatch({
      type: "update_top_4_cate",
      value: undefined,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "update_top_20_cate",
      value: undefined,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "update_top_20_courses",
      value: undefined,
    });
  }, []);

  const onChangeCourseIndex = (index) => {
    setCourseIndex(index);
  };

  const onChangeCateIndex = (index) => {
    setCateIndex(index);
  }

  return (
    <div className={styles.mainPanel}>
      <ModalView />
      <div className={styles.outerDiv}>
        {/* group gradient 2 */}
        <div>
          <img className={styles.gradient_7} src={vector_7}></img>
          <img className={styles.gradient_8} src={vector_8}></img>
        </div>

        <div className={styles.innerDiv}>
          <div className={styles.topHeader}>
            <img className={styles.logoWhite} src={logoBlack}></img>

            <div className={styles.flexDivBtn}>
              <button
                onClick={(e) => {
                  navigate("/home");
                }}
              >
                Home
              </button>
              <button>About us</button>
              <button>Categories</button>
              <button
                onClick={() =>
                  dispatch({ type: "handle_open_signin", value: undefined })
                }
              >
                Sign in
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "handle_open_signup", value: undefined })
                }
              >
                Sign up
              </button>
            </div>
          </div>

          <ReactFullpage
            licenseKey={"YOUR_LICENSE_KEY"}
            scrollOverflow={true}
            scrollingSpeed={1000}
            sectionsColor={["transparent", "transparent", "transparent"]}
            render={({ state, fullpageApi }) => {
              return (
                <div id="fullpage-wrapper">
                  <div className="section section1">
                    {/* group gradient 1 */}
                    <div>
                      <img className={styles.landingImg} src={landingImg} />

                      <img className={styles.gradient_1} src={vector_1}></img>
                      <img className={styles.gradient_2} src={vector_2}></img>

                      <img className={styles.gradient_3} src={vector_3}></img>
                      <img className={styles.gradient_4} src={vector_4}></img>
                      {/* <img className={styles.gradient_5} src={vector_5}></img> */}
                      <img className={styles.gradient_6} src={vector_6}></img>
                      <img className={styles.gradient_7} src={vector_7}></img>
                      <img className={styles.gradient_8} src={vector_8}></img>

                      <div className={styles.carouselCategory}>
                        <img
                              className={styles.leftBtn}
                              src={side_left}
                              onClick={() => {
                                setCateIndex(
                                  cateIndex - 1 < 0 ? 4 : cateIndex - 1
                                );
                              }}
                            />
                        <div className={styles.categorySwipeWrapper}>
                          <SwipeableViews
                            axis={"x"}
                            index={cateIndex}
                            onChangeIndex={onChangeCateIndex}
                          >
                            {[...Array(5)].map((_, i) => {
                              return (
                                <div className={styles.flexDivCategory}>
                                  {appState.top_20_categories
                                    .slice(i * 4, 4 * (i + 1))
                                    .map((x, _) => (
                                      <div>
                                        <div className={styles.categoryCard}>
                                          <img
                                            className={styles.icon}
                                            src={`${x.icon}`}
                                          />
                                          <div className={styles.header}>
                                            <p>{x.name}</p>
                                          </div>
                                          <div className={styles.txt}>
                                            <p>
                                              Lorem ipsum dolor sit amet,
                                              consectetur adipiscing elit.
                                              Praesent eu sapien ac lectus
                                              fermentum egestas non nec quam
                                            </p>
                                          </div>

                                          <img
                                            className={styles.rightArrow}
                                            src={right_arrow}
                                          ></img>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              );
                            })}
                          </SwipeableViews>
                        </div>
                        <img className={styles.rightBtn} src={side_right}
                          onClick={() => {
                            setCateIndex((cateIndex + 1) % 5)
                          }}>

                          </img>
                      </div>
                      {/* DATA STATE */}
                    </div>

                    <div className={styles.enrollBtn}>Enroll now</div>
                  </div>
                  <div className="section">
                    {/* <img className={styles.gradient_5} src={vector_5}></img>
                                        <img className={styles.gradient_6} src={vector_6}></img> */}

                    <div className={styles.grindSeason}>
                      <div className={styles.speech}>
                        <div className={styles.header}>
                          <p>It's grind season</p>
                        </div>
                        <div className={styles.txt}>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent eu sapien ac lectus fermentum egestas
                            non nec quam. Etiam ut tristique odio. Nullam in
                            rutrum metus. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus
                            mus.
                          </p>
                        </div>
                      </div>

                      <img src={man_grind} />
                    </div>

                    <div className={styles.grindSeason_2}>
                      <img src={man_work} />

                      <div className={styles.speech}>
                        <div className={styles.header}>
                          <p>Work for your future</p>
                        </div>
                        <div className={styles.txt}>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent eu sapien ac lectus fermentum egestas
                            non nec quam. Etiam ut tristique odio. Nullam in
                            rutrum metus. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus
                            mus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <div className={styles.loveCollegon}>
                      <div className={styles.header}>
                        <p>You'll love collegon</p>
                      </div>

                      <div className={styles.flexWrapFeedback}>
                        <div className={styles.feedBack1}>
                          <img className={styles.rec1} src={rec1} />
                          <img className={styles.rec2} src={rec2} />

                          <img className={styles.celina} src={celina} />

                          <div className={styles.txt}>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Etiam velit orci, rutrum ut eleifend ac,
                              dapibus nec ante. Etiam mattis est et libero
                              mattis, eget elementum ipsum lacinia.
                            </p>
                          </div>

                          <div className={styles.name}>
                            <p>Celina Dbag</p>
                          </div>
                        </div>
                        <div className={styles.feedBack2}>
                          <img className={styles.rec3} src={rec3}></img>

                          <img className={styles.benny} src={benny} />
                          <div className={styles.txt}>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Etiam velit orci, rutrum ut eleifend ac,
                              dapibus nec ante. Etiam mattis est et libero
                              mattis, eget elementum ipsum lacinia.
                            </p>
                          </div>

                          <div className={styles.name}>
                            <p>Benny Broke</p>
                          </div>
                        </div>
                        <div className={styles.flexWrapFeedback3_4}>
                          <div className={styles.feedBack3}>
                            <img className={styles.rec4} src={rec4}></img>

                            <img className={styles.karen} src={karen} />
                            <div className={styles.txt}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam velit orci, rutrum ut
                                eleifend ac, dapibus nec ante. Etiam mattis est
                                et libero mattis, eget elementum ipsum lacinia.
                              </p>
                            </div>

                            <div className={styles.name}>
                              <p>Karen Kendal</p>
                            </div>
                          </div>

                          <div className={styles.feedBack4}>
                            <img className={styles.rec5} src={rec4}></img>
                            <img className={styles.zoey} src={zoey} />
                            <div className={styles.txt}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam velit orci, rutrum ut
                                eleifend ac, dapibus nec ante. Etiam mattis est
                                et libero mattis, eget elementum ipsum lacinia.
                              </p>
                            </div>
                            <div className={styles.name}>
                              <p>Zoey Stalker</p>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="section"
                    style={{ backgroundColor: "transparent" }}
                  >
                    {/* DATA STATE */}
                    <div className={styles.bestCourse}>
                      <div className={styles.header}>
                        <p>Our courses are free!</p>
                      </div>

                      <div className={styles.description}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Morbi sit amet tellus dapibus, condimentum velit
                          pharetra, ornare nisl. Praesent in vestibulum sapien.
                          Integer vitae laoreet eros. Duis porttitor enim at leo
                          volutpat, nec tincidunt ante interdum. Fusce pulvinar
                          mollis accumsan. In sollicitudin libero vel est
                          hendrerit luctus. Etiam posuere ultricies diam, nec
                          porttitor tellus porta eu. Duis quis dolor orci.
                          Suspendisse potenti. Fusce sit amet justo eleifend,
                          fringilla arcu sed, porta nisl. Nullam consequat
                          mauris sit amet accumsan malesuada.
                        </p>
                      </div>

                      <div className={styles.courseList}>
                        <div className={styles.carousel}>
                          <img
                            className={styles.leftBtn}
                            src={left_arrow_1}
                            onClick={() => {
                              setCourseIndex(
                                courseIndex - 1 < 0 ? 4 : courseIndex - 1
                              );
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
                                              <div
                                                className={styles.numStudent}
                                              >
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

                  <div className="section">
                    <div className={styles.wrapEndSection}>
                      <div className={styles.partner}>
                        <div className={styles.header}>
                          <p>Our parner</p>
                        </div>

                        <div className={styles.partnerDiv}>
                          <img className={styles.partnerImg} src={udemy}></img>
                          <img className={styles.partnerImg} src={khan}></img>
                          <img className={styles.partnerImg} src={alison}></img>
                          <img className={styles.partnerImg} src={mitocw}></img>
                          <img
                            className={styles.partnerImg}
                            src={skillshare}
                          ></img>
                        </div>
                      </div>

                      <div className={styles.footer}>
                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
