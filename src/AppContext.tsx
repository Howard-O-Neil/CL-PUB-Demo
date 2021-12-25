import React from "react";
import { CATEGORY_ICON_MAP_DB, category_map_t } from "./category_icon_map";
import { COURSES_DB, course_t } from "./seed";
import { StringUtils } from "turbocommons-ts";
import faker from "faker";
import { AvatarGenerator } from "random-avatar-generator";

export interface SearchAutoComplete {
  type: string;
  name: string;
}

export interface CateAutoComplete {
  icon: string;
  name: string;
}

export interface LevelAutoComplete {
  icon: string;
  name: string;
}

const avtGenerator = new AvatarGenerator();

interface AppState_t {
  sign_in: boolean;
  username: string;
  email: string;
  avatar: string;
  password: string;
  search_key: string;
  top_4_categories: category_map_t[];
  top_20_categories: category_map_t[];
  top_20_courses: course_t[];
  top_20_trending: course_t[];
  top_6_cate_per_week: category_map_t[];
  is_open_signup: boolean;
  is_open_signin: boolean;
  is_open_resetForm: boolean;
  autocompleteList: SearchAutoComplete[];
  cateAutoCompleteList: CateAutoComplete[];
  levelAutoCompleteList: LevelAutoComplete[];
  searchCourse: course_t[];
  currentCourse: course_t;
  searchByCategories: CateAutoComplete[];
  likedCourse: course_t[];
}

interface AppAction_t {
  type: string;
  value: any;
  callback?: any | undefined; // fuck this logic
}

