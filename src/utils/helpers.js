export const STORAGE_KEY = 'todo-tasks';
// export const ACCESS_TOKEN = 'accessToken';

export function loadTasksFromLS() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function saveTasksToLS(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore quota/privacy errors
  }
};

export function filterTasks(tasks, filter) {
  if (filter === 'completed') return tasks.filter(t => t.status === 'completed');
  if (filter === 'pending') return tasks.filter(t => t.status === 'pending');
  return tasks;
};

export function sanitizeTitle(raw) {
  // Basic XSS guard: strip HTML tags and trim
  return raw.replace(/<[^>]*>?/gm, '').trim();
};
