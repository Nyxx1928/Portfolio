import { SpeechBubble } from './SpeechBubble';

/**
 * SpeechBubble Component Examples
 * 
 * This file demonstrates various usage patterns for the SpeechBubble component.
 */

export function SpeechBubbleExamples() {
  return (
    <div className="p-8 space-y-12 bg-manga-gray-50">
      {/* Speech Variant Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Speech Variant</h2>
        
        <div className="space-y-4">
          <div className="flex justify-start">
            <SpeechBubble variant="speech" tailDirection="bottom-left">
              Hello! This is a standard speech bubble.
            </SpeechBubble>
          </div>
          
          <div className="flex justify-end">
            <SpeechBubble variant="speech" tailDirection="bottom-right">
              And this one has the tail on the right side!
            </SpeechBubble>
          </div>
          
          <div className="flex justify-start">
            <SpeechBubble variant="speech" tailDirection="top-left">
              This bubble has the tail pointing upward from the left.
            </SpeechBubble>
          </div>
          
          <div className="flex justify-end">
            <SpeechBubble variant="speech" tailDirection="top-right">
              And this one points up from the right!
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* Thought Variant Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Thought Variant</h2>
        
        <div className="space-y-4">
          <div className="flex justify-start">
            <SpeechBubble variant="thought" tailDirection="bottom-left">
              Hmm... I wonder what's for lunch today?
            </SpeechBubble>
          </div>
          
          <div className="flex justify-end">
            <SpeechBubble variant="thought" tailDirection="bottom-right">
              This is what thinking looks like in manga!
            </SpeechBubble>
          </div>
          
          <div className="flex justify-start">
            <SpeechBubble variant="thought" tailDirection="top-left">
              Thoughts can also point upward...
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* Shout Variant Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Shout Variant</h2>
        
        <div className="space-y-4">
          <div className="flex justify-start">
            <SpeechBubble variant="shout" tailDirection="bottom-left">
              WATCH OUT!
            </SpeechBubble>
          </div>
          
          <div className="flex justify-end">
            <SpeechBubble variant="shout" tailDirection="bottom-right">
              THIS IS IMPORTANT!
            </SpeechBubble>
          </div>
          
          <div className="flex justify-center">
            <SpeechBubble variant="shout" tailDirection="top-left">
              BOOM! POW! WHOOSH!
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* Multi-line Content Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Multi-line Content</h2>
        
        <div className="space-y-4">
          <div className="flex justify-start max-w-md">
            <SpeechBubble variant="speech" tailDirection="bottom-left">
              Speech bubbles can contain longer text that spans multiple lines.
              The component automatically handles text wrapping and maintains
              proper spacing for readability.
            </SpeechBubble>
          </div>
          
          <div className="flex justify-end max-w-md">
            <SpeechBubble variant="thought" tailDirection="bottom-right">
              Even thought bubbles work great with longer content. The rounded
              shape and dashed border make it clear this is internal dialogue.
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* Custom Styling Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Custom Styling</h2>
        
        <div className="space-y-4">
          <div className="flex justify-start">
            <SpeechBubble 
              variant="speech" 
              tailDirection="bottom-left"
              className="max-w-xs"
            >
              You can add custom classes to control width and other properties.
            </SpeechBubble>
          </div>
          
          <div className="flex justify-center">
            <SpeechBubble 
              variant="shout" 
              tailDirection="bottom-left"
              className="text-center font-bold"
            >
              CENTERED AND BOLD!
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* Contact Page Use Case */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading">Contact Page Example</h2>
        
        <div className="flex justify-start max-w-lg">
          <SpeechBubble variant="speech" tailDirection="bottom-left">
            I'm currently available for freelance work and new opportunities!
            Feel free to reach out via email or connect with me on social media.
            I typically respond within 24 hours.
          </SpeechBubble>
        </div>
      </section>
    </div>
  );
}

export default SpeechBubbleExamples;
