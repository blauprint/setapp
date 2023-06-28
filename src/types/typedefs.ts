export type Technology = {
  name: string;
  whyGoodOption: string;
  description: string;
  link: string;
};

export type Color = {
  name: string;
  hex: string;
  rgb: string;
};

export type ColorScheme = {
  whyGoodOption: string;
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
    database: String;
  };
  createdAt: number;
};

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

// export type ProjectData = {
//   "idea": string;
//   "wholeFileStructure": string[];
//   "toDoList": string[];
//   "frontend": {
//     "framework": Technology;
//     "libraries": Technology[];
//     "colorScheme": ColorScheme;
//   };

//   "backend": {
//     "framework": Technology;
//     "libraries": Technology[];
//     "database": Technology;
//   };
//   "notes": string;
// }
