export interface tabProps {
  activeTab: number;
  tabItems: string[];
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
