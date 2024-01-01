export const fetchHelloMessage = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/hello');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Could not fetch the data: ", error);
    return null; // Indicate that the fetch was unsuccessful
  }
};

export const getGeminiResponse = async (userInput, fileContent) => {
  try {
    const response = await fetch('http://localhost:5000/get-gemini-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput, file_content: fileContent }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response; // Assuming the Flask route returns { response: ... }
  } catch (error) {
    console.error("Could not fetch the Gemini response: ", error);
    return null; // Indicate that the fetch was unsuccessful
  }
};
