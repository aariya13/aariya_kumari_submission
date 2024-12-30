# AI Code Assistant - README

## Overview

**AI Code Assistant** is a Chrome extension that integrates AI to assist developers in solving coding problems. It provides features like extracting problem details, hints, and solution approaches from coding platforms, offering an interactive chatbox where users can ask AI questions and receive tailored assistance.

## Features

- **Problem Description Extraction**: Automatically retrieves and stores the problem description for easy reference.
- **Chatbox Interface**: Interactive AI-powered chatbox to assist with coding-related queries.
- **Hints and Solutions**: Provides hints, solution approaches, and editorial code for better understanding.
- **Code Feedback**: Identifies issues or suggests improvements in user-provided code.
- **Storage**: Saves chat history and problem-specific data for continuity.
- **Focused**: Only clear doubt of the problem related query.



## Usage

1. Navigate to a coding problem page on the supported platform (`https://*.maang.in/*`).
2. The **AI Help** button will appear on the problem page.
3. Click the **AI Help** button to open the chatbox.
4. Interact with the AI by asking coding-related questions, such as:
    - "What is the description of the problem?"
    - "Can you provide a hint?"
    - "What's wrong with my code?"
    - "Can you give me the solution approach?"

## Permissions

- **tabs**: To identify and interact with active browser tabs.
- **storage**: To store problem data, chat history, and user preferences.

## File Structure

- **manifest.json**: The extension's configuration file.
- **content.js**: Contains the logic to interact with the webpage, extract problem details, and inject the AI chatbox.
- **background.js**: Handles background processes such as event listeners and API calls.
- **assets/**: Stores images and icons used in the extension.
- **scripts.js**: Contains additional logic injected into web pages.

## Key Functionality

### Content Script (`content.js`)

The **content script** handles all interactions between the web page and the Chrome extension. Key functionalities include:

1. **DOM Observation and Page Transition Detection**:
   - The script observes changes in the DOM to detect when a user navigates to a new problem page.
   - Ensures that the extension dynamically adjusts to changes without requiring a manual refresh.

2. **Injection of the AI Help Button and Chatbox**:
   - Dynamically injects a user-friendly **AI Help** button onto the problem page.
   - On button click, an interactive chatbox is rendered on the page to communicate with the AI.

3. **Problem Description Extraction**:
   - Parses the webpage to extract problem details such as the title, description, input/output specifications, and constraints.
   - Stores these details in local storage for later retrieval.

4. **Local Storage Integration**:
   - Saves user preferences, chat history, and extracted problem details locally.
   - Ensures continuity and a personalized experience across sessions.

5. **AI API Communication**:
   - Sends user queries and problem details to an AI backend via an API call.
   - Handles responses to update the chatbox in real-time.

## Configuration

- **API Endpoint**: Modify the `sendToAIAPI` function in `content.js` to use your AI API key and endpoint.

## Contributing

1. Fork this repository.
2. Create a new branch for your feature or bugfix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to your branch: `git push origin feature-name`.
5. Open a pull request.
