import { fetchConceptGroups, fetchConceptDetail, fetchRelatedExercises } from './api';
import type { ConceptDetail, RelatedExercise } from './api';

export interface ConceptAnswerData {
  detail: ConceptDetail | null;
  exercises: RelatedExercise[];
  matchedTitle: string;
}

const WHAT_IS_REGEX = /^什么是(.+?)[？?的]?$/;

export function extractConceptName(query: string): string | null {
  const match = query.trim().match(WHAT_IS_REGEX);
  if (!match) return null;
  let name = match[1].trim();
  name = name.replace(/[？?，。！；：、,\.!;:]+$/, '');
  return name || null;
}

export async function loadConceptAnswerData(
  subject: string,
  query: string
): Promise<ConceptAnswerData | null> {
  const conceptName = extractConceptName(query);
  if (!conceptName) return null;

  const groups = await fetchConceptGroups(subject);
  const allConcepts = Object.values(groups).flat();

  // Find the best matching concept by title
  // Priority: exact title match > title contains name > name in title
  let matched: (typeof allConcepts)[0] | null = null;

  // 1. Exact match
  matched = allConcepts.find((c) => c.title === conceptName) ?? null;

  // 2. Title ends with or starts with the name
  if (!matched) {
    matched =
      allConcepts.find((c) => c.title.endsWith(conceptName) || c.title.startsWith(conceptName)) ?? null;
  }

  // 3. Title contains the name
  if (!matched) {
    matched = allConcepts.find((c) => c.title.includes(conceptName)) ?? null;
  }

  // 4. Name contains the title
  if (!matched) {
    matched = allConcepts.find((c) => conceptName.includes(c.title)) ?? null;
  }

  if (!matched) return null;

  const [detail, exercises] = await Promise.all([
    fetchConceptDetail(subject, matched.id).catch(() => null),
    fetchRelatedExercises(subject, matched.id).catch(() => [] as RelatedExercise[]),
  ]);

  return {
    detail,
    exercises,
    matchedTitle: matched.title,
  };
}
