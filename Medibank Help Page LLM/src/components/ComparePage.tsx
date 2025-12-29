import { useState } from 'react';
import { Check, ChevronDown, ShoppingCart, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { NeuronIcon } from './NeuronIcon';
import { ChatInterface } from './ChatInterface';
import { MessagingWidget } from './MessagingWidget';

export function ComparePage() {
  const [isNeuronExpanded, setIsNeuronExpanded] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [selectedExcess, setSelectedExcess] = useState<{[key: string]: string}>({
    basic: '$750',
    bronze: '$750',
    bronzeSupport: '$750'
  });


  const plans = [
    {
      id: 'basic',
      name: 'Medibank Basic Plus Healthy Extras',
      description: 'Entry-level Hospital cover to support the young and healthy through core acute services.',
      price: '$20.64',
      period: 'week',
      debitPeriod: 'Minimum debit period is fortnightly',
      excess: selectedExcess.basic,
      popular: false
    },
    {
      id: 'bronze',
      name: 'Medibank Bronze Plus Value',
      description: 'Wallet-friendly Hospital cover that can help you feel protected and support your active lifestyle.',
      price: '$21.42',
      period: 'week',
      debitPeriod: 'Minimum debit period is fortnightly',
      excess: selectedExcess.bronze,
      popular: true
    },
    {
      id: 'bronzeSupport',
      name: 'Medibank Bronze Plus Support',
      description: 'Value-seekers\' Hospital cover with services to help support your family\'s health and wellbeing.',
      price: '$23.70',
      period: 'week',
      debitPeriod: 'Minimum debit period is fortnightly',
      excess: selectedExcess.bronzeSupport,
      popular: false
    }
  ];

  const handleExcessChange = (planId: string, value: string) => {
    setSelectedExcess(prev => ({
      ...prev,
      [planId]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-[#E31E24] text-white rounded-full mr-3">
                  <span className="text-sm font-medium">1</span>
                </div>
                <span className="font-medium text-gray-900">Hospital cover</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full mr-3">
                  <span className="text-sm font-medium">2</span>
                </div>
                <span className="text-gray-600">Extras cover</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full mr-3">
                  <span className="text-sm font-medium">3</span>
                </div>
                <span className="text-gray-600">Quote details</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Selection summary
              </Button>
              <Button variant="ghost" className="text-[#E31E24] hover:bg-red-50">
                Skip Hospital cover →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Hospital cover</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Recommended</span>
            </div>
            <Button variant="ghost" className="text-[#E31E24] hover:bg-red-50 p-0">
              Show more covers
            </Button>
          </div>
          <p className="text-gray-600">We found 3 great covers for you.</p>
        </div>

        {/* Ask Medibank Neuron Button */}
        <div className="mb-6 flex justify-center">
          <Button
            onClick={() => setIsNeuronExpanded(!isNeuronExpanded)}
            className="bg-[#E31E24] hover:bg-[#C91A1F] text-white px-6 py-3 rounded-lg flex items-center gap-3 font-medium"
          >
            <NeuronIcon size={64} className="text-white" />
            Ask Medibank Neuron
          </Button>
        </div>

        {/* Collapsible Chat Interface */}
        {isNeuronExpanded && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-3 bg-gray-25 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#E31E24] rounded-full">
                      <NeuronIcon size={48} className="text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">Ask Medibank Neuron</h3>
                  </div>
                  <Button
                    onClick={() => setIsNeuronExpanded(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-7 w-7 p-0 text-lg"
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <ChatInterface 
                  compact={true}
                  placeholder="Ask about the insurance plans below..."
                  onOpenMessaging={() => setIsMessagingOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#E31E24] text-white px-3 py-1 rounded text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-sm text-gray-600">From</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}*</span>
                  <Select defaultValue={plan.period}>
                    <SelectTrigger className="w-20 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">week</SelectItem>
                      <SelectItem value="month">month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500 mb-4">{plan.debitPeriod}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-700">Excess</span>
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                </div>
                <Select 
                  value={plan.excess} 
                  onValueChange={(value) => handleExcessChange(plan.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$500">$500</SelectItem>
                    <SelectItem value="$750">$750</SelectItem>
                    <SelectItem value="$1000">$1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-[#E31E24] hover:bg-[#C41B21] text-white">
                Select
              </Button>
            </div>
          ))}
        </div>

        {/* Simplified Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Compare key features</h2>
            
            {/* Simple comparison grid */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 text-sm font-medium text-gray-900">Feature</th>
                    <th className="text-center py-4 text-sm font-medium text-gray-900">Basic Plus</th>
                    <th className="text-center py-4 text-sm font-medium text-gray-900">Bronze Plus Value</th>
                    <th className="text-center py-4 text-sm font-medium text-gray-900">Bronze Plus Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Ambulance services</td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Accident Cover Boost</td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Brain and nervous system</td>
                    <td className="py-3 text-center">
                      <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-sm">Excluded</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Eye (not cataracts)</td>
                    <td className="py-3 text-center">
                      <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-sm">Excluded</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Bone, joint and muscle</td>
                    <td className="py-3 text-center">
                      <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-sm">Excluded</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded text-sm">Restricted</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">Joint reconstructions</td>
                    <td className="py-3 text-center">
                      <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-sm">Excluded</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded text-sm">Restricted</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-sm">Included</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-6 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-100 border border-green-200 rounded"></span>
                  <span><strong>Included:</strong> We'll pay benefits towards these services</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></span>
                  <span><strong>Restricted:</strong> We pay minimum benefit set by the Government</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-100 border border-red-200 rounded"></span>
                  <span><strong>Excluded:</strong> No benefits paid (except under Accident Cover Boost)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 mb-4">
          <p>*Prices are based on <strong>Singles cover</strong> in NSW. I am <strong>26 years old</strong>. I have a <strong>Single income</strong> of <strong>Up to $101,000</strong> per year (24.288% Australian Government Rebate).</p>
          <p className="mt-1">Assumes no Lifetime Health Cover Loading.</p>
        </div>

        {/* Additional Info */}
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" className="text-[#E31E24] hover:bg-red-50 p-0 text-sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Edit my details
          </Button>
        </div>
      </div>

      {/* Messaging Widget */}
      <MessagingWidget 
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
      />
    </div>
  );
}