import type React from "react";

export interface chapterCard {
  id: string | undefined;
  title: string;
  text: string;
  chapterOrder: number|null |undefined;
  icon?: React.ReactNode;
}
