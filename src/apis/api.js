import debounce from "lodash.debounce";

export const fetchSuggestions = debounce(async () => {
  const response = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return response.json();
}, 500);
