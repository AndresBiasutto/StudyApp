import React from "react";
import type { unitCard } from "../../types/units";
import UnitCard from "../molecules/cards/unitCard.molecule";
import Button from "../atoms/button.atom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/store/slices/uiSlice";
import { SiBookstack } from "react-icons/si";

const UnitCards: React.FC<unitCard> = ({ units }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col justify-start items-end gap-2">
      {units.map((unit) => (
        <UnitCard
          title={unit.name}
          text={unit.shortDescription}
          unitOrder={unit.unitOrder}
          chapters={unit.chapters}
        />
      ))}
      <Button
        btnName="nueva unidad"
        action={() => dispatch(toggleSidebar())}
        icon={<SiBookstack />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
    </div>
  );
};

export default UnitCards;
