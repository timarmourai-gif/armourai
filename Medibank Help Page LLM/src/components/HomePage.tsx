import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Plane, Cat, Utensils } from 'lucide-react';
import { FloatingNeuronButton } from './FloatingNeuronButton';

interface HomePageProps {
  onNavigateToHelp: () => void;
  onNavigateToCompare?: () => void;
}

export function HomePage({ onNavigateToHelp, onNavigateToCompare }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E31E24] to-[#C41B21] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-6">
                Squeeze your cover for all it's worth
              </h1>
              <p className="text-lg text-red-100 mb-8">
                Your health cover isn't just for when you're sick – it's there to help you live 
                better, every single day. Here's how to get the most value out of it.
              </p>
              <Button 
                className="bg-white text-[#E31E24] hover:bg-gray-100 px-6 py-3"
                onClick={onNavigateToHelp}
              >
                Get help & support
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1663229049306-33b5cd9c2134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJ0b29uJTIwaWxsdXN0cmF0aW9uJTIwZmFtaWx5fGVufDF8fHx8MTc1NzI4NjUzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy family healthcare concept"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-60">
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
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-12 py-4">
            <button className="flex items-center gap-2 text-[#E31E24] border-b-2 border-[#E31E24] pb-2">
              <Heart className="w-5 h-5" />
              Health
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#E31E24] pb-2">
              <Plane className="w-5 h-5" />
              Travel
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#E31E24] pb-2">
              <Cat className="w-5 h-5" />
              Pet
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#E31E24] pb-2">
              <Utensils className="w-5 h-5" />
              Life
            </button>
          </div>
        </div>
      </div>

      {/* Travel Insurance Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl mb-4">
              Save 15% on award-winning travel insurance.
            </h2>
            <p className="text-gray-600 mb-6">
              You're built to travel. As a health member, you can do more of it with 15% 
              off Medibank Travel Insurance all year around.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#E31E24] hover:bg-[#C41B21] text-white px-6 py-3">
                Get a quick quote
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-400 text-gray-700 hover:bg-gray-50 px-6 py-3"
              >
                Find out more
              </Button>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop&crop=center"
              alt="Travel couple with backpacks"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Compare Insurance Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Compare our hospital covers</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the right cover for you by comparing our hospital insurance plans side by side.
          </p>
          <Button 
            onClick={onNavigateToCompare}
            className="bg-[#E31E24] hover:bg-[#C41B21] text-white px-8 py-3 text-lg"
          >
            Compare insurance
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardContent>
              <h3 className="text-lg mb-2">Basic Plus</h3>
              <p className="text-gray-600 text-sm">Entry-level cover for the young and healthy</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 border-[#E31E24] border-2">
            <CardContent>
              <div className="bg-[#E31E24] text-white px-2 py-1 rounded text-xs mb-2 inline-block">Most Popular</div>
              <h3 className="text-lg mb-2">Bronze Plus</h3>
              <p className="text-gray-600 text-sm">Value-oriented hospital cover</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <h3 className="text-lg mb-2">Bronze Plus Support</h3>
              <p className="text-gray-600 text-sm">Hospital cover with extra support</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Need help with your health cover?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant answers to your questions about your health insurance coverage, claims, and benefits.
          </p>
          <Button 
            onClick={onNavigateToHelp}
            className="bg-[#E31E24] hover:bg-[#C41B21] text-white px-8 py-3 text-lg"
          >
            Get Help & Support
          </Button>
        </div>
      </div>

      <FloatingNeuronButton placeholder="Ask me anything about Medibank..." />
    </div>
  );
}