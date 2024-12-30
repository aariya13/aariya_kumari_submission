const addeventclass = "py-4 px-3 coding_desc_container__gdB9M";
let lastVisitedPage = "";

function getDescription() {
  const descriptionClass = "coding_leftside_scroll__CMpky pb-5"; // Target class for problem description
  const problemDescriptionElement = document.querySelector(`.${descriptionClass.split(" ").join(".")}`);

  if (problemDescriptionElement) {
      const description = problemDescriptionElement.innerText.trim();
      if (description) {
          const problemID = getProblemID();
          localStorage.setItem(`problemDescription_${problemID}`, description);
          console.log("Problem description saved:", description);
          return description; // Return the description here
      } else {
          console.error("Problem description is empty!");
      }
  } else {
      console.error("Problem description not found!");
  }

  return null; // Return null if description is not found
}


function getLocalStorageValueById() {
  const id=getProblemid();
  const lang=getlanguage();
  const targetSuffix = `_${id}_${lang}`;
  let foundValue = null;

  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); 
      if (key.endsWith(targetSuffix)) { 
          foundValue = localStorage.getItem(key); 
          break;
      }
  }
  console.log(foundValue);
}
function getProblemid(){
  const idMatch=window.location.pathname.match(/-(\d+)$/);
  return idMatch ? idMatch[1] :null;
}


function getPlaylistPageTheme() {
  const key = "playlist-page-theme";
  const value = localStorage.getItem(key);
  return value ? value : "Key not found"; // Return value or indicate if the key is missing
}

const COLORS = {
  "blue": "#005C83", 
  "dark_blue": "#012841", 
  "beige": "#EFEBDA",
  "light_green": "#54A59C", 
  "dark_green": "#1D655D", 
  "light_brown": "#7F735D", 
  "dark_brown": "#28190E", 
  "red": "#A3333D", 
  "lightgray": "#dfebee", 
  "gray": "#639caf",
  "white": "#ffffff"
};

injectScript();
const dataproblem=""
const problemDataMap= new Map();

window.addEventListener("xhrDataFunction", (event) => {
  const data = event.detail; 
  if (data.url && data.url.match(/https:\/\/api2\.maang\.in\/problems\/user\/\d+/)) {
    const idMatch = getProblemID();
      if (idMatch) {
          const id = idMatch;
          console.log(typeof data.response);
          
          problemDataMap.set(id, data.response); 
          console.log(`Stored data with ID ${id}:`, data.response);
      }
  }
});

function getlanguage(){
  const key = "editor-language";
  const value = localStorage.getItem(key);
  return value ? value : "Key not found"; // Return value or indicate if the key is missing
}

// Observe changes in the page to ensure the chatbot is added when content changes
const observer = new MutationObserver(() => {
    handleContentChange();
});

observer.observe(document.body, { childList: true, subtree: true });

handleContentChange();

function checkPageChange() {
    const currPage = window.location.pathname;
    if (lastVisitedPage === currPage) return false;
    lastVisitedPage = currPage;
    return true;
}

function handleContentChange() {
    if (checkPageChange()) handlePageChange();
}

function handlePageChange() {
    if (isTargetPage()) {
        cleanUpPage();
        addAIHelpButton();
        injectScript();
    }
}

function isTargetPage() {
    const pathname = window.location.pathname;
    return pathname.startsWith("/problems/");
}

function cleanUpPage() {
    const existingButton = document.getElementById("ai-help-button");
    if (existingButton) existingButton.remove();

    const existingChatbox = document.getElementById("ai-chatbox");
    if (existingChatbox) existingChatbox.remove();
}

function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("scripts.js"); // Inject your script
  script.onload = function () {
      this.remove(); // Clean up after the script is executed
  };
  document.documentElement.appendChild(script);
}

function addAIHelpButton() {
    const button = document.createElement("button");
    button.id = "ai-help-button";
    button.innerText = "AI Help";
    button.style.padding = "10px 20px";
    button.style.backgroundColor = COLORS.dark_blue;
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    button.style.marginTop = "15px";
    button.style.zIndex = "800";

    button.addEventListener("click", function () {
        toggleChatbox(button);
    });

    const codingdesele = document.getElementsByClassName(addeventclass)[0];
    if (!codingdesele) {
        return;
    }

    codingdesele.insertAdjacentElement("beforeend", button);
}

