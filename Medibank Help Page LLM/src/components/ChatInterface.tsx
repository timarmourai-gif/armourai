import { useState, useEffect, useRef } from 'react';
import { Send, User, RotateCcw, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { generateSuggestedQuestions } from './DynamicSuggestions';
import { NeuronIcon } from './NeuronIcon';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isWelcome?: boolean;
  reference?: {
    title: string;
    section: string;
    details: string[];
  };
}

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (content: string) => void;
  onResetConversation?: () => void;
  onOpenMessaging?: () => void;
  isHeroMode?: boolean;
  compact?: boolean;
  placeholder?: string;
}

export function ChatInterface({ 
  messages = [], 
  onSendMessage = () => {}, 
  onResetConversation = () => {}, 
  onOpenMessaging = () => {},
  isHeroMode = false,
  compact = false,
  placeholder = "Ask a question"
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [compactMessages, setCompactMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize compact messages with welcome message
  useEffect(() => {
    if (compact && compactMessages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        type: 'ai',
        content: `Hi! I'm Medibank Neuron, your AI assistant for health insurance questions.

I can help you with:
• Coverage details and plan benefits
• Treatment and waiting periods
• Plan comparisons and pricing
• General insurance information

Ask me anything about our health insurance plans!`,
        timestamp: new Date(),
        isWelcome: true
      };
      setCompactMessages([welcomeMessage]);
    }
  }, [compact, compactMessages.length]);

  // Auto-scroll to bottom when new messages are added or thinking state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, compactMessages, isThinking]);

  // Generate dynamic suggestions based on conversation context
  const suggestedQuestions = generateSuggestedQuestions(compact ? compactMessages : messages);

  // Enhanced AI responses for product coverage questions
  const getMockResponse = (question: string): { response: string; shouldOpenMessaging: boolean } => {
    const lowerQuestion = question.toLowerCase();
    
    // Sign-up related questions
    if (lowerQuestion.includes('sign up') || lowerQuestion.includes('signup') || lowerQuestion.includes('join') || lowerQuestion.includes('enroll') || lowerQuestion.includes('apply') || lowerQuestion.includes('purchase') || lowerQuestion.includes('buy')) {
      return {
        response: "To sign up for a plan, simply press the 'Select' button under the product you want and follow the prompts. The process is quick and easy! If you get stuck at any point, you can always contact an agent through messaging.",
        shouldOpenMessaging: false
      };
    }
    
    // Coverage-specific questions
    if (lowerQuestion.includes('knee surgery') || lowerQuestion.includes('knee replacement') || lowerQuestion.includes('orthopedic')) {
      return {
        response: "Knee surgery and knee replacement are typically covered under our Bronze Plus plans. Both Bronze Plus Value ($21.42/week) and Bronze Plus Support ($23.70/week) include orthopedic procedures as part of their hospital coverage. The Basic Plus plan ($20.64/week) covers emergency orthopedic treatment but may have limitations on elective procedures. All plans require meeting your chosen excess amount.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('gestational diabetes') || lowerQuestion.includes('pregnancy') || lowerQuestion.includes('maternity')) {
      return {
        response: "Gestational diabetes and pregnancy-related care are covered under all our hospital plans after the 12-month waiting period. The Bronze Plus Support ($23.70/week) offers the most comprehensive maternity coverage including additional wellness services for expectant mothers. Bronze Plus Value ($21.42/week) covers standard pregnancy and birth services, while Basic Plus ($20.64/week) covers essential maternity care.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('heart surgery') || lowerQuestion.includes('cardiac') || lowerQuestion.includes('heart condition')) {
      return {
        response: "Heart surgery and cardiac procedures are covered under all our plans for emergencies. For planned cardiac procedures, Bronze Plus Value ($21.42/week) and Bronze Plus Support ($23.70/week) provide comprehensive coverage. Basic Plus ($20.64/week) covers emergency cardiac care but may have waiting periods for elective procedures.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('cancer') || lowerQuestion.includes('oncology') || lowerQuestion.includes('chemotherapy')) {
      return {
        response: "Cancer treatment including chemotherapy, radiation therapy, and oncology services are covered under all our hospital plans. Bronze Plus Support ($23.70/week) offers the most comprehensive cancer support services, while Bronze Plus Value ($21.42/week) covers standard cancer treatments. Basic Plus ($20.64/week) provides essential cancer care coverage.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('mental health') || lowerQuestion.includes('psychiatric') || lowerQuestion.includes('psychology')) {
      return {
        response: "Mental health services vary by plan. Bronze Plus Support ($23.70/week) includes comprehensive mental health support and psychiatric services. Bronze Plus Value ($21.42/week) covers essential mental health treatments. Basic Plus ($20.64/week) covers emergency psychiatric care but has limited coverage for ongoing treatments.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('emergency') || lowerQuestion.includes('accident') || lowerQuestion.includes('ambulance')) {
      return {
        response: "Emergency treatment and accident coverage are included in all our plans. All plans cover emergency room visits, accident-related treatments, and emergency ambulance services. The main difference is in rehabilitation and follow-up care - higher tier plans offer more comprehensive post-emergency support.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('dental') || lowerQuestion.includes('teeth')) {
      return {
        response: "Hospital dental coverage is limited to emergency dental treatment requiring hospitalization. For comprehensive dental care, you would need to add extras cover. Emergency dental procedures requiring hospital admission are covered under all our hospital plans.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('eye surgery') || lowerQuestion.includes('cataract') || lowerQuestion.includes('vision')) {
      return {
        response: "Eye surgery including cataract surgery is covered under Bronze Plus plans. Bronze Plus Value ($21.42/week) and Bronze Plus Support ($23.70/week) include comprehensive ophthalmology services. Basic Plus ($20.64/week) covers emergency eye treatments but may have limitations on elective procedures.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('physiotherapy') || lowerQuestion.includes('rehabilitation')) {
      return {
        response: "Physiotherapy coverage depends on whether it's part of hospital treatment. In-hospital rehabilitation is covered by all plans. Bronze Plus Support ($23.70/week) offers the most comprehensive rehabilitation services, including extended physiotherapy programs as part of recovery care.",
        shouldOpenMessaging: false
      };
    }
    
    // Plan-specific questions
    if (lowerQuestion.includes('bronze plus value') || (lowerQuestion.includes('bronze') && lowerQuestion.includes('value'))) {
      return {
        response: "Bronze Plus Value ($21.42/week) is our most popular plan, offering wallet-friendly hospital cover for active lifestyles. It includes coverage for planned surgeries, emergency treatment, orthopedic procedures, maternity care, and cancer treatment. It covers most common procedures with a choice of $500, $750, or $1000 excess.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('bronze plus support') || (lowerQuestion.includes('bronze') && lowerQuestion.includes('support'))) {
      return {
        response: "Bronze Plus Support ($23.70/week) is designed for families seeking comprehensive health and wellbeing support. It includes everything in Bronze Plus Value plus enhanced mental health services, extended rehabilitation programs, comprehensive maternity support, and additional wellness services for family health.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('basic') || lowerQuestion.includes('basic plus')) {
      return {
        response: "Basic Plus ($20.64/week) is our entry-level hospital cover for young and healthy individuals. It covers core acute services, emergency treatment, accident care, and essential procedures. It's ideal for those seeking affordable protection against unexpected health events but has some limitations on elective procedures.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('bronze') && !lowerQuestion.includes('value') && !lowerQuestion.includes('support')) {
      return {
        response: "Our Bronze Plus plans offer great value for money. Bronze Plus Value at $21.42/week includes hospital cover for accidents, emergencies, and planned treatments. Bronze Plus Support at $23.70/week adds extra services for family health and wellbeing. Both plans have flexible excess options from $500-$1000.",
        shouldOpenMessaging: false
      };
    }
    
    // General questions
    if (lowerQuestion.includes('excess')) {
      return {
        response: "An excess is the amount you pay towards your hospital treatment before your insurance cover kicks in. You can choose from $500, $750, or $1000 excess options. Higher excess means lower weekly premiums. This applies per admission, not per year.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('difference') || lowerQuestion.includes('compare')) {
      return {
        response: "The main differences are coverage levels and services: Basic Plus ($20.64/week) covers essential services, Bronze Plus Value ($21.42/week) adds comprehensive planned treatments and active lifestyle support, and Bronze Plus Support ($23.70/week) includes family wellness services and enhanced mental health support.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('waiting period') || lowerQuestion.includes('wait')) {
      return {
        response: "Waiting periods vary by treatment: Pre-existing conditions (12 months), Pregnancy and birth (12 months), Psychiatric treatment (2 months), General treatment (2 months), Emergency treatment (No waiting period). Existing health conditions may have longer waiting periods.",
        shouldOpenMessaging: false
      };
    }
    
    if (lowerQuestion.includes('cover') && (lowerQuestion.includes('what') || lowerQuestion.includes('does'))) {
      return {
        response: "All our plans cover emergency treatment, accidents, and ambulance services. Bronze Plus plans add comprehensive planned procedures, while Bronze Plus Support includes family wellness services. Coverage includes surgery, specialist consultations, hospital accommodation, and theatre fees.",
        shouldOpenMessaging: false
      };
    }
    
    // Basic plan-related questions that we can answer
    if (lowerQuestion.includes('plan') || lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('weekly')) {
      return {
        response: "I'd be happy to help you with information about our hospital cover plans. Each plan offers different levels of coverage - from our Basic Plus for essential coverage to our Bronze Plus options for more comprehensive protection. What specific treatment or service would you like to know about?",
        shouldOpenMessaging: false
      };
    }
    
    // For questions we can't answer - trigger messaging
    return {
      response: "I'm unable to answer this question. I suggest starting a conversation with a human agent.",
      shouldOpenMessaging: true
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isThinking) {
      if (compact) {
        // Handle compact mode messages locally
        const userMessage: Message = {
          id: Date.now(),
          type: 'user',
          content: inputValue.trim(),
          timestamp: new Date()
        };
        
        // Add user message immediately
        setCompactMessages(prev => [...prev, userMessage]);
        
        // Start thinking animation
        setIsThinking(true);
        
        // Prepare AI response data
        const aiResponseData = getMockResponse(inputValue.trim());
        
        // Show thinking animation for 2-3 seconds (random between 2000-3000ms)
        const thinkingDelay = 2000 + Math.random() * 1000;
        
        setTimeout(() => {
          const aiResponse: Message = {
            id: Date.now() + 1,
            type: 'ai',
            content: aiResponseData.response,
            timestamp: new Date()
          };
          
          setCompactMessages(prev => [...prev, aiResponse]);
          setIsThinking(false);
          
          // Open messaging widget if AI can't answer
          if (aiResponseData.shouldOpenMessaging) {
            setTimeout(() => onOpenMessaging(), 1000);
          }
        }, thinkingDelay);
        
      } else {
        onSendMessage(inputValue.trim());
      }
      setInputValue('');
    }
  };

  // Filter out the initial greeting for display
  const currentMessages = compact ? compactMessages : messages;
  const displayMessages = currentMessages.filter(msg => msg.content !== "Hi, how can I help?");
  
  // Compact mode - simplified chat interface
  if (compact) {
    return (
      <div className="h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {displayMessages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Ask me anything about our insurance plans!</p>
            </div>
          ) : (
            <>
              {displayMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-[#E31E24] text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.type === 'ai' && (
                      <p className={`text-xs mt-2 ${
                        message.isWelcome 
                          ? 'text-orange-600 bg-orange-50 p-2 rounded border-l-2 border-orange-300' 
                          : 'text-gray-500'
                      }`}>
                        {message.isWelcome 
                          ? '⚠️ Important: AI responses are for guidance only and may not always be accurate. Please verify information'
                          : 'AI responses are for guidance only and may not always be accurate. Please verify information'
                        }
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Thinking Animation */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-900">
                    <div className="flex items-center gap-2">
                      <NeuronIcon size={24} />
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-600">Medibank Neuron is thinking</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-[#E31E24] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 bg-[#E31E24] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 bg-[#E31E24] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isThinking ? "Medibank Neuron is thinking..." : placeholder}
            className="flex-1 text-sm"
            disabled={isThinking}
          />
          <Button
            type="submit"
            size="sm"
            className="bg-[#E31E24] hover:bg-[#C41B21] text-white"
            disabled={!inputValue.trim() || isThinking}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    );
  }
  
  if (isHeroMode) {
    // Hero section - only show search input and suggestions
    return (
      <div className="space-y-6">
        {/* Search input */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question"
              className="w-full h-14 pl-6 pr-16 text-lg text-gray-900 bg-white/95 backdrop-blur border-0 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-gray-500"
            />
            <Button
              type="submit"
              className="absolute right-2 top-2 h-10 w-10 bg-[#E31E24] hover:bg-[#C51A1F] text-white rounded-full p-0 shadow-lg"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Quick questions */}
        <div className="flex flex-wrap gap-3 justify-center">
          {suggestedQuestions.slice(0, 4).map((question, index) => (
            <button 
              key={index}
              onClick={() => onSendMessage(question)}
              className="px-4 py-2 bg-white/20 backdrop-blur border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-200 text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Main content area - show conversation history if there are messages beyond greeting
  if (displayMessages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Conversation header with reset */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">Your Questions & Answers</h2>
        <Button
          onClick={onResetConversation}
          variant="outline"
          size="sm"
          className="text-[#E31E24] border-[#E31E24] hover:bg-[#E31E24] hover:text-white"
          title="Start new conversation"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Question
        </Button>
      </div>

      {/* Q&A Format */}
      <div className="space-y-8">
        {(() => {
          const qaPairs = [];
          for (let i = 0; i < displayMessages.length; i += 2) {
            const userMsg = displayMessages[i];
            const aiMsg = displayMessages[i + 1];
            if (userMsg && userMsg.type === 'user') {
              qaPairs.push({ user: userMsg, ai: aiMsg });
            }
          }
          return qaPairs;
        })().map((pair, index) => (
          <div key={pair.user.id} className="space-y-4">
            {/* User Question */}
            <div className="border-l-4 border-[#E31E24] pl-6">
              <h3 className="text-lg text-gray-900 mb-1">{pair.user.content}</h3>
              <p className="text-sm text-gray-500">
                Asked {pair.user.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* AI Answer */}
            {pair.ai && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-[#E31E24] text-white rounded-full flex items-center justify-center">
                    <NeuronIcon size={56} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-[#E31E24] mb-1">Medibank Neuron</h4>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-gray-900">{pair.ai.content}</p>
                    </div>
                  </div>
                </div>
                
                {/* Reference and timestamp */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      Answered {pair.ai.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      AI-generated answers may contain errors. Always verify info
                    </span>
                  </div>
                  {pair.ai.reference && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex items-center gap-1 text-sm text-[#E31E24] hover:text-[#B91C22] transition-colors">
                          <FileText className="w-4 h-4" />
                          View Source
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-[#E31E24]">{pair.ai.reference.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm text-gray-600 mb-1">Source Section:</h4>
                            <p className="text-sm">{pair.ai.reference.section}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-gray-600 mb-2">Supporting Details:</h4>
                            <ul className="space-y-1">
                              {pair.ai.reference.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="text-sm text-gray-700 flex items-start">
                                  <span className="text-[#E31E24] mr-2">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ask another question */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg text-gray-900 mb-4">Ask another question</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What else would you like to know?"
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-[#E31E24]"
            />
            <Button
              type="submit"
              className="bg-[#E31E24] hover:bg-[#C51A1F] text-white px-6 rounded-lg"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Ask
            </Button>
          </div>
        </form>
        
        {/* Suggested questions */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-3">Or try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button 
                key={index}
                onClick={() => onSendMessage(question)}
                className="text-sm bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24] transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}