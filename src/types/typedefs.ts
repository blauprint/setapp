export interface Technology {
  name: string;
  whyGoodOption: string;
  description: string;
  link: string;
}

export interface Color {
  name: string;
  hex: string;
  rgb: string;
}

export interface ColorScheme {
  whyGoodOption: string;
  colorPalette: Color[];
}

export interface ProjectData {
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
