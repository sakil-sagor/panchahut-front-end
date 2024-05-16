import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-blue-900 pt-10  ">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  full-width-all m-auto pb-8 px-2">
          {/* left section  */}
          <div className="col-sapn- ">
            <Link to="/home">
              <h1 className="text-xl font-bold text-white ">
                <span className="text-blue-300">Demo</span> Stock Management app
              </h1>
            </Link>
            <p className="py-8 text-white font-semibold">
              Join our free campaign and give the gift of life! Your donation
              can save up to three lives and help those in need.Join us today
              and help make a positive impact in your community!
            </p>
          </div>
          {/* middle section */}
          <div className="col-sapn-1 ">
            <div className=" mt-2 text-center">
              <h3 className="text-center py-2 font-semibold text-xl text-white">
                Supports
              </h3>
              <Link to="/contactUs">
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
                    Your Feadback
                  </li>
                </ul>
              </Link>
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
                  <Link to="/login">Login</Link>
                </li>

                <li className="cursor-pointer hover:underline">
                  <div>
                    <Link className="ml-3 dashboard-name" to="/dashboard">
                      Dashoboard
                    </Link>
                  </div>
                </li>
                <li className="cursor-pointer hover:underline">
                  <Link to="/contactUs"> About Us</Link>
                </li>
                <li className="cursor-pointer hover:underline">
                  <Link to="/contactUs"> Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* right section  */}
          <div className="col-sapn-12 ">
            <div className="bg-indigo-200 border-l-4 border-pink-600 rounded-lg p-4">
              <i className="fas fa-headset text-pink-700 text-6xl"></i>
              <h1 className="text-2xl font-bold text-indigo-900 py-8">
                Emergency Cases
              </h1>
              <p className="text-gray-500">
                Please feel welcome to contact our friendly reception staff with
                any general enquiry
              </p>
              <div className="flex  justify-start   text-gray-600 py-8 ">
                <p>
                  <i className="fas fa-phone text-3xl text-pink-700  mr-4">
                    call us-
                  </i>
                </p>
                <div>
                  <h3 className="text-lg font-bold">+8801951 411397</h3>
                  <h3 className="text-lg font-bold">+8801712 365764</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer bottom  */}
      <div className="bg-gray-900">
        <p className="py-4 text-center text-sm text-gray-500">
          All Rights Reserved© 2023
          <a
            className="text-pink-500 underline"
            target="blank"
            href="https://iitpark.com/"
          >
            i-it park
          </a>
          Ltd.
        </p>
      </div>
    </div>
  );
};

export default Footer;
