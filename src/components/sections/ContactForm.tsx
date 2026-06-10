import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      reply_to: formData.get('email'),
      to_name: 'Fahrezi'
    };

    try {
      await emailjs.send(
        'fahrezi_email', 
        'template_w86l3fj', 
        data, 
        'KhbqXgjDEduLsAKJW'
      );
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error('FAILED...', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Name</label>
          <Input 
            id="name"
            name="name"
            required 
            placeholder="John Doe"
            className="bg-muted/30 border-line"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Email</label>
          <Input 
            id="email"
            name="email"
            type="email"
            required 
            placeholder="john@example.com"
            className="bg-muted/30 border-line"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Message</label>
          <Textarea 
            id="message"
            name="message"
            required 
            placeholder="How can I help you?"
            className="bg-muted/30 border-line min-h-[120px] resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {status === 'success' && (
        <p className="text-sm text-green-500 font-medium">Message sent successfully! I'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 font-medium">Failed to send message. Please try again later.</p>
      )}
    </form>
  );
}
