export interface Theme {
  name: "light" | "dark";
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryHover: string;
    accent: string;
    border: string;
    navBg: string;
  };
  shadows: {
    card: string;
    nav: string;
  };
}

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#eef0f4",
    surface: "#f5f6f8",
    surfaceAlt: "#e4e7ec",
    text: "#1a1d23",
    textSecondary: "#52596a",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    accent: "#6366f1",
    border: "#ced3dc",
    navBg: "rgba(238, 240, 244, 0.90)",
  },
  shadows: {
    card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    nav: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "linear-gradient(160deg, #0f1117 0%, #141820 100%)",
    surface: "#1b1f28",
    surfaceAlt: "#171b23",
    text: "#eef0f4",
    textSecondary: "#8a9099",
    primary: "#60a5fa",
    primaryHover: "#3b82f6",
    accent: "#818cf8",
    border: "#272c38",
    navBg: "rgba(15, 17, 23, 0.90)",
  },
  shadows: {
    card: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
    nav: "0 1px 3px 0 rgb(0 0 0 / 0.3)",
  },
};
