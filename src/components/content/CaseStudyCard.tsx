'use client';
import React from 'react';
import { useInView } from '@/lib/hooks/useInView';
import Link from 'next/link';
import type { CaseStudy as CaseStudyType } from '@/data/resources';
import { siteContent } from '@/data/content';

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-ashGray bg-eggshell p-6 shadow-soft animate-pulse">
      <div className="h-6 w-2/3 bg-eggshell dark:bg-paynesGray rounded mb-2" />
      <div className="h-4 w-full bg-eggshell dark:bg-paynesGray rounded mb-4" />
      <div className="h-4 w-24 bg-eggshell dark:bg-paynesGray rounded mt-4" />
    </div>
  );
}

interface CaseStudyCardProps {
  caseStudy?: CaseStudyType;
  isLoading?: boolean;
}

function CaseStudyCardInner({ caseStudy }: { caseStudy: CaseStudyType }) {
  const [ref, inView] = useInView<HTMLElement>();
  const { ui } = siteContent;
  
  return (
    <article
      ref={ref}
      className={`rounded-lg border border-ashGray bg-eggshell p-6 shadow-soft flex flex-col h-full transition-all duration-200 animate-on-scroll fade-up ${inView ? 'is-visible' : ''}`}
    >
      <div className="mb-2 text-xs text-primary-700">{new Date(caseStudy.date).toLocaleDateString()}</div>
      <h3 className="text-lg font-semibold text-primary mb-2 heading">{caseStudy.title}</h3>
      <p className="text-gray mb-4 flex-1 body-text">{caseStudy.summary}</p>
      <div className="mb-2">
        <span className="text-sm text-gray dark:text-paynesGray">{caseStudy.organization}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {caseStudy.tags.map(tag => (
          <span key={tag} className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4">
        {caseStudy.externalUrl ? (
          <a
            href={caseStudy.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors inline-flex items-center gap-1 underline"
          >
            {ui.buttons.readMore}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <Link
            href={`/resources/${caseStudy.slug}`}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors underline"
          >
            {ui.buttons.readMore}
          </Link>
        )}
      </div>
    </article>
  );
}

export function CaseStudyCard({ caseStudy, isLoading }: CaseStudyCardProps) {
  if (isLoading || !caseStudy) return <CardSkeleton />;
  return <CaseStudyCardInner caseStudy={caseStudy} />;
}
