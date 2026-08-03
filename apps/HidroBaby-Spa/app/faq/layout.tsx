import type { Metadata } from 'next';
import { SchemaMarkup, generateFAQSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | HidroBaby Spa - FAQ Completo',
  description: 'Todas las preguntas frecuentes sobre spa post vacunas, hidromasaje, fisioterapia infantil, precios y más. 20 respuestas detalladas.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const schema = generateFAQSchema();

  return (
    <>
      <head>
        <SchemaMarkup schema={schema} />
      </head>
      {children}
    </>
  );
}