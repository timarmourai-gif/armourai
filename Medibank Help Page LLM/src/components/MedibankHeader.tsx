import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown, HelpCircle, Store, Shield, Phone, MessageCircle, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MedibankHeaderProps {
  showHeroContent?: boolean;
  onNavigateToHelp?: (question?: string) => void;
  onNavigateToCompare?: () => void;
}

export function MedibankHeader({ showHeroContent = true, onNavigateToHelp, onNavigateToCompare }: MedibankHeaderProps) {
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');
  const helpMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setShowHelpMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleQuickQuestion = () => {
    if (quickQuestion.trim()) {
      onNavigateToHelp?.(quickQuestion.trim());
      setShowHelpMenu(false);
      setQuickQuestion('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickQuestion();
    }
  };
  return (
    <header className="bg-[#E31E24] text-white relative overflow-visible z-50">
      {/* Navigation */}
      <nav className="relative z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-white">
              <svg width="120" height="24" viewBox="0 0 120 24" fill="currentColor">
                <text x="0" y="18" className="text-lg font-bold">medibank</text>
              </svg>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                type="button"
                onClick={onNavigateToCompare}
                className="hover:opacity-80"
              >
                Insurance
              </button>
              <button type="button" className="hover:opacity-80">Health coaching</button>
              <button type="button" className="hover:opacity-80">Health & wellbeing</button>
              <button type="button" className="hover:opacity-80">About Medibank</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Help & Support Dropdown */}
            <div className="relative" ref={helpMenuRef}>
              <button 
                type="button"
                className="flex items-center gap-1 text-sm hover:opacity-80"
                onClick={() => setShowHelpMenu(!showHelpMenu)}
              >
                <HelpCircle className="w-4 h-4" />
                Help & support
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {showHelpMenu && (
                <div className="fixed top-16 right-4 w-80 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-[9999]">
                  {/* Quick Question Section */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#E31E24] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">M</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-3">Hi, how can we help?</p>
                        <div className="relative">
                          <Input
                            value={quickQuestion}
                            onChange={(e) => setQuickQuestion(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask your question..."
                            className="pr-10 border-2 border-[#E31E24] rounded-lg focus:ring-[#E31E24]"
                          />
                          <Button
                            onClick={handleQuickQuestion}
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-[#E31E24] hover:bg-[#C41B21]"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#E31E24] font-medium">More</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Help & Support Section */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Help & support</h3>
                    <div className="space-y-2">
                      <button 
                        type="button"
                        onClick={() => {
                          onNavigateToHelp?.();
                          setShowHelpMenu(false);
                        }}
                        className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-[#E31E24] py-1"
                      >
                        <span className="text-[#E31E24]">›</span>
                        Help & support
                      </button>
                      <button type="button" className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-[#E31E24] py-1">
                        <span className="text-[#E31E24]">›</span>
                        Find a store
                      </button>
                      <button type="button" className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-[#E31E24] py-1">
                        <span className="text-[#E31E24]">›</span>
                        Security & privacy
                      </button>
                    </div>
                  </div>

                  {/* Contact Us Section */}
                  <div className="border-t p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Contact us</h4>
                    <div className="space-y-2">
                      <button className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-[#E31E24] py-1">
                        <span className="text-[#E31E24]">›</span>
                        Contact us
                      </button>
                      <button className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-[#E31E24] py-1">
                        <span className="text-[#E31E24]">›</span>
                        Call us on 134190
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <span className="hidden md:inline text-sm">Find a provider</span>
            <span className="hidden md:inline text-sm">Search</span>
            <span className="hidden md:inline text-sm">Log in</span>
          </div>
        </div>
      </nav>

      {/* Main header content - only show on help page */}
      {showHeroContent && (
        <div className="relative z-10 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl mb-4">
              We're here to help and support you
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Get instant information on your live insurance questions, including how to work to buy 
              the coverage that from there, your health, wellness, pay claim services.
            </p>
          </div>
        </div>
      )}

      {/* Decorative circles - only show on help page */}
      {showHeroContent && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-80">
          <div className="relative w-64 h-64">
            <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-16 right-16 w-12 h-12 bg-green-400 rounded-full"></div>
            <div className="absolute top-8 right-32 w-20 h-20 bg-blue-400 rounded-full"></div>
            <div className="absolute top-24 right-4 w-10 h-10 bg-orange-400 rounded-full"></div>
            <div className="absolute top-32 right-24 w-14 h-14 bg-purple-400 rounded-full"></div>
            <div className="absolute top-4 right-48 w-8 h-8 bg-pink-400 rounded-full"></div>
            <div className="absolute top-40 right-12 w-6 h-6 bg-teal-400 rounded-full"></div>
          </div>
        </div>
      )}
    </header>
  );
}