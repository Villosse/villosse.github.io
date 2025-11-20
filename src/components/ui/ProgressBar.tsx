import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 10,
  className,
  showValue = true,
  color = 'bg-primary'
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 bg-muted/50 rounded-full h-2.5 overflow-hidden border border-border/20">
        <div
          className={cn('h-full transition-all duration-500 ease-out progress-bar-fill rounded-full', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-muted-foreground min-w-[2rem] text-right font-mono">
          {value}/{max}
        </span>
      )}
    </div>
  );
};