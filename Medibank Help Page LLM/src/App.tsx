import { useState } from 'react';
import { MedibankHeader } from './components/MedibankHeader';
import { HomePage } from './components/HomePage';
import { HelpPage } from './components/HelpPage';
import { ComparePage } from './components/ComparePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'help' | 'compare'>('home');
  const [initialQuestion, setInitialQuestion] = useState<string>('');

  const navigateToHelp = (question?: string) => {
    setCurrentPage('help');
    if (question) {
      setInitialQuestion(question);
    }
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setInitialQuestion('');
  };

  const navigateToCompare = () => {
    setCurrentPage('compare');
    setInitialQuestion('');
  };

  return (
    <div className="min-h-screen bg-white">
      <MedibankHeader 
        showHeroContent={currentPage === 'help'}
        onNavigateToHelp={navigateToHelp}
        onNavigateToCompare={navigateToCompare}
      />
      
      {currentPage === 'home' && <HomePage onNavigateToHelp={navigateToHelp} onNavigateToCompare={navigateToCompare} />}
      {currentPage === 'help' && <HelpPage initialQuestion={initialQuestion} />}
      {currentPage === 'compare' && <ComparePage />}
    </div>
  );
}