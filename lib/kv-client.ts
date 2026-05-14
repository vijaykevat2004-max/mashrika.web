function findEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return '';
}

function getKvConfig() {
  const url = findEnv('KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL', 'STORAGE_KV_REST_API_URL');
  const token = findEnv('KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_TOKEN', 'STORAGE_KV_REST_API_TOKEN');
  return { url, token };
}

export function canUseKv() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

export async function runKvCommand(command: unknown[]) {
  const { url, token } = getKvConfig();
  if (!url || !token) {
    throw new Error('KV not configured.');
  }
  const endpoint = url.endsWith('/') ? url.slice(0, -1) : url;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command),
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('KV command failed.');
  }
  return (await res.json()) as { result?: unknown };
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const data = await runKvCommand(['GET', key]);
  if (!data.result) return null;
  if (typeof data.result === 'string') {
    try {
      return JSON.parse(data.result) as T;
    } catch {
      return null;
    }
  }
  return data.result as T;
}

export async function kvSet<T>(key: string, value: T) {
  await runKvCommand(['SET', key, JSON.stringify(value)]);
}
