import { useState } from "react";
import internship from "../assets/internship.webp";
import Footer from "../components/Footer";
import { internshipData } from "../data/courses";
import { useNavigate } from "react-router-dom";
import { ContactPopup } from "../components/contacts/ContactPopup";
import CallingIcon from "../components/socialContact/Call";
import WhatsappIcon from "../components/socialContact/Whatsapp";

export default function Internships() {
  const [hoveredCard, setHoveredCard] = useState<number | string | null>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const navigate = useNavigate();

  const handleInternshipClick = (courseId: string) => {
    navigate(`/internships/${courseId}`);
  };

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 mt-28">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="relative h-[300px]">
            <img
              src={internship}
              alt="Students collaborating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="flex flex-col justify-center items-center h-full text-white text-center p-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Want to kick start your Journey
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  You are on right track
                </h2>
                <p className="text-sm md:text-base max-w-3xl">
                  At Novanectar Services Pvt. Ltd. our internship programs are
                  designed to provide hands-on experience and practical
                  knowledge, preparing individuals for success in the
                  professional world. We offer immersive opportunities to work
                  on real projects, guided by industry experts, to help you
                  develop the skills and expertise needed for your career
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-100 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-white border border-blue-700 rounded-lg">
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                10,000+
              </span>
              <span className="text-gray-600">Enrolled Candidate</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-blue-700">
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                6,000+
              </span>
              <span className="text-gray-600">Certified Candidate</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-blue-700">
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                40+
              </span>
              <span className="text-gray-600">Internship Domain</span>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-blue-100 border border-blue-700 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-center mb-6">
            Internship also Available in Offline Mode
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Location:</span>
              <span>GMS Road Dehradun, Uttarakhand, India</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Whatsapp:</span>
              <span>8979891703</span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="border border-blue-800 text-blue-800 px-14 py-2 rounded-md hover:bg-blue-800 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toggleContactPopup();
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div>
          <h2 className="mt-14 text-center font-semibold text-2xl">
            Internship Online
          </h2>
          <div className="max-w-7xl mx-auto p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internshipData.map((domain) => (
                <div
                  key={domain.id}
                  className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform ${
                    domain.bgColor
                  } ${domain.hoverColor} ${
                    hoveredCard === domain.id ? "scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(domain.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleInternshipClick(domain.id)}
                >
                  {/* Card Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={domain.image}
                      alt={domain.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex">
                      <h3 className="text-xl font-bold mb-3">{domain.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {domain.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        className={`px-6 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 ${
                          hoveredCard === domain.id
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        Register Now
                      </button>
                      <div className="flex gap-3">
                        {domain.logos?.slice(0, 2).map((logo, index) => (
                          <div
                            key={index}
                            className="w-16 h-16 relative overflow-hidden rounded-full"
                          >
                            <img
                              src={logo || "/placeholder.svg"}
                              alt={`Logo ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-contain p-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                      hoveredCard === domain.id ? "opacity-5" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={isContactPopupOpen} onClose={toggleContactPopup} />
      <Footer />
      {/* call icons */}
      <CallingIcon />
      <WhatsappIcon />
    </>
  );
}
