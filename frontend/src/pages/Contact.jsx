// import React from "react";
// import { FaWhatsapp } from "react-icons/fa";

// const Contact = () => {
//   const phoneNumber = "923329343103";

//   return (
//     <div className="min-h-screen bg-[#f6f7f9] text-[#172033] flex flex-col justify-center items-center gap-4">
//       <a
//         href={`https://wa.me/${phoneNumber}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-[#25D366] hover:scale-110 transition duration-300"
//       >
//         <FaWhatsapp size={150} />
//       </a>

//       <p className="text-gray-500 text-sm">Chat with us on WhatsApp</p>

//       <h2 className="text-xl font-bold">Phone Number</h2>
//       <p className="text-lg font-semibold">{phoneNumber}</p>
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

const Contact = () => {
  const phoneNumber = "923329343103";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("COPY ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#172033] flex flex-col justify-center items-center gap-4">
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#25D366] hover:scale-110 transition duration-300"
      >
        <FaWhatsapp size={150} />
      </a>

      <p className="text-gray-500 text-sm">Chat with us on WhatsApp</p>

      <h2 className="text-xl font-bold">Contact Information</h2>

      <div className="relative">
        <p className="text-lg font-semibold pr-7">{phoneNumber}</p>

        <button
          type="button"
          onClick={handleCopy}
          title="Copy number"
          className="absolute -top-2 -right-2 text-gray-400 hover:text-blue-600 transition"
        >
          {copied ? (
            <IoCheckmarkOutline className="text-green-500" size={16} />
          ) : (
            <IoCopyOutline size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Contact;
