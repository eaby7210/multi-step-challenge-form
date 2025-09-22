import { X } from "lucide-react";

const ModalWrapper = ({
  children,
  handleClose,
  footerButton, // optional dynamic button { label, color, onClick }
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div className="bg-white shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 relative flex flex-col max-h-[90vh] rounded-lg">
        
        {/* Close Button (top-right) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {/* Always show Cancel/Close */}
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 hover:cursor-pointer"
            onClick={handleClose}
          >
            Close
          </button>

          {/* Dynamic Action Button */}
          {footerButton && (
            <button
              className={`px-4 py-2 font-semibold rounded-md transition-colors ${
                footerButton.color || "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={footerButton.onClick}
            >
              {footerButton.label || "Confirm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
