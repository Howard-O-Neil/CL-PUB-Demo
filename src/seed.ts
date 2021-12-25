
export interface vids_t {
  time: string;
  title: string;
  url: string;
}

export interface intro_t {
  vid_type: string; // split or timestamp
  list_content: vids_t[];
}

export interface account_review_t {
  name: string;
  avatar: string;
  text: string;
}

export interface course_content_t {
  name: string;
  num_lectures: number;
  length: number;
}

export interface teacher_t {
  name: string;
  avatar: string;
}

export interface course_t {
  id: number;
  title: string;
  host_url: string;
  categories: string[];
  cost: number;
  language: string;
  certificate: string;
  description: string;
  short_description: string;
  requirements: string;
  subject_student: string;
  length: number;
  thumbnail: string;
  num_students: number;
  num_students_last3week: number;
  liked: number;
  level: string[];
  isLiked: boolean;

  teacher: teacher_t;
  contents: course_content_t[];
  reviews: account_review_t[];
  intro: intro_t;
}

import faker from "faker"
import { AvatarGenerator } from 'random-avatar-generator';
import { CATEGORY_ICON_MAP_DB } from "./category_icon_map";
import { MP4_DB } from "./seed2";

const avtGenerator = new AvatarGenerator();

const generateReviews = (): account_review_t[] => {
  const res: account_review_t[] = [];

  const size = Math.floor((Math.random() * 7) + 5);
  for (let i = 0; i < size; i++) {
    res.push({
      avatar: "https://i.pravatar.cc/200?" + new Date().getTime(),
      name: faker.name.findName(),
      text: faker.lorem.paragraph()
    })
  }
  return res;
}

const generateContents = (): course_content_t[] => {
  const res: course_content_t[] = [];

  const size = Math.floor((Math.random() * 7) + 5);
  for (let i = 0; i < size; i++) {
    res.push({
      name: faker.name.title(),
      length: Math.floor((Math.random() * 150) + 45),
      num_lectures: Math.floor((Math.random() * 8) + 3),
    })
  }
  return res;
}

const generateTeacherData = (): teacher_t => {
  return {
    name: faker.name.findName(),
    avatar: "https://i.pravatar.cc/200?" + new Date().getTime(),
  }
}

const generateLiked = () => Math.floor((Math.random() * 5000) + 100);
const generateNumStudent = () => Math.floor((Math.random() * 10000) + 500);
const generateNumStudent3Week = () => Math.floor((Math.random() * 3000) + 500);

const listCategories = Object.values(CATEGORY_ICON_MAP_DB);

const generateCategories = (): string[] => {
  const size = Math.floor((Math.random() * 6) + 2);

  const res: string[] = [];
  
  for (let i = 0; i < size; i++) {
    let rand = listCategories[Math.floor((Math.random() * listCategories.length))].name;

    if (res.length == 0)
      res.push(rand)
    else {
      while (res.findIndex(x => x == rand) != -1) {
        rand = listCategories[Math.floor((Math.random() * listCategories.length))].name;
      }
      res.push(rand)
    }
  }

  return res;
}

const generatedLevel = (): string[] => {
  const size = Math.floor((Math.random() * 3) + 1);
  const listLevel = ["beginner", "expert", "intermediate"];

  const res: string[] = [];
  
  for (let i = 0; i < size; i++) {
    let rand = listLevel[Math.floor((Math.random() * listLevel.length))];

    if (res.length == 0)
      res.push(rand)
    else {
      while (res.findIndex(x => x == rand) != -1) {
        rand = listLevel[Math.floor((Math.random() * listLevel.length))];
      }
      res.push(rand)
    }
  }
  return res;

}

let count = 0;

export let COURSES_DB: course_t[] = [
  // {
  //   id: (count++).toString(),
  //   title: "Microsoft Excel for Finance, Accounting & Financial Analysis",
  //   host_url: "https://www.udemy.com/course/excel-for-business-users/",
  //   thumbnail: "https://img-c.udemycdn.com/course/240x135/3020540_73ed.jpg",
  //   level: generatedLevel(),

  //   liked: generateLiked(),
  //   num_students: generateNumStudent(),
  //   num_students_last3week: generateNumStudent3Week(),
  //   categories: generateCategories(),
  //   cost: 0,
  //   language: "en",
  //   certificate: "Certificate of completion",
  //   description: faker.lorem.paragraphs(),
  //   short_description: "Excel tips & tricks for Accounting, Finance and Financial Analysis. Learn from the Bestselling Accounting Instructor",
  //   requirements: "lorem",
  //   subject_student: "lorem",
  //   length: 2.5,

  //   intro: {
  //     vid_type: "timestamp",
  //     list_content: [
  //       { time: "0:49", title: "lorem", url: `http://127.0.0.1:3001/vid/${MP4_DB[Math.floor((Math.random() * MP4_DB.length))]}` },
  //     ]
  //   },
  //   contents: generateContents(),
  //   reviews: generateReviews(),
  //   teacher: generateTeacherData(),
  // },
]

for (let i = 0; i < 500; i++) {
  COURSES_DB.push(
    {
      id: count++,
      title: faker.name.title(),
      host_url: faker.internet.url(),
      thumbnail: "https://picsum.photos/200?" + new Date().getTime(), // break cache
      level: generatedLevel(),
  
      liked: generateLiked(),
      num_students: generateNumStudent(),
      num_students_last3week: generateNumStudent3Week(),
      categories: generateCategories(),
      cost: 0,
      language: "en",
      certificate: "Certificate of completion",
      description: faker.lorem.paragraphs(),
      short_description: "Excel tips & tricks for Accounting, Finance and Financial Analysis. Learn from the Bestselling Accounting Instructor",
      requirements: "lorem",
      subject_student: "lorem",
      length: 2.5,
  
      intro: {
        vid_type: "timestamp",
        list_content: [
          { time: "0:49", title: "lorem", url: `http://127.0.0.1:3001/vid/${MP4_DB[Math.floor((Math.random() * MP4_DB.length))]}` },
        ]
      },
      contents: generateContents(),
      reviews: generateReviews(),
      teacher: generateTeacherData(),

      isLiked: false,
    }
  )
}