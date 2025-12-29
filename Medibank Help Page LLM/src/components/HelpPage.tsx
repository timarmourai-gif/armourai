import { useState, useEffect } from 'react';
import { ChatInterface } from './ChatInterface';
import { SupportLinks } from './SupportLinks';
import { MessagingWidget } from './MessagingWidget';
import { findRelevantInfo } from './BronzeEverydayKnowledgeBase';

interface HelpPageProps {
  initialQuestion?: string;
}

export function HelpPage({ initialQuestion }: HelpPageProps) {
  const initialMessage = {
    id: 1,
    type: 'ai' as const,
    content: "Hi, how can I help?",
    timestamp: new Date()
  };

  const [messages, setMessages] = useState([
    initialMessage
  ]);
  
  const [showMessagingWidget, setShowMessagingWidget] = useState(false);

  // Handle initial question from dropdown
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Generate AI response based on Bronze Everyday knowledge base
    setTimeout(() => {
      const responseData = findRelevantInfo(content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: responseData.response,
        timestamp: new Date(),
        reference: responseData.reference
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Show messaging widget if AI can't answer the question
      if (responseData.response.includes("I'm unable to answer this question")) {
        setShowMessagingWidget(true);
      }
    }, 1000);
  };

  const handleResetConversation = () => {
    setMessages([{
      ...initialMessage,
      timestamp: new Date()
    }]);
    setShowMessagingWidget(false);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E31E24] to-[#C41B21] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl mb-4">How can we help you today?</h1>
          <p className="text-lg text-red-100 mb-8">Get instant answers to your questions</p>
          
          <ChatInterface 
            messages={messages}
            onSendMessage={handleSendMessage}
            onResetConversation={handleResetConversation}
            onOpenMessaging={() => setShowMessagingWidget(true)}
            isHeroMode={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ChatInterface 
          messages={messages}
          onSendMessage={handleSendMessage}
          onResetConversation={handleResetConversation}
          onOpenMessaging={() => setShowMessagingWidget(true)}
          isHeroMode={false}
        />
        <SupportLinks />
      </div>
      
      <MessagingWidget 
        isOpen={showMessagingWidget}
        onClose={() => setShowMessagingWidget(false)}
      />
    </>
  );
}