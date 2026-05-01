'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Button, FormErrorBoundary } from '@/components/ui';
import { services } from '@/data/services';
import { siteContent } from '@/data/content';
import { useSearchParams } from 'next/navigation';

// Input sanitization utilities
const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove null bytes and control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Encode HTML entities to prevent XSS
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove script tags and javascript: URLs
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    // Remove common XSS vectors
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // Remove data URLs and other potentially dangerous protocols
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/file:/gi, '');
};

const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  
  return email
    .trim()
    .toLowerCase()
    // Remove null bytes and control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove any HTML entities or script content
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    // Remove spaces and normalize
    .replace(/\s+/g, '')
    // Remove any non-email characters
    .replace(/[^\w@.-]/g, '');
};

const sanitizeMessage = (message: string): string => {
  if (!message || typeof message !== 'string') return '';
  
  return message
    .trim()
    // Remove null bytes and control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Encode HTML entities to prevent XSS
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove script tags and javascript: URLs
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    // Remove common XSS vectors
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // Remove links (as per existing validation)
    .replace(/https?:\/\/[^\s]+/gi, '[LINK REMOVED]')
    // Remove data URLs and other potentially dangerous protocols
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/file:/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ');
};

const sanitizeServiceArray = (services: string[]): string[] => {
  if (!Array.isArray(services)) return [];
  
  return services
    .filter(service => typeof service === 'string' && service.trim().length > 0)
    .map(service => sanitizeInput(service.trim()))
    .filter(service => service.length > 0)
    // Remove duplicates
    .filter((service, index, self) => self.indexOf(service) === index);
};

// Rate limiting utilities
const RATE_LIMIT_KEY = 'contact-form-rate-limit';
const RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

const checkRateLimit = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const now = Date.now();
  const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
  
  if (!rateLimitData) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ attempts: 1, firstAttempt: now }));
    return true;
  }
  
  const { attempts, firstAttempt } = JSON.parse(rateLimitData);
  
  // Reset if more than 5 minutes have passed
  if (now - firstAttempt > RATE_LIMIT_DURATION) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ attempts: 1, firstAttempt: now }));
    return true;
  }
  
  // Check if max attempts reached
  if (attempts >= MAX_ATTEMPTS) {
    return false;
  }
  
  // Increment attempts
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ attempts: attempts + 1, firstAttempt }));
  return true;
};

const ContactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods')
    .refine(name => name.trim().length >= 2, 'Name cannot be just spaces')
    .transform(sanitizeInput),
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .refine(email => !email.includes('+'), 'Email addresses with + are not supported')
    .refine(email => email.trim().length > 0, 'Email address is required')
    .transform(sanitizeEmail),
  services: z.array(z.string())
    .min(1, 'Please select at least one service')
    .max(10, 'You can select up to 10 services')
    .refine(services => services.every(service => service.trim().length > 0), 'Invalid service selection')
    .transform(sanitizeServiceArray),
  otherService: z.string()
    .optional()
    .refine(val => !val || val.trim().length <= 200, 'Service description must be less than 200 characters')
    .refine(val => !val || val.trim().length >= 3, 'Service description must be at least 3 characters if provided')
    .transform(val => val ? sanitizeInput(val) : val),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine(msg => msg.trim().length >= 10, 'Message cannot be just spaces')
    .refine(msg => !msg.includes('http://') && !msg.includes('https://'), 'Links are not allowed in messages')
    .refine(msg => !msg.includes('script') && !msg.includes('javascript'), 'Invalid content detected')
    .transform(sanitizeMessage),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

// Skeleton components for individual form elements
const SkeletonField = ({ labelWidth = "w-20", inputHeight = "h-10", helpWidth = "w-48" }: { 
  labelWidth?: string; 
  inputHeight?: string; 
  helpWidth?: string; 
}) => (
  <div className="space-y-2">
    <div className={`h-4 ${labelWidth} bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse`} />
    <div className={`${inputHeight} w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse`} />
    <div className={`h-3 ${helpWidth} bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse`} />
  </div>
);

