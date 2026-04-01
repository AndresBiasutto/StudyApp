import { Outlet } from "react-router-dom";
import Header from "../organisms/common/header.organism";
const LandingPageTemplate = () => {

    return (
        <div className="w-full flex flex-row items-start justify-center">
            <Header />
            <div className={`min-h-screen w-full transition-all mt-12`}>
                <Outlet />
            </div>
        </div>
    );
};
export default LandingPageTemplate;