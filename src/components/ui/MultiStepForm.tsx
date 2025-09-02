import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface Step {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  isValid?: boolean;
  isOptional?: boolean;
}

interface MultiStepFormProps {
  className?: string;
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  showProgress?: boolean;
  allowSkip?: boolean;
  nextButtonText?: string;
  previousButtonText?: string;
  completeButtonText?: string;
  skipButtonText?: string;
}

export function MultiStepForm({
  className,
  steps,
  currentStep: controlledCurrentStep,
  onStepChange,
  onComplete,
  showProgress = true,
  allowSkip = false,
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  completeButtonText = 'Complete',
  skipButtonText = 'Skip',
}: MultiStepFormProps) {
  const [internalCurrentStep, setInternalCurrentStep] = useState(0);

  const currentStep = controlledCurrentStep ?? internalCurrentStep;
  const isControlled = controlledCurrentStep !== undefined;

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleStepChange = (newStep: number) => {
    if (isControlled) {
      onStepChange?.(newStep);
    } else {
      setInternalCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStepData?.isOptional && allowSkip) {
      handleNext();
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      handleStepChange(stepIndex);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Progress Indicator */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isClickable = index <= currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  {/* Step Circle */}
                  <button
                    onClick={() => isClickable && goToStep(index)}
                    disabled={!isClickable}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
                      {
                        'bg-primary-600 text-white': status === 'current',
                        'bg-success-600 text-white': status === 'completed',
                        'bg-neutral-200 text-neutral-500':
                          status === 'upcoming',
                        'cursor-pointer hover:bg-primary-700':
                          isClickable && status !== 'completed',
                        'cursor-not-allowed': !isClickable,
                      }
                    )}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                  >
                    {status === 'completed' ? (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="ml-3 hidden sm:block">
                    <div
                      className={cn('text-sm font-medium', {
                        'text-primary-600': status === 'current',
                        'text-success-600': status === 'completed',
                        'text-neutral-500': status === 'upcoming',
                      })}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="text-xs text-neutral-500">
                        {step.description}
                      </div>
                    )}
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn('ml-4 h-0.5 w-16 transition-colors', {
                        'bg-success-600': index < currentStep,
                        'bg-neutral-200': index >= currentStep,
                      })}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="mt-4 sm:hidden">
            <div className="text-sm font-medium text-neutral-900">
              Step {currentStep + 1} of {steps.length}: {currentStepData?.title}
            </div>
            {currentStepData?.description && (
              <div className="text-xs text-neutral-500 mt-1">
                {currentStepData.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          {currentStepData?.content}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {!isFirstStep && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              {previousButtonText}
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Skip Button */}
          {currentStepData?.isOptional && allowSkip && (
            <Button type="button" variant="ghost" onClick={handleSkip}>
              {skipButtonText}
            </Button>
          )}

          {/* Next/Complete Button */}
          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
            disabled={currentStepData?.isValid === false}
          >
            {isLastStep ? completeButtonText : nextButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook for managing multi-step form state
export function useMultiStepForm(steps: Step[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));
  };

  const markStepIncomplete = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(stepIndex);
      return newSet;
    });
  };

  const isStepCompleted = (stepIndex: number) => {
    return completedSteps.has(stepIndex);
  };

  const reset = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  return {
    currentStep,
    completedSteps,
    goToStep,
    nextStep,
    previousStep,
    markStepComplete,
    markStepIncomplete,
    isStepCompleted,
    reset,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    progress: ((currentStep + 1) / steps.length) * 100,
  };
}
