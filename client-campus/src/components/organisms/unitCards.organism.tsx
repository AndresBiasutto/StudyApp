import React from 'react'
import type { unitCard } from '../../types/units'
import UnitCard from '../molecules/cards/unitCard.molecule'

const UnitCards:React.FC<unitCard> = ({units}) => {
  return (
    <div className='w-full flex flex-col justify-start items-start gap-2'>
    {units.map((unit)=>(
        <UnitCard title={unit.name} text={unit.shortDescription} unitOrder={unit.unitOrder} chapters={unit.chapters} />
    ) ) }
    </div>
  )
}

export default UnitCards