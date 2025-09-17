export const shortenText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateForInput = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toISOString().split("T")[0];
};

export const courseStatus = (status) => {
  switch (status) {
    case "enrolled":
      return "bg-gray-200 text-gray-800"; // neutral
    case "in-progress":
      return "bg-blue-200 text-blue-800"; // active
    case "completed":
      return "bg-green-200 text-green-800"; // success
    case "overdue":
      return "bg-red-200 text-red-800"; // alert
    default:
      return "bg-gray-200 text-gray-700"; // fallback
  }
};
