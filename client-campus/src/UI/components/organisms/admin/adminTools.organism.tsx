import { NavLink } from "react-router-dom";
import GridSection from "../../molecules/gridSection.molecule";
import H3 from "../../atoms/h3.atom";
import { FaUsers } from "react-icons/fa";
import { TfiBlackboard } from "react-icons/tfi";

const AdminTools = () => {
  return (
    <div className="w-full border border-lightBorder dark:border-darkBorder rounded p-2">
      <GridSection gridCols="2">
        <NavLink
          to={"/dashboard/admin/users"}
          className={` group w-full h-full flex flex-col justify-center items-center gap-4 border border-lightBorder dark:border-darkBorder rounded`}
        >
          <i className="p-4 text-lightText dark:text-darkText text-5xl group-hover:scale-95 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-all" >
            <FaUsers />
          </i>
          <H3 text="Administrar usuarios" aditionalStyle="group-hover:scale-105 group-hover:text-lightAccent dark:group-hover:text-darkAccent " />
        </NavLink>
        <NavLink
          to={"/dashboard/admin/subjects"}
          className={` group w-full h-full flex flex-col justify-center items-center gap-4 border border-lightBorder dark:border-darkBorder rounded`}
        >
          <i className="p-4 text-lightText dark:text-darkText text-5xl group-hover:scale-95 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-all" >
            <TfiBlackboard />
          </i>
          <H3 text="administrar materias" aditionalStyle="group-hover:scale-105 group-hover:text-lightAccent dark:group-hover:text-darkAccent " />
        </NavLink>
      </GridSection>
    </div>
  );
};

export default AdminTools;
