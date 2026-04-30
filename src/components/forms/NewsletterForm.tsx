'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@/components/ui';
import { siteContent } from '@/data/content';
import { useSearchParams } from 'next/navigation';

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type NewsletterFormValues = z.infer<typeof NewsletterSchema>;

export function NewsletterFormSkeleton() {
  const { forms } = siteContent;
  
  return (
    <form className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md animate-pulse" aria-label={`${forms.newsletter.title} loading`}>
      <div className="h-10 w-full sm:w-2/3 bg-eggshell dark:bg-paynesGray rounded" />
      <div className="h-10 w-32 bg-eggshell dark:bg-paynesGray rounded" />
    </form>
  );
}

export function NewsletterForm({ isLoading = false }: { isLoading?: boolean }) {
  const { forms } = siteContent;
  const newsletterForm = forms.newsletter;
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(NewsletterSchema),
  });
  if (isLoading) return <NewsletterFormSkeleton />;

  // Check for success parameter from Netlify redirect
  const isSuccessFromNetlify = searchParams.get('newsletter') === 'success';

  async function onSubmit(data: NewsletterFormValues) {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Create FormData for Netlify
    const formData = new FormData();
    formData.append('form-name', newsletterForm.netlifyName);
    formData.append('email', data.email);

    try {
      // Submit directly to Netlify
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
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
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md" 
      aria-label={newsletterForm.title}
      data-netlify="true"
      name={newsletterForm.netlifyName}
      method="POST"
      action="/"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value={newsletterForm.netlifyName} />
      
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder={newsletterForm.placeholder}
        {...register('email')}
        error={errors.email?.message}
        required
        aria-label="Email address"
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting} aria-label={newsletterForm.button.text}>
        {isSubmitting ? newsletterForm.button.loading : newsletterForm.button.text}
      </Button>
      {(submitSuccess || isSuccessFromNetlify) && (
        <div className="text-green-600 mt-2 w-full text-center" role="status">{newsletterForm.success}</div>
      )}
    </form>
  );
} 