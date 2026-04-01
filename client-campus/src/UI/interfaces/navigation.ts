import type { navInfo } from "./navInfo";

export interface navigation {
  navInfo: navInfo[];
  action: () => void;
}
