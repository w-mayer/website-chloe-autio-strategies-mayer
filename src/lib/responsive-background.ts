import type { CSSProperties } from 'react';

type VariantKey = 'small' | 'medium' | 'large';

export type ResponsiveBackgroundVariants = Partial<Record<VariantKey, string>>;

export type ResponsiveBackgroundStyle = CSSProperties &
  Record<'--bg-small' | '--bg-medium' | '--bg-large', string>;

const VARIANT_ORDER: VariantKey[] = ['large', 'medium', 'small'];

function ensureUrl(value: string) {
  return value.startsWith('url(') ? value : `url('${value}')`;
}

export function getResponsiveBackgroundStyle(
  image: string,
  variants?: ResponsiveBackgroundVariants
): ResponsiveBackgroundStyle {
  const fallback =
    variants?.large || variants?.medium || variants?.small || image;

  const resolvedLarge = variants?.large || fallback;
  const resolvedMedium = variants?.medium || resolvedLarge;
  const resolvedSmall = variants?.small || resolvedMedium;

  return {
    '--bg-large': ensureUrl(resolvedLarge),
    '--bg-medium': ensureUrl(resolvedMedium),
    '--bg-small': ensureUrl(resolvedSmall),
  };
}

export function hasResponsiveVariants(
  variants?: ResponsiveBackgroundVariants
): boolean {
  if (!variants) return false;
  return VARIANT_ORDER.some((key) => Boolean(variants[key]));
}