const SkeletonCheckbox = ({ width = "w-32" }: { width?: string }) => (
  <div className="flex items-center space-x-2">
    <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
    <div className={`h-4 ${width} bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse`} />
  </div>
);

const SkeletonButton = () => (
  <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
);

// Submitting skeleton for when form is being submitted
const SubmittingSkeleton = () => (
  <div className="space-y-6 w-full max-w-lg mx-auto relative" role="status" aria-live="polite">
    {/* Form content with reduced opacity */}
    <div className="opacity-50 pointer-events-none">
      <SkeletonField labelWidth="w-20" helpWidth="w-48" />
      <SkeletonField labelWidth="w-24" helpWidth="w-56" />
      <div className="space-y-2">
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 space-y-2">
          {[...Array(3)].map((_, i) => (
            <SkeletonCheckbox key={i} width="w-32" />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-32 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
      </div>
      <SkeletonButton />
    </div>
    
    {/* Submitting overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 rounded-lg backdrop-blur-sm">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center space-x-2">
          <div className="h-3 w-3 bg-primary rounded-full animate-bounce" />
          <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto animate-pulse" />
        <div className="sr-only">Submitting form...</div>
      </div>
    </div>
  </div>
);

export function ContactFormSkeleton({ isSubmitting = false }: { isSubmitting?: boolean }) {
  const { forms } = siteContent;
  
  if (isSubmitting) {
    return <SubmittingSkeleton />;
  }
  
  return (
    <div 
      className="space-y-6 w-full max-w-lg mx-auto" 
      aria-label={`${forms.contact.title} loading`}
      role="status"
      aria-live="polite"
    >
      {/* Form title skeleton */}
      <div className="text-center mb-8">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto animate-pulse" />
        <div className="h-4 w-64 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto mt-2 animate-pulse" />
      </div>
      
      {/* Name field skeleton */}
      <SkeletonField labelWidth="w-20" helpWidth="w-48" />
      
      {/* Email field skeleton */}
      <SkeletonField labelWidth="w-24" helpWidth="w-56" />
      
      {/* Services fieldset skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 space-y-2">
          {/* Service checkboxes skeleton */}
          {[...Array(6)].map((_, i) => (
            <SkeletonCheckbox key={i} width={i % 2 === 0 ? "w-32" : "w-28"} />
          ))}
        </div>
        <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>
      
      {/* Message field skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-32 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-3 w-52 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>
      
      {/* Submit button skeleton */}
      <SkeletonButton />
      
      {/* Loading indicators */}
      <div className="flex justify-center space-x-2" aria-hidden="true">
        <div className="h-2 w-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce" />
        <div className="h-2 w-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="h-2 w-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      
      {/* Screen reader loading message */}
      <div className="sr-only">Loading contact form...</div>
    </div>
  );
}

// Success component for form submission
const ContactFormSuccess = () => {
  const { forms } = siteContent;
  const contactForm = forms.contact;
  
  return (
    <div 
      className="space-y-8 w-full max-w-lg mx-auto text-center" 
      role="status"
      aria-live="polite"
    >
      {/* Success icon */}
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
        <svg 
          className="w-10 h-10 text-green-600 dark:text-green-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      {/* Success message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Thank You!
        </h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">
          {contactForm.success}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          We&apos;ve received your message and will get back to you within 24-48 hours.
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button 
          onClick={() => window.location.href = '/'}
          className="w-full sm:w-auto"
        >
          Return to Home
        </Button>
        <Button 
          onClick={() => window.location.href = '/services'}
          variant="outline" 
          className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3 border-eggshell text-paynesGray bg-eggshell hover:bg-eggshell hover:text-paynesGray min-h-[44px] touch-target transition-all duration-150 hover:scale-105 rounded-md"
        >
          Explore Our Services
        </Button>
      </div>
      
      {/* Screen reader announcement */}
      <div className="sr-only">
        Form submitted successfully. Thank you for your message.
      </div>
    </div>
  );
};

function ContactFormContent({ isLoading = false, onSuccess }: { isLoading?: boolean; onSuccess?: () => void }) {
  const { forms } = siteContent;
  const contactForm = forms.contact;
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      services: [],
      otherService: '',
    },
  });

  const selectedServices = watch('services');
  const showOtherService = selectedServices.includes('other');

  // Check for success parameter from Netlify redirect
  const isSuccessFromNetlify = searchParams.get('success') === 'true';
  
  // Development-only: Check for test success parameter
  const isTestSuccess = process.env.NODE_ENV === 'development' && searchParams.get('test-success') === 'true';

  // Call onSuccess callback when form is successfully submitted
  useEffect(() => {
    if (submitSuccess && onSuccess && !isSuccessFromNetlify) {
      onSuccess();
    }
  }, [submitSuccess, onSuccess, isSuccessFromNetlify]);

  // Show success message if redirected with success=true or if form was just submitted successfully
  if (isSuccessFromNetlify || submitSuccess || isTestSuccess) {
    return <ContactFormSuccess />;
  }

  // Show skeleton for initial loading or when submitting
  if (isLoading || isSubmitting) {
    return <ContactFormSkeleton isSubmitting={isSubmitting} />;
  }

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setRateLimitError(null);
    
    // Check rate limiting
    if (!checkRateLimit()) {
      console.error('Rate limit exceeded');
      setRateLimitError('Too many submissions. Please try again in an hour.');
      setIsSubmitting(false);
      return;
    }
    
    // Data is already sanitized by Zod schema transforms
    // Create FormData for Netlify with sanitized data
    const formData = new FormData();
    formData.append('form-name', contactForm.netlifyName);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    
    // Add selected services (already sanitized)
    data.services.forEach(service => {
      formData.append('services', service);
    });
    
    if (data.otherService) {
      formData.append('otherService', data.otherService);
    }

    try {
      // Submit directly to Netlify
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        // Show success component immediately instead of redirecting
      } else {
        console.error('Form submission failed:', response.status, response.statusText);
        // Fallback: try traditional form submission
        const form = document.querySelector(`form[name="${contactForm.netlifyName}"]`) as HTMLFormElement;
        if (form) {
          form.submit();
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: try traditional form submission
      const form = document.querySelector(`form[name="${contactForm.netlifyName}"]`) as HTMLFormElement;
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
      className="space-y-6 w-full max-w-lg mx-auto" 
      aria-label={contactForm.title}
      data-netlify="true"
      name={contactForm.netlifyName}
      method="POST"
      action="/"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value={contactForm.netlifyName} />
      
      {/* Honeypot field for spam protection */}
      <div className="hidden">
        <label htmlFor="bot-field">Don&apos;t fill this out if you&apos;re human</label>
        <input id="bot-field" name="bot-field" />
      </div>
      
      {/* Live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isSubmitting && "Form is being submitted"}
        {submitSuccess && "Form submitted successfully"}
        {rateLimitError && `Error: ${rateLimitError}`}
      </div>
      
      {/* Error summary for screen readers */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" aria-live="polite" className="sr-only">
          <h2>Form Errors</h2>
          <ul>
            {errors.name && <li>Name: {errors.name.message}</li>}
            {errors.email && <li>Email: {errors.email.message}</li>}
            {errors.services && <li>Services: {errors.services.message}</li>}
            {errors.otherService && <li>Other Service: {errors.otherService.message}</li>}
            {errors.message && <li>Message: {errors.message.message}</li>}
          </ul>
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="name" className="form-label">{contactForm.fields.name.label}</label>
        <Input 
          id="name" 
          {...register('name')} 
          placeholder={contactForm.fields.name.placeholder}
          maxLength={contactForm.fields.name.maxLength}
          error={errors.name?.message} 
          required 
          aria-invalid={!!errors.name} 
          aria-describedby={[
            contactForm.fields.name.help ? 'name-help' : '',
            errors.name?.message ? 'name-error' : ''
          ].filter(Boolean).join(' ') || undefined}
          className="w-full" 
        />
        {contactForm.fields.name.help && (
          <p id="name-help" className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {contactForm.fields.name.help}
          </p>
        )}
        {errors.name && (
          <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="form-label">{contactForm.fields.email.label}</label>
        <Input 
          id="email" 
          type="email" 
          {...register('email')} 
          placeholder={contactForm.fields.email.placeholder}
          maxLength={contactForm.fields.email.maxLength}
          error={errors.email?.message} 
          required 
          aria-invalid={!!errors.email} 
          aria-describedby={[
            contactForm.fields.email.help ? 'email-help' : '',
            errors.email?.message ? 'email-error' : ''
          ].filter(Boolean).join(' ') || undefined}
          className="w-full" 
        />
        {contactForm.fields.email.help && (
          <p id="email-help" className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {contactForm.fields.email.help}
          </p>
        )}
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      
      <fieldset className="space-y-2">
        <legend className="form-label">{contactForm.fields.services.label}</legend>
        <div 
          className="space-y-2 max-h-48 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 w-full"
          role="group"
          aria-describedby={[
            contactForm.fields.services.help ? 'services-help' : '',
            errors.services?.message ? 'services-error' : ''
          ].filter(Boolean).join(' ') || undefined}
        >
          {services.map((service) => (
            <label key={service.slug} className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded w-full">
              <input
                type="checkbox"
                id={`service-${service.slug}`}
                value={service.slug}
                {...register('services')}
                className="rounded border-neutral-300 dark:border-neutral-600 text-primary focus:ring-primary"
                aria-describedby={`service-${service.slug}-description`}
              />
              <span id={`service-${service.slug}-description`} className="text-sm text-neutral-700 dark:text-neutral-200">
                {service.title}
              </span>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded w-full">
            <input
              type="checkbox"
              id="service-other"
              value="other"
              {...register('services')}
              className="rounded border-neutral-300 dark:border-neutral-600 text-primary focus:ring-primary"
              aria-describedby="service-other-description"
            />
            <span id="service-other-description" className="text-sm text-neutral-700 dark:text-neutral-200">
              {contactForm.fields.services.other}
            </span>
          </label>
        </div>
        {errors.services && (
          <p id="services-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.services.message}
          </p>
        )}
        {contactForm.fields.services.help && (
          <p id="services-help" className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {contactForm.fields.services.help}
          </p>
        )}
      </fieldset>
      
      {showOtherService && (
        <div className="space-y-2">
          <label htmlFor="otherService" className="form-label">{contactForm.fields.services.otherPlaceholder}</label>
          <Input 
            id="otherService" 
            {...register('otherService')} 
            placeholder={contactForm.fields.services.otherPlaceholder}
            maxLength={200}
            error={errors.otherService?.message} 
            aria-invalid={!!errors.otherService} 
            aria-describedby={errors.otherService?.message ? 'otherService-error' : undefined}
            className="w-full"
          />
          {errors.otherService && (
            <p id="otherService-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.otherService.message}
            </p>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="message" className="form-label">{contactForm.fields.message.label}</label>
        <Textarea 
          id="message" 
          {...register('message')} 
          placeholder={contactForm.fields.message.placeholder}
          maxLength={contactForm.fields.message.maxLength}
          error={errors.message?.message} 
          required 
          aria-invalid={!!errors.message} 
          aria-describedby={[
            contactForm.fields.message.help ? 'message-help' : '',
            errors.message?.message ? 'message-error' : ''
          ].filter(Boolean).join(' ') || undefined}
          className="w-full min-h-[120px]" 
        />
        {contactForm.fields.message.help && (
          <p id="message-help" className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {contactForm.fields.message.help}
          </p>
        )}
        {errors.message && (
          <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>
      
      {rateLimitError && (
        <p className="text-red-600 text-sm mt-1" role="alert" aria-live="polite">
          {rateLimitError}
        </p>
      )}
      
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full"
        aria-label={isSubmitting ? 'Submitting form...' : contactForm.buttons.submit.text}
      >
        {isSubmitting ? contactForm.buttons.submit.loading : contactForm.buttons.submit.text}
      </Button>
    </form>
  );
}

export function ContactForm({ isLoading = false, onSuccess }: { isLoading?: boolean; onSuccess?: () => void }) {
  return (
    <FormErrorBoundary>
      <ContactFormContent isLoading={isLoading} onSuccess={onSuccess} />
    </FormErrorBoundary>
  );
} 