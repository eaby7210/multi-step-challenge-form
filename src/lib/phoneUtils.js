export function formatUSPhoneNumber(phone) {
  if (!phone) return "";

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Handle leading "1" for US numbers
  let formatted;
  if (digits.length === 11 && digits.startsWith("1")) {
    formatted = `+${digits}`;
  } else if (digits.length === 10) {
    formatted = `+1${digits}`;
  } else {
    throw new Error("Invalid phone number length");
  }

  return formatted;
}

export function isValidUSPhoneNumber(phone) {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 || (digits.length === 11 && digits.startsWith("1")));
}
