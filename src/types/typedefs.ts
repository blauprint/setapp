export type Technology = {
  name: string;
  whyGoodOption: string;
  description: string;
  link: string;
}

export type Color = {
  name: string;
  hex: string;
  rgb: string;
}

export type ColorScheme = {
  whyGoodOption: string;
  colorPalette: Color[];
}

export type ProjectData = {
  idea: string;
  toDoList: string[];
  frontend: {
    framework: Technology;
    libraries: Technology[];
    colorScheme: ColorScheme;
  };

  backend: {
    framework: Technology;
    libraries: Technology[];
    database: Technology;
  };

  notes: string;
}
