import Ptxt from "../../atoms/P.atom"
import LinkTxt from "../../atoms/link.atom"

const DashboardFooter = () => {
  return (
    <footer className='w-full bg-lightSecondary dark:bg-darkSecondary h-24'>
      <div className="w-full h-full p-6 flex flex-col justify-end items-center gap-4">
        <Ptxt text="creado por Andrés Biasutto" />
        <LinkTxt link={"https://andresbiasuttodev.netlify.app/"} text="ver más" />
      </div>
    </footer>
  )
}

export default DashboardFooter