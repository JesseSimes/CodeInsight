/*
 * Coding platforms CodeInsight is designed to read from.
 * None can be connected yet: the server has no endpoint for saving,
 * validating or syncing coding profiles. Status is therefore static and
 * honest; when an endpoint exists, replace this with data from the API.
 */
export const PLATFORMS = [
  { id: 'leetcode', name: 'LeetCode', mono: 'LC', url: 'leetcode.com' },
  { id: 'codeforces', name: 'Codeforces', mono: 'CF', url: 'codeforces.com' },
  { id: 'codechef', name: 'CodeChef', mono: 'CC', url: 'codechef.com' },
  { id: 'hackerrank', name: 'HackerRank', mono: 'HR', url: 'hackerrank.com' },
]

export const CONNECTIONS_AVAILABLE = false
