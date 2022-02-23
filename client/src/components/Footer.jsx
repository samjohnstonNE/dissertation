import logo from "../../images/newcastle-united-logo-black-and-white.png";

const Footer = () => {

    return(
        <div className="flex w-full md:justify-center justify-between items-center flex-col p-4 bg-[#efeff4] dark:bg-[#0f172a]">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src={logo} alt={logo} className="w-32"/>
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <a href="https://github.com/SamwiseNE" target="_blank" rel="noopener noreferrer">
                        <p className="text-black text-base text-center mx-2 cursor-pointer dark:text-gray-300">
                            GitHub
                        </p>
                    </a>
                    <a href="mailto: sa-mj@live.co.uk">
                        <p className="text-black text-base text-center mx-2 cursor-pointer dark:text-gray-300">
                            Email
                        </p>
                    </a>
                    <a href="https://www.linkedin.com/in/sam-johnston-06232119b/" target="_blank" rel="noopener noreferrer">
                        <p className="text-black text-base text-center mx-2 cursor-pointer dark:text-gray-300">
                            LinkedIn
                        </p>
                    </a>
                    <a href="mailto: sam3.johnston@northumbria.ac.uk">
                        <p className="text-black text-small text-center dark:text-gray-300">
                            University Email
                        </p>
                    </a>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-black text-small text-center dark:text-gray-300">
                    Sam Johnston
                </p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 dark:bg-[#0f172a] dark:border-b dark:border-gray-400 dark:border-opacity-20 mb-4" />
            <div className="sm:w-[90%] w-full flex justify-between items-center">
                <p className="text-black text-small text-center dark:text-gray-300">
                    W17004648
                </p>
                <p className="text-black text-small text-center dark:text-gray-300">
                    University Dissertation Work
                </p>
            </div>
        </div>
    );
}

export default Footer;