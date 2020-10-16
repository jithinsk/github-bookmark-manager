export const reducer = (state, action) => {
  switch (action.type) {
    case "add.repos":
      return {
        ...state,
        searchResults: action.data.items.map((repo) => ({
          Name: { value: repo.name || "", isLink: true },
          Maintainer: {
            value: repo.owner && repo.owner.login ? repo.owner.login : "",
          },
          URL: { value: repo.html_url || "" },
          Created: { value: repo.created_at || "" },
        })),
        totalCount: 1000, //Github API limitation
        isLoading: false,
      };
    case "add.users":
      return {
        ...state,
        userSearchResults: action.data.items.map((user) => ({
          Name: { value: user.login || "", isLink: true },
          URL: { value: user.html_url || "" },
          Repo: { value: user.repos_url || "" },
        })),
        totalCount: 1000, //Github API limitation
        isLoading: false,
      };
    case "search":
      let newState = { ...state, searchInput: action.search };
      if (action.search === "") {
        newState = {
          ...newState,
          userSearchResults: [],
          searchResults: [],
          pageNumber: 1,
        };
      }
      return newState;
    case "set.loading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "update.search.results":
      state.searchResults.splice(action.index, 1);
      return state;
    case "update.type":
      return {
        ...state,
        typeInput: action.typeInput,
        searchInput: "",
        originalInput: "",
        searchResults: [],
        userSearchResults: [],
        totalCount: 0,
        pageNumber: 1,
      };
    case "reset.user.repos":
      return {
        ...state,
        showUserRepos: !!action.show,
        isLoading: !!action.isLoading,
      };
    case "updateinput":
      return {
        ...state,
        originalInput: action.inputSearch,
      };
    case "update.page":
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    default:
      throw new Error();
  }
};

export const initialState = {
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
};
