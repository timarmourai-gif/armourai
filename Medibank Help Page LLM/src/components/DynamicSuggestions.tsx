interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function generateSuggestedQuestions(messages: Message[]): string[] {
  // Default questions for initial state
  const defaultQuestions = [
    "What are my waiting periods?",
    "What's my excess?",
    "Am I covered for dental surgery?",
    "What is Accident Cover Boost?"
  ];

  // If only initial message, return defaults
  if (messages.length <= 1) {
    return defaultQuestions;
  }

  // Get the last AI response to determine context
  const lastAIMessage = messages.filter(m => m.type === 'ai').pop();
  if (!lastAIMessage) return defaultQuestions;

  const lastResponse = lastAIMessage.content.toLowerCase();

  // Generate contextual questions based on the last AI response
  let suggestions: string[] = [];

  // Pregnancy/birth related follow-ups
  if (lastResponse.includes('pregnancy') || lastResponse.includes('birth')) {
    suggestions = [
      "What cover includes pregnancy and birth?",
      "How do I upgrade my cover?",
      "What's the waiting period for pregnancy?",
      "Can I get rebates for pregnancy care?"
    ];
  }
  // Accident Cover Boost follow-ups
  else if (lastResponse.includes('accident cover boost') || lastResponse.includes('accident')) {
    suggestions = [
      "How do I claim under Accident Cover Boost?",
      "What counts as an accident?",
      "What if my accident was overseas?",
      "Do I need to pay excess for accidents?"
    ];
  }
  // Waiting periods follow-ups
  else if (lastResponse.includes('waiting period') || lastResponse.includes('12 months') || lastResponse.includes('2 months')) {
    suggestions = [
      "What is a pre-existing condition?",
      "How can I reduce waiting periods?",
      "Can I get cover immediately?",
      "What if I switch from another insurer?"
    ];
  }
  // Excess related follow-ups
  else if (lastResponse.includes('excess') || lastResponse.includes('$250') || lastResponse.includes('$500') || lastResponse.includes('$750')) {
    suggestions = [
      "How do I change my excess?",
      "When do I pay the excess?",
      "Does excess apply to day surgery?",
      "What if I can't afford the excess?"
    ];
  }
  // Excluded services follow-ups
  else if (lastResponse.includes('excluded') && (lastResponse.includes('dental') || lastResponse.includes('cataracts') || lastResponse.includes('joint replacement'))) {
    suggestions = [
      "What cover includes these services?",
      "How much would it cost to upgrade?",
      "Are there any exceptions?",
      "What about public hospital treatment?"
    ];
  }
  // Restricted services follow-ups
  else if (lastResponse.includes('restricted') && (lastResponse.includes('back') || lastResponse.includes('spine') || lastResponse.includes('plastic surgery'))) {
    suggestions = [
      "What are the out-of-pocket costs?",
      "Which hospitals offer better value?",
      "How does Members' Choice help?",
      "Can I get GapCover for this?"
    ];
  }
  // Included services follow-ups
  else if (lastResponse.includes('included service')) {
    suggestions = [
      "Which hospitals can I use?",
      "What is Members' Choice?",
      "Do I need a referral?",
      "Will there be any out-of-pocket costs?"
    ];
  }
  // Heart, cancer, or serious condition follow-ups
  else if (lastResponse.includes('heart') || lastResponse.includes('cancer') || lastResponse.includes('chemotherapy')) {
    suggestions = [
      "What support services are available?",
      "How do I find specialist doctors?",
      "What about rehabilitation cover?",
      "Can I get a second opinion?"
    ];
  }
  // General service inquiries
  else {
    // Look at recent user questions to provide related suggestions
    const recentUserQuestions = messages.filter(m => m.type === 'user').slice(-2);
    const recentTopics = recentUserQuestions.map(m => m.content.toLowerCase()).join(' ');

    if (recentTopics.includes('surgery') || recentTopics.includes('operation')) {
      suggestions = [
        "What is the claims process?",
        "Do I need pre-approval?",
        "What about overnight stays?",
        "How do I find a Members' Choice hospital?"
      ];
    } else if (recentTopics.includes('cost') || recentTopics.includes('pay')) {
      suggestions = [
        "How can I reduce out-of-pocket costs?",
        "What is GapCover?",
        "Are there payment plans available?",
        "What's covered by Medicare?"
      ];
    } else {
      // Provide general Bronze Everyday topics
      suggestions = [
        "What's not covered by Bronze Everyday?",
        "How do I make a claim?",
        "What are Members' Choice hospitals?",
        "How do I contact Medibank?"
      ];
    }
  }

  // Ensure we always have 4 suggestions
  if (suggestions.length < 4) {
    const additionalQuestions = [
      "What's included in my cover?",
      "How do I find a doctor?",
      "What are my member benefits?",
      "How do I update my details?",
      "What about emergency treatment?",
      "Can I suspend my cover?"
    ];
    
    // Add unique questions to reach 4 total
    for (const question of additionalQuestions) {
      if (!suggestions.includes(question) && suggestions.length < 4) {
        suggestions.push(question);
      }
    }
  }

  return suggestions.slice(0, 4);
}