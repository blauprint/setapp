export type Technology = {
  name: string;
  whyGoodOption: string; //one short sentence
  description: string; // one short sentence
  link: string;
};

export type Color = {
  name: string;
  hex: string;
  rgb: string;
};

export type ColorScheme = {
  whyGoodOption: string; //one short sentence
  colorPalette: {
    color: Color[]
  };
};

export type Database = Technology & {
  schema: string; // as code snippet
};

// export type ProjectData = {
//   id: string;
//   idea: string;
//   title: string;
//   summary: string;
//   frontend: {
//     todoList: string[];
//     framework: Technology;
//     colorScheme: ColorScheme;
//   };

//   backend: {
//     todoList: string[];
//     framework: Technology;
//     database: Database;
//   };
//   createdAt: number;
// };

export type ProjectData = {
  id: string;
  userId: string;
  idea: string;
  title: string;
  summary: string;
  forontendId: string;
  frontend: {
    id: string;
    todoList: string[];
    framework: Technology;
    frameworkId: string;
    colorScheme: ColorScheme;
    colorSchemeId: string;
  };
  backendId: string;
  backend: {
    id: string;
    todoList: string[];
    framework: Technology;
    frameworkId: string;
    database: Database;
    databaseId: string;
  };
  createdAt: number;
};

// Below is the copy of the above types, but with all the properties as string.
// This is used to build the AI prompt, so we can get a valid JSON string.

// export type Technology = {
//   "name": string;
//   "whyGoodOption": string;
//   "description": string;
//   "link": string;
// }

// export type Color = {
//   "name": string;
//   "hex": string;
//   "rgb": string;
// }

// export type ColorScheme = {
//   "whyGoodOption": string;
//   "colorPalette": Color[];
// }

// export type Database = Technology & {
//   "schema": string; // as code snippet
// };

// export type ProjectData = {
//   "idea": string;
//   "projectName": string;
//   "frontend": {
//   "toDoList": string[];
//     "framework": Technology;
//     "libraries": Technology[];
//     "colorScheme": ColorScheme;
//   };

//   "backend": {
//   "toDoList": string[];
//     "framework": Technology;
//     "libraries": Technology[];
//     "database": Database;
//   };
// }
