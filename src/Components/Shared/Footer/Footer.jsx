import { FaPhoneAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthState } from "../../../contexts/AuthProvider";

const Footer = () => {
  const { user } = AuthState();
  return (
    <div className="bg-gray-900  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container full-width-all m-auto pb-8 px-2">
        {/* left section  */}
        <div className="flex justify-center ">
          <NavLink to="/home">
            <img
              src="https://i.ibb.co/xjHP8DP/2.png"
              className="w-60 "
              alt=""
            />
          </NavLink>
        </div>
        {/* middle section */}
        <div className="col-sapn-1 ">
          <div className=" mt-2 text-center">
            <h3 className="text-center py-2 font-semibold text-xl text-white">
              Supports
            </h3>
            <NavLink to="/aboutUs">
              <ul className="tab-list text-gray-300">
                <li className="cursor-pointer hover:underline">
                  Terams & Conditions
                </li>
                <li className="cursor-pointer hover:underline">
                  Privecy Policy
                </li>
                <li className="cursor-pointer hover:underline">
                  All Guidelines
                </li>
                <li className="cursor-pointer hover:underline">History</li>
                <li className="cursor-pointer hover:underline">
                  Your Feadback{" "}
                </li>
              </ul>
            </NavLink>
          </div>
        </div>
        {/* middle section  */}
        <div className="col-sapn-6 ">
          <div className=" mt-2 text-center">
            <h3 className="text-center py-2 font-semibold text-xl text-white">
              Links
            </h3>
            <ul className="tab-list text-gray-300">
              <li className="cursor-pointer hover:underline">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="cursor-pointer hover:underline">
                <NavLink to="/login">Register</NavLink>
              </li>
              <li className="cursor-pointer hover:underline">
                <NavLink to="/aboutUs"> About Us</NavLink>
              </li>
              <li className="cursor-pointer hover:underline">
                <NavLink to="/contactUs"> Contact Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* right section  */}
        <div className="col-sapn-12 text-white">
          <p className="text-lg font-semibold my-3">Address</p>
          <div>
            <p>Ukilpara Mor, Kishoreganj Sadar</p>
          </div>
          <br />
          <div>
            <h3 className="text-orange-600">Hotline:</h3>
            <div className="flex  items-center gap-4">
              <p>
                <FaPhoneAlt />
              </p>
              <p>01999 99 58 52</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="bg-pink-900 py-4"></div>
        <div className="bg-[#14445a] py-4"></div>
      </div>
      {/* footer bottom  */}
      <div className="bg-black">
        <p className="py-4 text-center text-gray-500">
          ©panchahut.com 2024, Designed & Developed by{" "}
          <a
            className="text-pink-500"
            target="_blank"
            href="https://iitpark.com/"
            rel="noreferrer"
          >
            i-it park
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
