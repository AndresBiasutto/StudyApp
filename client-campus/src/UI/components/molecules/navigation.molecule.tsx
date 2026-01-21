import type { navigation } from "../../interfaces/navigation";
import MobileNavItem from "../atoms/movileNavItem.atom";

const Navigation:React.FC<navigation> = ({navInfo, action}) => {
  return (
    <nav className=" px-6 py-2 list-none gap-2 flex flex-col justify-start items-end">
        {navInfo.map((item, index)=>(
          <MobileNavItem
            key={index}
            to={item.navLink}
            text={item.name}
            close={action}
          />
        ))}
    </nav>
  );
};

export default Navigation;
