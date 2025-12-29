import { useState } from 'react';
import { X, MoreHorizontal, Minimize2, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';


interface MessagingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessagingWidget({ isOpen, onClose }: MessagingWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="bg-[#E31E24] text-white p-4 rounded-t-lg flex items-center justify-between">
          <h3 className="text-lg">Message us</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Medibank Logo */}
            <div className="p-4 border-b border-gray-200 bg-white text-center">
              <div className="text-[#E31E24] text-2xl mb-2">
                <span className="text-[#E31E24]">medi</span><span className="text-gray-700">bank</span>
              </div>
            </div>

            {/* Message Area */}
            <div className="p-4 flex-1 bg-gray-50 h-48 overflow-y-auto">
              {/* Welcome Message */}
              <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-sm">
                  I will transfer you to a human agent now
                </p>
              </div>

              {/* Option Buttons */}
              <div className="space-y-2">
                <button className="w-full text-left bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 transition-colors">
                  Existing member
                </button>
                <button className="w-full text-left bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 transition-colors">
                  Looking to join
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-4 h-4" />
                </button>
                <Input 
                  placeholder="Type your message"
                  className="flex-1 border-0 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
                <button className="bg-[#E31E24] hover:bg-[#C51A1F] text-white p-2 rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}