function toggleChatbox(button) {
  let chatbox = document.getElementById("ai-chatbox");
  if (chatbox) {
    chatbox.remove();
    return;
  }

  chatbox = document.createElement("div");
  chatbox.id = "ai-chatbox";
  chatbox.style.width = "550px";
  chatbox.style.height = "400px";
  chatbox.style.backgroundColor = COLORS.lightgray;
  chatbox.style.border = "5px solid rgb(255, 255, 255)";
  chatbox.style.borderRadius = "10px";
  chatbox.style.boxShadow = "0px 4px 10px rgba(5, 0, 0, 0.1)";
  chatbox.style.marginTop = "15px";
  chatbox.style.zIndex = "1000";
  chatbox.style.padding = "15px";
  chatbox.style.display = "flex";
  chatbox.style.flexDirection = "column";

  const header = document.createElement("div");
  header.style.backgroundColor = COLORS.blue;
  header.style.color = "#fff";
  header.style.boxShadow = "0px 4px 10px rgba(5, 0, 0, 0.1)";
  header.style.textAlign = "center";
  header.style.width = "100%";
  header.style.height = "50px";
  header.style.borderTopLeftRadius = "10px";
  header.style.borderTopRightRadius = "10px";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between"; // Ensure space between button and trash icon
  header.style.position = "relative"; // For absolute positioning within header
  header.style.padding = "0 20px"; // Adds some padding to the header, especially on the right side
  
  // Create AI Chatbox button (just text, no box)
  const aiButton = document.createElement("button");
  aiButton.innerText = "AI Chatbox";
  aiButton.style.backgroundColor = "transparent"; // Remove background
  aiButton.style.color = "#fff"; // Text color
  aiButton.style.border = "none"; // No border
  aiButton.style.cursor = "pointer"; // Pointer on hover
  aiButton.style.fontSize = "16px"; // Adjust font size
  aiButton.style.marginRight = "20px"; // Add margin to the right of the AI button to prevent touching the trash icon
  
  // Create the clear history button (trash icon) and make it circular
  const clearButton = document.createElement("img");
  clearButton.src = chrome.runtime.getURL("assets/dustbin.jpg");  // Use the correct path for the image
  clearButton.alt = "Clear History";
  clearButton.title = "Clear History";
  clearButton.style.width = "30px"; // Set size
  clearButton.style.height = "30px"; // Ensure it's square for a circular look
  clearButton.style.borderRadius = "50%"; // Make it circular
  clearButton.style.cursor = "pointer"; // Pointer on hover
  
  // Positioning clear button in the header container using flexbox
  header.appendChild(aiButton);  // Add the AI chatbox button
  header.appendChild(clearButton);  // Add the trash icon button
  
  // Add event listener to the clear button
  clearButton.addEventListener("click", () => {
    // Function to clear history (can be customized)
    clearChatHistory();
  });

  const chatContent = document.createElement("div");
  chatContent.id = "chat-content";
  chatContent.style.flex = "1";
  chatContent.style.overflowY = "auto";
  chatContent.style.padding = "10px";
  chatContent.style.marginBottom = "10px";

  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.marginTop = "10px";

  const inputField = document.createElement("textarea");
  inputField.id = "chat-input";
  inputField.placeholder = "Type your message here";
  inputField.style.flex = "1";
  inputField.style.padding = "12px";
  inputField.style.border = "1px solid #ccc";
  inputField.style.borderRadius = "20px";
  inputField.style.fontSize = "14px";
  inputField.style.marginRight = "10px";
  inputField.style.minWidth = "50px";
  inputField.style.resize = "vertical";
  inputField.style.height = "60px";
  inputField.style.overflowWrap = "break-word";
  inputField.style.wordBreak = "break-word";

  const sendButton = document.createElement("button");
  sendButton.innerText = "Send";
  sendButton.style.padding = "12px 20px";
  sendButton.style.backgroundColor = COLORS.light_green;
  sendButton.style.color = "#fff";
  sendButton.style.border = "none";
  sendButton.style.borderRadius = "20px";
  sendButton.style.cursor = "pointer";
  sendButton.style.fontSize = "14px";
  sendButton.style.transition = "background-color 0.3s";

  sendButton.addEventListener("click", () => handlesendbutton());

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  chatbox.appendChild(header);
  chatbox.appendChild(chatContent);
  chatbox.appendChild(inputContainer);

  button.insertAdjacentElement("afterend", chatbox);

  chatbox.scrollIntoView({ behavior: "smooth" });

  sendButton.addEventListener("mouseenter", function () {
    sendButton.style.backgroundColor = "#005c83";
  });
  sendButton.addEventListener("mouseleave", function () {
    sendButton.style.backgroundColor = COLORS.light_green;
  });

  loadChatHistory();
}


