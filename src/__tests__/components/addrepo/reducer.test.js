import { initialState, reducer } from "../../../components/addrepo/reducer";

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
      reducer(initialState, {
        type: "add.repos",
        data: {
          items: [],
        },
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 1000,
      pageNumber: 1,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    expect(
      reducer(initialState, {
        type: "add.users",
        data: {
          items: [],
        },
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 1000,
      pageNumber: 1,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    expect(
      reducer(initialState, {
        type: "search",
        search: "new",
      })
    ).toStrictEqual({
      searchInput: "new",
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

    expect(
      reducer(
        { ...initialState, pageNumber: 5 },
        {
          type: "search",
          search: "",
        }
      )
    ).toStrictEqual({
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

    expect(
      reducer(initialState, {
        type: "set.loading",
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
      isLoading: true,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    expect(
      reducer(
        { ...initialState, searchResults: ["a", "b", "c"] },
        {
          type: "update.search.results",
          index: 1,
        }
      )
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: ["a", "c"],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    expect(
      reducer(
        { ...initialState, searchInput: "new" },
        {
          type: "update.type",
          typeInput: "repo",
        }
      )
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "repo",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    expect(
      reducer(initialState, {
        type: "reset.user.repos",
        show: true,
        isLoading: true,
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 1,
      isLoading: true,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: true,
    });

    expect(
      reducer(initialState, {
        type: "updateinput",
        inputSearch: "new",
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "new",
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

    expect(
      reducer(initialState, {
        type: "update.page",
        pageNumber: 5,
      })
    ).toStrictEqual({
      searchInput: "",
      originalInput: "",
      typeInput: "user",
      searchResults: [],
      userSearchResults: [],
      totalCount: 0,
      pageNumber: 5,
      isLoading: false,
      dataHeaders: ["Index", "Name", "Maintainer", "Created", "URL"],
      userDataHeaders: ["Index", "Name", "URL"],
      showUserRepos: false,
    });

    try {
      reducer(initialState, {
        type: "error",
      });
    } catch (error) {
      expect(typeof error).toBe("object");
    }
  });
});
