import React, { useEffect, useState } from "react";
import { CheckCircle, MapPin, User } from "lucide-react";
import logo from "../assets/logo_color_black.png";
import api from "../apis/interceptors/axios";
import LoadingOverlay from "./Spinner";

export default function Success({ session_id }) {
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);

  const companyDetails = {
    name: "InvestorBootz",
    address: "123 Business Street, Suite 456, Cityville, ST 78910",
    contact: "Phone: (123) 456-7890 | Email: support@investorbootz.com",
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInvoiceData = async () => {
      const maxRetries = 8;
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt} to fetch invoice...`);
          const response = await api.get(`/submit-order/${session_id}/`);

          if (isMounted) {
            if (response.data?.status?.toUpperCase() === "PAID") {
              console.log("✅ Invoice data fetched:", response.data);
              setInvoiceData(response.data);
              setLoading(false);
              return; // ✅ exit only if PAID
            } else {
              console.log("❌ Invoice data fetched but not paid yet");
              // wait and retry
              if (attempt < maxRetries) {
                await delay(1000);
                continue; // try again
              } else {
                console.error(
                  "🚨 Max retries reached, invoice still not PAID."
                );
                setLoading(false);
              }
            }
          }
          return; // ✅ Success → exit retry loop
        } catch (error) {
          console.error(`❌ Attempt ${attempt} failed:`, error);

          if (attempt < maxRetries) {
            await delay(1000); // wait 1s before next retry
          } else {
            console.error("🚨 All attempts failed. Could not fetch invoice.");
            if (isMounted) setLoading(false);
          }
        }
      }
    };

    fetchInvoiceData();

    return () => {
      isMounted = false;
    };
  }, [session_id]);

  const customerDetails = invoiceData?.contactDetails || {};

  const items =
    invoiceData?.invoiceItems?.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.amount,
    })) || [];

  const total = invoiceData?.total || 0;
  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="min-h-screen w-full bg-gray-50 flex flex-col">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto flex-grow flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <img src={logo} alt="Company Logo" className="h-16 mb-4 md:mb-0" />
            <div className="text-center md:text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Order Summary
              </h1>
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-green-600 font-semibold">
                Payment Status: {invoiceData?.status?.toUpperCase()}
              </p>
              {!invoiceData?.liveMode && (
                <p className="text-red-600 font-semibold">Test Mode</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="md:col-span-1 text-left">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-500" /> Customer Details
              </h2>
              <p className="text-gray-600 mt-2">{customerDetails.name}</p>
              <p className="text-gray-600">
                {/* {customerDetails.address?.addressLine1}, */}
                {customerDetails.address?.addressLine2}
              </p>
              <p className="text-gray-600">
                {customerDetails.address?.city},{" "}
                {customerDetails.address?.state}{" "}
                {customerDetails.address?.postalCode}
              </p>
            </div>
            <div className="md:col-span-1 text-left">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-500" /> Company Details
              </h2>
              <p className="text-gray-600 mt-2">{companyDetails.name}</p>
              <p className="text-gray-600">{companyDetails.address}</p>
              <p className="text-gray-600">{companyDetails.contact}</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-blue-500" /> Items
              </h2>
              <ul className="mt-4 space-y-4">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-left text-gray-600 mt-2">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-6" />

            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800">
                Order Notes
              </h2>
              <p className="text-gray-600 mt-2">
                Thank you for your order! If you have any questions, please
                contact us at support@investorbootz.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