function clearChatHistory() {
  const problemID = getProblemID();
  localStorage.removeItem(`chatHistory_${problemID}`);
  const chatContent = document.getElementById("chat-content");
  if (chatContent) {
    chatContent.innerHTML = ""; 
  }
}


function loadChatHistory() {
  const problemID = getProblemID();
  const chatHistory = localStorage.getItem(`chatHistory_${problemID}`);
  const chatContent = document.getElementById("chat-content");

  if (chatHistory) {
    const messages = JSON.parse(chatHistory);
    messages.forEach(msg => {
      if(msg.sender === 'user' || msg.sender === 'ai'){
      const messageElement = document.createElement("div");
      messageElement.style.cssText = `
        padding: 8px;
        margin: 5px;
        background-color: ${msg.sender === 'user' ? COLORS["beige"] : COLORS["blue"]};
        color: ${msg.sender === 'user' ? COLORS["dark_blue"] : COLORS["white"]};
        border-radius: 5px;
        align-self: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'};
        max-width: 70%;
        word-wrap: break-word;
      `;
      messageElement.innerText = msg.text;
      chatContent.appendChild(messageElement);
    }});
  
  
  }

}

function getdatabyproblemid() {
  const id=getProblemID();
  if (id && problemDataMap.has(id)) {
    const data=problemDataMap.get(id);
      return data;
  }
  return null;
}


function getProblemID() {
  // Assuming the problem ID is part of the URL or page content.
  const pathname = window.location.pathname;
  return pathname.split("/").pop(); // This extracts the last segment of the URL as problem ID
}

async function handlesendbutton() {
  const chatID = document.getElementById("chat-input");
  const messageID = document.getElementById("chat-content");

  const usermessage = chatID.value.trim();
  if (!usermessage) return;

  chatID.value = "";
  
  const usermessageElement = document.createElement("div");
  usermessageElement.style.cssText = `
    padding: 8px;
    margin: 5px;
    background-color: ${COLORS["beige"]};
    color: ${COLORS["dark_blue"]};
    border-radius: 5px;
    align-self: flex-end;
    max-width: 70%;
    word-wrap: break-word;
  `;
  usermessageElement.innerText = usermessage;
  messageID.appendChild(usermessageElement);

  const messagereply = await sendToAIAPI(usermessage);

  const aiMessageElement = document.createElement("div");
  aiMessageElement.style.cssText = `
    padding: 8px;
    margin: 5px;
    background-color: ${COLORS["blue"]};
    color: ${COLORS["white"]};
    border-radius: 5px;
    align-self: flex-start;
    max-width: 70%;
    word-wrap: break-word;
  `;
  aiMessageElement.innerText = messagereply;
  messageID.appendChild(aiMessageElement);

  messageID.scrollTop = messageID.scrollHeight;

  saveChatHistory(usermessage, messagereply);
}

function saveChatHistory(userMessage, aiMessage) {
  const problemID = getProblemID();
  const chatHistory = localStorage.getItem(`chatHistory_${problemID}`);
  const messages = chatHistory ? JSON.parse(chatHistory) : [];

  messages.push({ sender: 'user', text: userMessage });
  messages.push({ sender: 'ai', text: aiMessage });

  localStorage.setItem(`chatHistory_${problemID}`, JSON.stringify(messages));
}

function getHints(problemData) {
  if (problemData && problemData.data && problemData.data.hints) {
    const hints = problemData.data.hints;
    // Join hints by new lines for readability
    return Object.values(hints).join("\n\n");
  }
  return "No hints available.";
}