const reducer = (state: AppState_t, action: AppAction_t): AppState_t => {
  switch (action.type) {
    case "update_login":
      return {
        ...state,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: "https://i.pravatar.cc/200?" + new Date().getTime(),
      };

    case "update_liked": {
      const course_liked: course_t = action.value.course;
      const liked_or_not: boolean = action.value.liked;

      state.currentCourse.isLiked = liked_or_not;

      if (liked_or_not == false) {
        const unlike_course = state.likedCourse.findIndex(x => x.id == course_liked.id);

        if (unlike_course != -1) {
          state.likedCourse.splice(unlike_course, 1)
        }
      } else state.likedCourse.push(course_liked)

      console.log("liked")
      return {
        ...state,
        likedCourse: [...state.likedCourse]
      }
    }

    case "update_top_4_cate":
      const categories_map = new Map<string, number>();

      COURSES_DB.forEach((x) => {
        for (let cate in x.categories) {
          if (categories_map.get(x.categories[cate]) == undefined) {
            categories_map.set(x.categories[cate], x.num_students);
          } else
            categories_map.set(
              x.categories[cate],
              x.num_students + categories_map.get(x.categories[cate])
            );
        }
      });

      const mapSort1 = Array.from(categories_map, ([name, value]) => ({
        name,
        value,
      })).sort((a, b) => b["value"] - a["value"]);

      return {
        ...state,
        top_4_categories: mapSort1.slice(0, 4).map((x) => {
          return CATEGORY_ICON_MAP_DB[x["name"]];
        }),
      };
    case "update_top_20_courses":
      COURSES_DB.sort(
        (a, b) => b.num_students + b.liked - (a.num_students + a.liked)
      );

      return {
        ...state,
        top_20_courses:
          COURSES_DB.length > 20
            ? COURSES_DB.slice(0, 20)
            : COURSES_DB.slice(0, COURSES_DB.length),
      };
    case "update_top_20_cate": // return all cate
      const categories_map_1 = new Map<string, number>();

      COURSES_DB.forEach((x) => {
        for (let cate in x.categories) {
          if (categories_map_1.get(x.categories[cate]) == undefined) {
            categories_map_1.set(x.categories[cate], x.num_students);
          } else
            categories_map_1.set(
              x.categories[cate],
              x.num_students + categories_map_1.get(x.categories[cate])
            );
        }
      });

      const mapSort2 = Array.from(categories_map_1, ([name, value]) => ({
        name,
        value,
      })).sort((a, b) => b["value"] - a["value"]);

      console.log(mapSort2);

      return {
        ...state,
        top_20_categories: mapSort2.slice(0, 20).map((x) => {
          return CATEGORY_ICON_MAP_DB[x["name"]];
        }),
      };

    case "update_top_6_cate_week": // return all cate
      const categories_map_2 = new Map<string, number>();

      COURSES_DB.forEach((x) => {
        for (let cate in x.categories) {
          if (categories_map_2.get(x.categories[cate]) == undefined) {
            categories_map_2.set(x.categories[cate], x.num_students_last3week);
          } else
            categories_map_2.set(
              x.categories[cate],
              x.num_students_last3week +
                categories_map_2.get(x.categories[cate])
            );
        }
      });

      const mapSort3 = Array.from(categories_map_2, ([name, value]) => ({
        name,
        value,
      })).sort((a, b) => b["value"] - a["value"]);

      console.log(mapSort2);

      return {
        ...state,
        top_6_cate_per_week: mapSort3.slice(0, 6).map((x) => {
          return CATEGORY_ICON_MAP_DB[x["name"]];
        }),
      };

    case "update_top_20_trending":
      COURSES_DB.sort(
        (a, b) => b.num_students_last3week - a.num_students_last3week
      );

      return {
        ...state,
        top_20_trending:
          COURSES_DB.length > 20
            ? COURSES_DB.slice(0, 20)
            : COURSES_DB.slice(0, COURSES_DB.length),
      };

    case "update_autocomplete_search":
      const res: SearchAutoComplete[] = [];

      COURSES_DB.filter(
        (x) => COURSES_DB.filter((u) => u.title == x.title).length == 1
      ).map((x) => {
        res.push({
          type: "course",
          name: x.title,
        });
      });

      for (const key in CATEGORY_ICON_MAP_DB) {
        res.push({
          type: "cate",
          name: CATEGORY_ICON_MAP_DB[key].name,
        });
      }

      return {
        ...state,
        autocompleteList: res,
      };

    case "update_autocomplete_cate":
      const cateAutoCompleteList_1: CateAutoComplete[] = [];
      for (const key in CATEGORY_ICON_MAP_DB) {
        cateAutoCompleteList_1.push({
          name: CATEGORY_ICON_MAP_DB[key].name,
          icon: CATEGORY_ICON_MAP_DB[key].icon,
        });
      }

      return {
        ...state,
        cateAutoCompleteList: cateAutoCompleteList_1,
      };
    case "update_autocomplete_level":
      const levelCompleteList_1: LevelAutoComplete[] = [];

      COURSES_DB.map((x) => {
        for (const index in x.level) {
          if (
            levelCompleteList_1.findIndex((z) => z.name == x.level[index]) == -1
          ) {
            levelCompleteList_1.push({
              name: x.level[index],
              icon: "http://127.0.0.1:3001/img/level.png",
            });
          }
        }
      });

      return {
        ...state,
        levelAutoCompleteList: levelCompleteList_1,
      };
    case "search_course":
      const searchedCourse: course_t[] = [];

      const categories_choose: CateAutoComplete[] = action.value.cates;
      const expert_level_choose: LevelAutoComplete[] = action.value.levels;

      let search_key_1 = "";
      console.log(action.value.search);
      if (action.value.search != undefined) {
        search_key_1 = action.value.search;
      } else search_key_1 = state.search_key;

      for (const key in COURSES_DB) {
        const x = COURSES_DB[key];
        if (
          x.title.toLowerCase().includes(search_key_1.toLowerCase()) ||
          x.categories.findIndex((u) =>
            u.toLowerCase().includes(search_key_1.toLowerCase())
          ) != -1
        ) {
          if (categories_choose.length > 0) {
            // check categories
            const intersection = x.categories.filter((value) =>
              categories_choose.map((u) => u.name).includes(value)
            );
            if (intersection.length > 0) {
              // check level
              if (expert_level_choose.length > 0) {
                const intersection_1 = x.level.filter((value) =>
                  expert_level_choose.map((u) => u.name).includes(value)
                );
                if (intersection_1.length > 0) {
                  searchedCourse.push(x);
                }
              } else {
                searchedCourse.push(x);
              }
            }
          } else {
            // check level

            if (expert_level_choose.length > 0) {
              const intersection_1 = x.level.filter((value) =>
                expert_level_choose.map((u) => u.name).includes(value)
              );
              if (intersection_1.length > 0) {
                searchedCourse.push(x);
              }
            } else {
              searchedCourse.push(x);
            }
          }
        }
      }

      searchedCourse.sort((a, b) => b.id - a.id);

      return {
        ...state,
        search_key: search_key_1,
        searchCourse: searchedCourse,
      };

    case "search_by_cates":
      const searchedCourse_2: course_t[] = [];

      const categories_choose_2: CateAutoComplete[] = action.value.cates;
      const expert_level_choose_2: LevelAutoComplete[] = [];

      let search_key_2 = "";

      for (const key in COURSES_DB) {
        const x = COURSES_DB[key];
        if (categories_choose_2.length > 0) {
          // check categories
          const intersection = x.categories.filter((value) =>
            categories_choose_2.map((u) => u.name).includes(value)
          );
          if (intersection.length > 0) {
            searchedCourse_2.push(x);
          }
        }
      }

      searchedCourse_2.sort((a, b) => b.id - a.id);

      return {
        ...state,
        search_key: search_key_1,
        searchCourse: searchedCourse_2,
        searchByCategories: categories_choose_2
      };

    case "sorted_search_course_by_relevance":
      state.searchCourse.sort((a, b) => b.id - a.id);
      return {
        ...state,
      };

    case "sorted_search_course_by_student":
      state.searchCourse.sort((a, b) => b.num_students - a.num_students);

      return {
        ...state,
      };

    case "sorted_search_course_by_liked":
      state.searchCourse.sort((a, b) => b.liked - a.liked);

      return {
        ...state,
      };

    case "update_current_course":
      return {
        ...state,
        currentCourse: action.value,
      };

    case "update_search_key":
      return {
        ...state,
        search_key: action.value,
      };

    case "handle_close_signup":
      return {
        ...state,
        is_open_signup: false,
      };

    case "handle_open_signup":
      return {
        ...state,
        is_open_signup: true,
        is_open_signin: false,
        is_open_resetForm: false,
      };

    case "handle_close_signin":
      return {
        ...state,
        is_open_signin: false,
      };

    case "handle_open_signin":
      return {
        ...state,
        is_open_signin: true,
        is_open_signup: false,
        is_open_resetForm: false,
      };
    case "handle_open_resetForm":
      return {
        ...state,
        is_open_resetForm: true,
        is_open_signin: false,
        is_open_signup: false,
      };

    case "handle_close_resetForm":
      return {
        ...state,
        is_open_resetForm: false,
      };

    default:
      return state;
  }
};

const initialState: AppState_t = {
  sign_in: false,
  username: "",
  email: "",
  password: '"',
  avatar: "",
  search_key: "",
  top_4_categories: [],
  top_20_courses: [],
  top_20_categories: [],
  top_20_trending: [],
  top_6_cate_per_week: [],
  is_open_signup: false,
  is_open_signin: false,
  is_open_resetForm: false,
  autocompleteList: [],
  cateAutoCompleteList: [],
  levelAutoCompleteList: [],
  searchCourse: [],
  currentCourse: COURSES_DB[0],
  searchByCategories: [],
  likedCourse: [],
};

export const AppContext = React.createContext<
  [AppState_t, React.Dispatch<AppAction_t>]
>([initialState, () => null]);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
