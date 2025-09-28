const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

let userMessage = null; // stores user's message
const inputInitHeight = chatInput.scrollHeight;

// Create chat bubble <li>
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Send message to backend
const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    if (res.ok && data.reply) {
      messageElement.textContent = data.reply.trim();
    } else {
      messageElement.classList.add("error");
      messageElement.textContent =
        data.error || "Oops! Something went wrong.";
    }
  } catch (err) {
    console.error("Chat API error:", err);
    messageElement.classList.add("error");
    messageElement.textContent = "Server error. Please try again.";
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

// Handle user input
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Reset input
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Show user's message
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Show "Thinking..."
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

// Auto-expand input
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle enter key
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);

// Toggle chatbot open/close
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
