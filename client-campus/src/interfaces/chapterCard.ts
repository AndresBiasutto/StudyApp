import type React from "react";

export interface chapterCard {
  id: number;
  title: string;
  text: string;
  chapterOrder: number;
  icon?: React.ReactNode;
}
