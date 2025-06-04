import { XCircle } from "lucide-react";
import logo from "../assets/logo_color_black.png";

export default function Cancel() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <img src={logo} alt="Company Logo" className="h-16 mb-4 md:mb-0" />
          <div className="text-center md:text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-red-800">
              Payment Cancelled
            </h1>
            <p className="text-gray-600">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" /> Cancellation Details
            </h2>
            <p className="text-gray-600 mt-4">
              Your payment has been cancelled. If you have any questions or need
              assistance, please contact us at
              support@investorbootz.com.
            </p>
          </div>

          <hr className="my-6" />

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              Email: support@investorbootz.com
            </p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}