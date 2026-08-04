import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../../../HidroBaby-Spa/src/components/SectionsRenderer';

async function loadContent(locale: string = 'es') {
  try {
    const contentPath = path.join(process.cwd(), 'content', `${locale}.json`);
    const contentRaw = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(contentRaw);
  } catch (e) {
    console.error('Failed to load content:', e);
    return null;
  }
}

export default async function HomePage() {
  const content = await loadContent('es');
  if (!content) {
    return <main className="p-8">Error: no se pudo cargar el contenido.</main>;
  }
  return <SectionsRenderer content={content} locale="es" />;
}
