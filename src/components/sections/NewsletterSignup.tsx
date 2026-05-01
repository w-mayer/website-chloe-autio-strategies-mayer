'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button } from '@/components/ui';
import { siteContent } from '@/data/content';
import { useSearchParams } from 'next/navigation';
import { useInView } from '@/lib/hooks/useInView';

export function NewsletterSignup() {
  const { forms } = siteContent;
  const newsletterForm = forms.newsletter;
  const searchParams = useSearchParams();
  const [sectionRef, inView] = useInView<HTMLElement>();
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for success parameter from Netlify redirect
  useEffect(() => {
    const isSuccessFromNetlify = searchParams.get('newsletter') === 'success' || searchParams.get('form') === 'success';
    if (isSuccessFromNetlify) {
      setSubmitted(true);
      setError(null);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError(newsletterForm.error);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    // Create FormData for Netlify
    const formData = new FormData();
    formData.append('form-name', newsletterForm.netlifyName);
    formData.append('email', email);

    try {
      // Submit directly to Netlify
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        // Redirect to success page after a short delay
        setTimeout(() => {
          window.location.href = '/?newsletter=success';
        }, 1000);
      } else {
        console.error('Newsletter signup failed:', response.status, response.statusText);
        // Fallback: try traditional form submission
        const form = document.querySelector(`form[name="${newsletterForm.netlifyName}"]`) as HTMLFormElement;
        if (form) {
          form.submit();
        }
      }
    } catch (error) {
      console.error('Error submitting newsletter signup:', error);
      // Fallback: try traditional form submission
      const form = document.querySelector(`form[name="${newsletterForm.netlifyName}"]`) as HTMLFormElement;
      if (form) {
        form.submit();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950"
    >
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold text-primary-700 mb-4 animate-on-scroll fade-up ${inView ? 'is-visible' : ''}`}
        >
          Stay in the Loop
        </h2>
        <p
          className={`text-lg text-neutral-700 dark:text-neutral-200 mb-8 max-w-xl animate-on-scroll fade-up stagger-1 ${inView ? 'is-visible' : ''}`}
        >
          {newsletterForm.description}
        </p>
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md flex flex-col sm:flex-row gap-4 items-center justify-center animate-on-scroll fade-up stagger-2 ${inView ? 'is-visible' : ''}`}
          aria-label={newsletterForm.title}
          data-netlify="true"
          name={newsletterForm.netlifyName}
          method="POST"
          action="/"
        >
          {/* Netlify form detection */}
          <input type="hidden" name="form-name" value={newsletterForm.netlifyName} />
          
          <Input
            type="email"
            name="email"
            placeholder={newsletterForm.placeholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={error || undefined}
            required
            aria-label="Email address"
            className="flex-1"
          />
          <Button type="submit" variant="primary" disabled={isSubmitting} aria-label={newsletterForm.button.text}>
            {isSubmitting ? newsletterForm.button.loading : newsletterForm.button.text}
          </Button>
        </form>
        {submitted && !error && (
          <p
            className="mt-4 text-green-600 dark:text-green-400 font-medium animate-fade-in"
          >
            {newsletterForm.success}
          </p>
        )}
      </div>
    </section>
  );
}
