export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

export function addCommas(number) {
  const numberStr = String(number);
  const parts = numberStr.split(".");
  const integerPart = parts[0];
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedNumber =
    parts.length > 1 ? formattedInteger + "." + parts[1] : formattedInteger;
  return formattedNumber;
}

export function sortByUpdatedAt(a, b) {
  if (b.updatedAt && a.updatedAt) {
    return b.updatedAt.seconds - a.updatedAt.seconds;
  } else if (b.createdAt && a.createdAt) {
    return b.createdAt.seconds - a.createdAt.seconds;
  } else {
    return;
  }
}

export const removeHyphensAndTitleCase = (str) => {
  const words = str.split("-");
  const titleCasedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return titleCasedWords.join(" ");
};

export function formatKey(key) {
  return key.replace(/_/g, " ");
}

export function extractDateTime(inputString) {
  let dateTime = { date: "", time: "" };
  if (inputString) {
    const dtObj = new Date(inputString);
    const dateStr = dtObj.toISOString().split("T")[0];
    const timeStr = dtObj.toISOString().split("T")[1].slice(0, 5);
    const [year, month, day] = dateStr.split("-");
    const formattedDateStr = `${day}/${month}/${year}`;
    dateTime.date = formattedDateStr;
    dateTime.time = timeStr;
  }
  return dateTime;
}

export function camelCaseToWords(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function getCheckedItems(items) {
  return items.filter((item) => item.isChecked);
}

export function convertStringToTitleOrUppercase(inputString) {
  if (typeof inputString !== "string") {
    throw new Error("Input should be a string.");
  }

  if (inputString.length > 3) {
    // Convert to title case (capitalize first letter of each word)
    return inputString
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  } else {
    // Convert to uppercase
    return inputString.toUpperCase();
  }
}

export const convertToTitleCase = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export function addHyphensAndLowercase(str) {
  const words = str.split(" ");
  const lowerCaseWords = words.map((word) => word.toLowerCase());
  return lowerCaseWords.join("-");
}

export function removeBracketSection(input) {
  const openBracketIndex = input.indexOf("(");

  if (openBracketIndex === -1) {
    // No opening bracket found, return the original string
    return input;
  }

  // Extract the string before the opening bracket
  return input.slice(0, openBracketIndex).trim();
}

export function extractFilenameFromFirebaseURL(url) {
  const decodedURL = decodeURIComponent(url);
  const parts = decodedURL.split("/");
  const filename = parts[parts.length - 1].split("?")[0];

  // Replace spaces with underscores and properly handle % characters
  const cleanedFilename = filename.replace(/\s/g, "_").replace(/%/g, "%25");

  return cleanedFilename;
}
