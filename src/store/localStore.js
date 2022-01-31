export const get = (id) => JSON.parse(localStorage.getItem(id)) || undefined;

export const set = (id, value) =>
  localStorage.setItem(id, JSON.stringify(value));
