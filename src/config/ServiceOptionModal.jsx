// ServiceOptionModal.jsx
import { useState, useEffect } from "react";
import ModalWrapper from "../components/ModalWrapper";


const ServiceOptionModal = ({
  service,
  itemId,
  onSubmit,
  onClose,
  formData,
  existingValues,   // ✅ receive here
}) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (service.form.modalOption.eachItem) {
      // per-item values
      setValues(existingValues || {});
    } else {
      setValues(existingValues || {});
    }
  }, [service, itemId, existingValues]);

  const handleChangeField = (label, val) => {
    setValues((prev) => ({ ...prev, [label]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate only visible fields for this item
    const missing = service.form.modalOption.form.find((f) => {
      const isVisible =
        !f.valid_item_index || f.valid_item_index.includes(itemId);
      return isVisible && f.required && !values[f.label];
    });

    if (missing) {
      setError(`${missing.label} is required`);
      onSubmit(false, `${missing.label} is required`);
      return;
    }

    onSubmit(true, null, values);
    setValues({});
  };

  // Helper to check if field is visible for current item
  const isFieldVisible = (field) => {
    return !field.valid_item_index || field.valid_item_index.includes(itemId);
  };

  return (
    <ModalWrapper
      handleClose={onClose}
      footerButton={{ label: "Save & Continue", onClick: handleSubmit }}
    >
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold">{service.title} - Extra Info</h2>
        <div className="py-3 text-start">
          {service.form.modalOption.form.map((field, idx) => {
            if (!isFieldVisible(field)) {
              // keep value persisted, but don’t render field
              return null;
            }

            return (
              <div key={idx} className="flex flex-col gap-1 py-2">
                <label className="text-sm font-medium">{field.label}</label>
                <input
                  type={field.type}
                  value={values[field.label] || ""}
                  onChange={(e) =>
                    handleChangeField(field.label, e.target.value)
                  }
                  className="border p-2 border-primary"
                />
              </div>
            );
          })}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </ModalWrapper>
  );
};


export default ServiceOptionModal;
