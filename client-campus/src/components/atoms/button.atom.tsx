import React from 'react'
import type { IButtonProps } from '../../interfaces/buttonProps'

const Button: React.FC<IButtonProps> = ({
  btnName,
  action,
  icon,
  bgLight,
  bgDark,
  type
}) => {
  return (
          <button
          type={type}
            className={`shadowDN cursor-pointer rounded center px-4 text-nowrap py-2 my-2 ${bgLight} ${bgDark} transition-all font-pixelify text-lightText dark:text-darkText`}
            onClick={action}
          >
            <i className=" md:group-hover:scale-105 text-2xl">{icon} </i> {btnName}
          </button>
  )
}

export default Button