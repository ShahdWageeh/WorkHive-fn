import React, { useState, useRef, useContext } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoAttach, IoImage, IoSend } from "react-icons/io5";
import avatar from "../../assets/images/avatar.svg";
import { AuthContext } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { token } = useContext(AuthContext);
  const { messages, sendMessage } = useChat();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachmentPreview({
            type: "image",
            url: e.target.result,
            name: file.name,
            file: file
          });
        };
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview({
          type: "file",
          name: file.name,
          file: file
        });
      }
    }
  };

  const removeAttachment = () => {
    setAttachmentPreview(null);
    fileInputRef.current.value = "";
    imageInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!message && !attachmentPreview) return;

    const success = await sendMessage(message, attachmentPreview?.url);
    
    if (success) {
      setMessage("");
      setAttachmentPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  return (
    <>
    {token ? <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={avatar}
                  alt="Agent"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">WorkHive</h3>
                  <p className="text-sm text-blue-100">Support Agent</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2 ${
                      msg.sender_type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender_type !== 'user' && (
                      <img
                        src={avatar}
                        alt="Agent"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div className={`rounded-lg p-3 max-w-[80%] ${
                      msg.sender_type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <p>{msg.content}</p>
                      {msg.imageUrl && (
                        <img 
                          src={msg.imageUrl} 
                          alt="Message attachment" 
                          className="mt-2 max-w-full rounded"
                        />
                      )}
                    </div>
                    {msg.sender_type === 'user' && (
                      <img
                        src={avatar}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-2">
                  <img
                    src={avatar}
                    alt="Agent"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p>Hi, How can we help you?</p>
                  </div>
                </div>
              )}
            </div>

            {/* Attachment Preview */}
            {attachmentPreview && (
              <div className="px-4 py-2 border-t">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  {attachmentPreview.type === "image" ? (
                    <img
                      src={attachmentPreview.url}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="bg-gray-200 p-2 rounded">
                      <IoAttach size={20} />
                    </div>
                  )}
                  <span className="text-sm truncate flex-1">
                    {attachmentPreview.name}
                  </span>
                  <button
                    onClick={removeAttachment}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSend();
                      }
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="Attach file"
                  >
                    <IoAttach size={20} />
                  </button>
                  <button
                    onClick={() => imageInputRef.current.click()}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="Attach image"
                  >
                    <IoImage size={20} />
                  </button>
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                    disabled={!message && !attachmentPreview}
                  >
                    <IoSend size={20} />
                  </button>
                </div>
              </div>
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <IoMdChatboxes size={24} />
          </button>
        )}
      </div>: null}
    </>
  );
};

export default ChatWidget;
