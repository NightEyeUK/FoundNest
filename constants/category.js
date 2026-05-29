import { API_BASE_URL } from '@/constants/api';

/** Fallback labels if the API is unreachable */
export const category = [
  'Academic Materials',
  'Clothing and Accessories',
  'Electronics',
  'Official Documents',
  'Personal Items',
  'Sports Equipment',
];

/** Pick exactly one category from AI text (handles commas / "and"). */
export function matchCategoryFromAi(aiCategory, categories) {
  if (!aiCategory || !categories?.length) return null;

  const normalize = (s) => s.toLowerCase().trim();
  const raw = normalize(String(aiCategory));
  const firstToken = raw.split(/[,;/|]|\s+and\s+/)[0].trim();

  const exact =
    categories.find((c) => normalize(c.name) === raw) ||
    categories.find((c) => normalize(c.name) === firstToken);
  if (exact) return exact;

  const partial = categories.find(
    (c) =>
      raw.includes(normalize(c.name)) || normalize(c.name).includes(firstToken),
  );
  return partial ?? null;
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    if (!response.ok) {
      throw new Error(`Categories failed (${response.status})`);
    }
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new Error('Categories response was not JSON');
    }
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      id: item.category_id,
      name: item.category_name,
    }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return category.map((name, index) => ({
      id: index + 1,
      name,
    }));
  }
}