function getSolutionApproach(problemData) {
  if (problemData && problemData.data && problemData.data.hints.solution_approach) {
    return problemData.data.hints.solution_approach;
  }
  return "No solution approach available.";
}


function getEditorialCode(problemData) {
  if (problemData && problemData.data && problemData.data.editorial_code) {
    const codes = problemData.data.editorial_code;
    // Format the code snippets into a readable string
    return codes.map(codeObj => `${codeObj.language}:\n${codeObj.code}`).join("\n\n");
  }
  return "No editorial code available.";
}


async function sendToAIAPI(userMessage) {
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const API_KEY = "AIzaSyBAI5x1hq1zAgXqSlZPlaCImA5ijVW06f8"; // Replace with your actual API key
  const problemID = getProblemID();
  const chatHistory = localStorage.getItem(`chatHistory_${problemID}`);
  const messages = chatHistory ? JSON.parse(chatHistory) : [];
  const problemdata = JSON.parse(getdatabyproblemid());
  console.log(getdatabyproblemid());

  const description = getDescription(); // Problem description
  const hints = getHints(problemdata); // Hints available for the problem
  const solutionApproach = getSolutionApproach(problemdata); // The solution approach
  const editorialCode = getEditorialCode(problemdata); // Editorial code
  const userCode = getLocalStorageValueById(); // User's code
  console.log(userCode);

  // Define the initial prompt
  const initialPrompt = 
`You are a helpful AI assistant. Your task is to help the user solve coding problems. 
Do not ask the user for context or clarification. The problem description, hints, solution approach, and user code are provided below, and you should use this information to respond appropriately.

Respond only to queries related to the problem description, hints, or solution approach. Do not ask the user for additional information about the problem statement. 
If the user asks for the problem description, provide it and explain it.
If the user asks for a hint, give them a hint.
If the user asks for the solution approach, provide a high-level solution approach without the full code unless explicitly requested.
If the user asks for help with their code, point out errors or suggest improvements.

The user will ask questions related to the problem. Below is all the necessary context you need to assist them:
Problem Details:
- **Problem Statement**: ${description || "No problem description available."}
- **Hints of the problem**: ${hints || "No hints available."}
- **Solution Approach of the problem**: ${solutionApproach || "No solution approach available."}
- **Editorial Code**: ${editorialCode || "No editorial code available."}
- **User's Code**: ${userCode || "No user code available."}

Your responses should be brief, short, focused on helping the user understand the problem, and guide them toward a solution without providing the full code unless explicitly asked. Do not provide irrelevant information. Always respond based on the provided problem details and context.
Allowed question that are not related to the above problem detail. Tell the user to provide relevant question but try to be interactive. If they say hi or related gesture introduce yourself as ai assistance and help you with the question.

Example user queries:
-"Give me the description"
- "Can you provide a hint?"
- "What is wrong with my code?"
- "Can you give me the full solution?"

If the user's question is not related to the problem statement, hints, or solution approach, respond with: "I can only assist with coding problems related to the current task. Please ask a relevant question."`
;

  

  try {

    // if (!isValidCodingQuery(userMessage)) {
    //   return "I can only assist with coding problems related to the current task. Please ask a relevant question.";
    // }

    const contents = messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    if (messages.length === 0) {
      messages.push({ sender: 'system', text: initialPrompt });
      localStorage.setItem(`chatHistory_${problemID}`, JSON.stringify(messages));
      contents.push({
        role: "user",
        parts: [{ text: initialPrompt }]
      });
    } else {
      contents.push({
        role: "user",
        parts: [{ text: userMessage }]
      });
    }
   
   if (messages.length > 0) {
      contents.push({
         role: "user",
         parts: [{ text: userMessage }]
      });
   }
   
    const payload = { contents };

    console.log("Payload being sent to the API:", JSON.stringify(payload, null, 2));

    // Send the request
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the AI response from the first candidate
    return data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text
      ? data.candidates[0].content.parts[0].text
      : "No response from the API.";
  } catch (error) {
    console.error("Error sending message to API:", error);
    return "An error occurred while connecting to the API.";
  }
}
