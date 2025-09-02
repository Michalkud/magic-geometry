import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizOptionsProps {
  options: QuizOption[];
  selectedOption: number | null;
  showResults: boolean;
  onOptionSelect: (index: number) => void;
  disabled?: boolean;
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  options,
  selectedOption,
  showResults,
  onOptionSelect,
  disabled = false
}) => {
  const getButtonVariant = (index: number, option: QuizOption) => {
    if (!showResults) {
      return selectedOption === index ? 'default' : 'outline';
    }
    
    if (option.isCorrect) {
      return 'default'; // Correct answer - always highlighted
    }
    
    if (selectedOption === index && !option.isCorrect) {
      return 'destructive'; // Wrong selection
    }
    
    return 'outline';
  };

  const getButtonClassName = (index: number, option: QuizOption) => {
    let baseClass = 'w-full text-left p-4 h-auto whitespace-normal transition-all';
    
    if (!showResults) {
      baseClass += selectedOption === index 
        ? ' border-amber-400 bg-amber-50 text-amber-900'
        : ' hover:border-amber-300 hover:bg-amber-25';
    } else {
      if (option.isCorrect) {
        baseClass += ' border-green-400 bg-green-50 text-green-900';
      } else if (selectedOption === index) {
        baseClass += ' border-red-400 bg-red-50 text-red-900';
      }
    }
    
    return baseClass;
  };

  return (
    <div className="space-y-3" data-testid="quiz-options">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={getButtonVariant(index, option)}
          className={getButtonClassName(index, option)}
          onClick={() => !disabled && onOptionSelect(index)}
          disabled={disabled}
          data-testid={`quiz-option-${index}`}
        >
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg min-w-[24px]">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="text-sm leading-relaxed">
              {option.text}
            </span>
            {showResults && option.isCorrect && (
              <span className="ml-auto text-green-600 font-bold">✓</span>
            )}
            {showResults && selectedOption === index && !option.isCorrect && (
              <span className="ml-auto text-red-600 font-bold">✗</span>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default QuizOptions;