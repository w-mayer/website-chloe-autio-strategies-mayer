import ContactView from './ContactView';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Contact | Autio Strategies',
  'Start a conversation with Autio Strategies about AI policy, governance, and strategy. Based in Washington, D.C.',
  '/contact',
);

export default function ContactPage() {
  return <ContactView />;
}
