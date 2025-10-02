import { GitHubUser, GitHubRepo } from '../types';

const BASE = 'https://api.github.com';

async function parseJSON(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function searchUsers(query: string, signal?: AbortSignal): Promise<GitHubUser[]> {
  if (!query) return [];
  const url = `${BASE}/search/users?q=${encodeURIComponent(query)}+in:login&per_page=5`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const data = await parseJSON(res);
    const message = (data && (data as any).message) ? (data as any).message : `HTTP ${res.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  return (data.items || []) as GitHubUser[];
}

export async function getUserRepos(username: string, signal?: AbortSignal): Promise<GitHubRepo[]> {
  const url = `${BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const data = await parseJSON(res);
    const message = (data && (data as any).message) ? (data as any).message : `HTTP ${res.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  return (data || []) as GitHubRepo[];
}
