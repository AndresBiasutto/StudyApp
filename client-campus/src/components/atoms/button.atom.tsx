import React from 'react'
import type { IButtonProps } from '../../interfaces/buttonProps'

const Button: React.FC<IButtonProps> = ({
  btnName,
  action,
  icon,
  bgLight,
  bgDark
}) => {
  return (
          <button
            className={`cursor-pointer rounded center px-4 text-nowrap py-2 m-1 ${bgLight} ${bgDark} font-pixelify text-lightText dark:text-darkText`}
            onClick={action}
          >
            <i className=" md:group-hover:scale-105 text-2xl">{icon} </i> {btnName}
          </button>
  )
}

export default Button