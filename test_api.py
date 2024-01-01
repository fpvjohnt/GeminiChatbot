import google.generativeai as genai

def test_gemini_api(api_key):
    # Configure the API with your key
    genai.configure(api_key=api_key)
    
    # Create a model instance
    model = genai.GenerativeModel("gemini-pro")
    
    # Prepare a test input
    test_input = "What is the capital of France?"
    
    try:
        # Generate a response
        response = model.generate_content(test_input)
        print("API Response:", response.text)
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    test_api_key = 'AIzaSyBwceu1RFHjD_QJcWfTMCQJR7DvHugupwg'
    test_gemini_api(test_api_key)
