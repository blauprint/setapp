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
    colors: Color[]
  };
};

export type Database = Technology & {
  schema: string; // as code snippet
};

export type ProjectData = {
  id: string;
  idea: string;
  title: string;
  summary: string;
  frontend: {
    todoList: string[];
    framework: Technology;
    colorScheme: ColorScheme;
  };

  backend: {
    todoList: string[];
    framework: Technology;
    database: Database;
  };
  createdAt?: number;
};
