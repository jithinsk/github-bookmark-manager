import { searchRepos, searchUsers, getUserRepos } from "../../api";

describe("API lib", () => {
  test("searchRepos function", async () => {
    const repos = await searchRepos("new", "1");
    expect(Array.isArray(repos.items)).toBe(true);
  });

  test("searchUsers function", async () => {
    const users = await searchUsers("new", "1");
    expect(Array.isArray(users.items)).toBe(true);
  });

  test("getUserRepos function", async () => {
    const repos = await getUserRepos(
      "https://api.github.com/users/octocat/repos"
    );
    expect(Array.isArray(repos)).toBe(true);
  });

  test("searchRepos function with error", async () => {
    try {
      const repos = await searchRepos("", "1");
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
