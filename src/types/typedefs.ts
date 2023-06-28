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
  colorPalette: Color[];
};

export type Database = Technology & {
  schema: string; // as code snippet
};

export type ProjectData = {
  idea: string;
  projectName: string;
  summary: string;
  frontend: {
    toDoList: string[];
    framework: Technology;
    colorScheme: ColorScheme;
  };

  backend: {
    toDoList: string[];
    framework: Technology;
    database: Database;
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
