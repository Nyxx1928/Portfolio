import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center border-2 border-manga-black bg-manga-white shadow-manga-sm transition-all duration-150 ease-out',
        'hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-manga-pressed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-manga-sm',
        'data-[state=checked]:bg-manga-black',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 border border-manga-black bg-manga-white transition-transform duration-150 ease-out',
          'data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]',
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = SwitchPrimitive.Root.displayName;
