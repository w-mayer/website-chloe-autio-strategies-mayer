'use client';
import React from 'react';
import { useInView } from '@/lib/hooks/useInView';
import Link from 'next/link';
import type { Article, PolicyBrief, CaseStudy, Resource as ResourceType } from '@/data/resources';
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

// Type guards
function isResourceType(resource: Article | PolicyBrief | CaseStudy | ResourceType): resource is ResourceType {
  return 'url' in resource && 'description' in resource && 'type' in resource;
}

function isCaseStudy(resource: Article | PolicyBrief | CaseStudy | ResourceType): resource is CaseStudy {
  return 'organization' in resource && !('url' in resource);
}

interface ResourceCardProps {
  resource?: Article | PolicyBrief | CaseStudy | ResourceType;
  isLoading?: boolean;
}

function ResourceCardInner({ resource }: { resource: Article | PolicyBrief | CaseStudy | ResourceType }) {
  const [ref, inView] = useInView<HTMLElement>();
  const { ui } = siteContent;
  
  // Helper function to get the appropriate link
  const getResourceLink = () => {
    if (isResourceType(resource)) {
      const isExternalUrl = resource.url.startsWith('http');
      if (isExternalUrl) {
        return {
          href: resource.url,
          isExternal: true,
          label: ui.buttons.readMore
        };
      } else {
        return {
          href: resource.url,
          isExternal: false,
          label: ui.buttons.readMore
        };
      }
    } else {
      // For articles, policy briefs, and case studies
      if ('externalUrl' in resource && resource.externalUrl) {
        return {
          href: resource.externalUrl,
          isExternal: true,
          label: ui.buttons.readMore
        };
      } else {
        return {
          href: `/resources/${resource.slug}`,
          isExternal: false,
          label: ui.buttons.readMore
        };
      }
    }
  };

  // Helper function to get the subtitle (author, organization, or type)
  const getSubtitle = () => {
    if (isCaseStudy(resource)) {
      return resource.organization;
    } else if (isResourceType(resource)) {
      return resource.type.toUpperCase();
    } else {
      return resource.author.name;
    }
  };

  // Helper function to get the date
  const getDate = () => {
    if (isResourceType(resource)) {
      return null; // Resources don't have dates
    }
    return new Date(resource.date).toLocaleDateString();
  };

  const linkInfo = getResourceLink();
  const subtitle = getSubtitle();
  const date = getDate();
  
  return (
    <article
      ref={ref}
      className={`rounded-lg border border-ashGray bg-eggshell p-6 shadow-soft flex flex-col h-full transition-all duration-200 animate-on-scroll fade-up ${inView ? 'is-visible' : ''}`}
    >
      {/* Date (if available) */}
      {date && (
        <div className="mb-2 text-xs text-primary-700">{date}</div>
      )}
      
      {/* Type badge for resources */}
      {isResourceType(resource) && (
        <div className="mb-2">
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium uppercase">
            {resource.type}
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-primary mb-2 heading">{resource.title}</h3>
      
      {/* Summary/Description */}
      <p className="text-gray mb-4 flex-1 body-text">
        {isResourceType(resource) ? resource.description : resource.summary}
      </p>
      
      {/* Subtitle (Author/Organization/Type) */}
      <div className="mb-2">
        <span className="text-sm text-gray dark:text-paynesGray">{subtitle}</span>
      </div>
      
      {/* Tags */}
      {!isResourceType(resource) && resource.tags && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {resource.tags.map(tag => (
            <span key={tag} className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Link */}
      <div className="mt-4">
        {linkInfo.isExternal ? (
          <a
            href={linkInfo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors inline-flex items-center gap-1 underline"
          >
            {linkInfo.label}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <Link
            href={linkInfo.href}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors underline"
          >
            {linkInfo.label}
          </Link>
        )}
      </div>
    </article>
  );
}

export function ResourceCard({ resource, isLoading }: ResourceCardProps) {
  if (isLoading || !resource) return <CardSkeleton />;
  return <ResourceCardInner resource={resource} />;
}
