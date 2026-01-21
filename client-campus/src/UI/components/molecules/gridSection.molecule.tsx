import type { gridSectionProps } from "../../interfaces/gridSectionProps";



const GridSection: React.FC<gridSectionProps> = ({ children, gridCols = "1" }) => {
  const gridClassMap: Record<string, string> = {
    "1": "md:grid-cols-1",
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-4",
    "5": "md:grid-cols-5",
  };

  // Si no existe el valor, por defecto usa 3 columnas
  const gridClass = gridClassMap[gridCols] || "md:grid-cols-1";
  return (
    <section className={`w-full transition-all duration-300`}>
      <div
        className={`h-full w-full list-none grid gap-2 sm:grid-cols-1 ${gridClass}`}
      >
        {children}
      </div>
    </section>
  );
};

export default GridSection;
