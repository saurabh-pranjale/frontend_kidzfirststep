import logo from '../assets/logo_KFS.png'
import './KidzFirstFooter.css'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
} from "react-icons/fa";

const KidzFirstFooter = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/* Logo and Description */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <img
              src={logo}
              alt="KidzFirst Step Logo"
              style={{ width: "160px" }}
            />
            <p className="mt-3">
              <strong>KidzFirst Step</strong> is a homegrown brand offering
              creative indoor and outdoor play equipment, school furniture, and
              early education toys.
            </p>
          </div>

          {/* Company Links */}
          <div className="footer-links col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase fw-bold mb-4">Company</h6>
            <p><a href="#" className="text-reset text-decoration-none">About Us</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Blog</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Contact Us</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Careers</a></p>
          </div>

          {/* Useful Links */}
          <div className="footer-links col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
            <p><a href="#" className="text-reset text-decoration-none">FAQs</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Privacy Policy</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Shipping</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Returns</a></p>
          </div>

          {/* B2B Enquiry */}
          <div className="footer-links col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase fw-bold mb-4">B2B Enquiry</h6>
            <p><a href="#" className="text-reset text-decoration-none">Indoor Play Equipment</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Outdoor Play Equipment</a></p>
            <p><a href="#" className="text-reset text-decoration-none">School Furniture</a></p>
            <p><a href="#" className="text-reset text-decoration-none">Certifications</a></p>
          </div>
        </div>

        <hr className="my-4 text-light" />

        {/* Bottom Row */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              © {new Date().getFullYear()} <strong>KidzFirst Step</strong>. Crafted by <a href="#" className="text-decoration-none fw-bold text-light">SP😍</a>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-inline-block me-3">
              <FaFacebookF className="me-2" />
              <FaInstagram className="me-2" />
              <FaYoutube className="me-2" />
              <FaLinkedinIn />
            </div>
            <div className="d-inline-block">
              <FaCcVisa className="me-2" />
              <FaCcAmex className="me-2" />
              <FaCcMastercard className="me-2" />
              <FaCcPaypal className="me-2" />
              <FaCcDiscover />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KidzFirstFooter;
