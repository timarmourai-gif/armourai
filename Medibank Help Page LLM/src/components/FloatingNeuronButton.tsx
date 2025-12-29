import { useState } from 'react';
import { Button } from './ui/button';
import { NeuronIcon } from './NeuronIcon';
import { ChatInterface } from './ChatInterface';
import { MessagingWidget } from './MessagingWidget';

interface FloatingNeuronButtonProps {
  placeholder?: string;
}

export function FloatingNeuronButton({ placeholder = "Ask me anything about Medibank..." }: FloatingNeuronButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-[#E31E24] hover:bg-[#C91A1F] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
        >
          <NeuronIcon size={56} className="text-white" />
          <span className="font-medium">Ask Medibank Neuron</span>
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-96 h-[500px] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#E31E24] text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                <NeuronIcon size={44} className="text-white" />
              </div>
              <h3 className="font-medium">Ask Medibank Neuron</h3>
            </div>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          <div className="flex-1 p-4">
            <ChatInterface 
              compact={true}
              placeholder={placeholder}
              onOpenMessaging={() => setIsMessagingOpen(true)}
            />
          </div>
        </div>
      )}
      
      {/* Messaging Widget */}
      <MessagingWidget 
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
      />
    </div>
  );
}