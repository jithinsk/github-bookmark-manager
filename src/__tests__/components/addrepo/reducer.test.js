import { initialState, reducer } from "../../../components/addrepo/reducer";
import searchrepo from "./searchrepo.json";
import searchuser from "./searchuser.json";

describe("AddRepo reducer", () => {
  test("validate initial state", () => {
    expect(initialState).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });
  });

  test("reducer check", () => {
    expect(
      reducer(
        {},
        {
          type: "add.repos",
          data: searchrepo,
        }
      )
    ).toStrictEqual({
      searchResults: searchrepo.items.map((repo) => ({
        Name: { value: repo.name || "", isLink: true },
        Maintainer: {
          value: repo.owner && repo.owner.login ? repo.owner.login : "",
        },
        URL: { value: repo.html_url || "" },
        Created: { value: repo.created_at || "" },
      })),
      totalCount: 1000,
      isLoading: false,
    });

    expect(
      reducer(
        {},
        {
          type: "add.users",
          data: searchuser,
        }
      )
    ).toStrictEqual({
      userSearchResults: searchuser.items.map((user) => ({
        Name: { value: user.login || "", isLink: true },
        URL: { value: user.html_url || "" },
        Repo: { value: user.repos_url || "" },
      })),
      totalCount: 1000,
      isLoading: false,
    });

    expect(
      reducer(
        {},
        {
          type: "search",
          search: "new",
        }
      )
    ).toStrictEqual({
      searchInput: "new",
    });

    expect(
      reducer(
        {},
        {
          type: "search",
          search: "",
        }
      )
    ).toStrictEqual({
      searchInput: "",
      userSearchResults: [],
      searchResults: [],
      pageNumber: 1,
      totalCount: 0,
    });

    expect(
      reducer(
        {},
        {
          type: "set.loading",
          loading: true,
        }
      )
    ).toStrictEqual({
      isLoading: true,
    });

    expect(
      reducer(
        { searchResults: ["a", "b", "c"] },
        {
          type: "update.search.results",
          index: 1,
        }
      )
    ).toStrictEqual({
      searchResults: ["a", "c"],
    });

    expect(
      reducer(
        {},
        {
          type: "update.type",
          typeInput: "repo",
        }
      )
    ).toStrictEqual({
      typeInput: "repo",
      searchInput: "",
      originalInput: "",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
    });

    expect(
      reducer(
        {},
        {
          type: "reset.user.repos",
          show: true,
          isLoading: true,
        }
      )
    ).toStrictEqual({
      isLoading: true,
      showUserRepos: true,
    });

    expect(
      reducer(
        {},
        {
          type: "updateinput",
          inputSearch: "new",
        }
      )
    ).toStrictEqual({
      originalInput: "new",
    });

    expect(
      reducer(
        {},
        {
          type: "update.page",
          pageNumber: 5,
        }
      )
    ).toStrictEqual({
      pageNumber: 5,
    });

    try {
      reducer(
        {},
        {
          type: "error",
        }
      );
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
