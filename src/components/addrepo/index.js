import React, { useCallback, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import Search from "./../search";
import ResultsTable from "./../results";
import WrapperUI from "./../wrapper";
import Paginator from "./../pagination";
import { reducer, initialState } from "./reducer";
import { searchRepos, searchUsers, getUserRepos } from "../../api";
import { debounce } from "./../../utils/common";
import "./index.css";

const debounceInput = debounce((value, dispatch) => {
  dispatch({ type: "search", search: value });
}, 500);

const AddRepository = ({ addRepository }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChage = (event) => {
    if (state.isLoading) return event.preventDefault();
    dispatch({ type: "updateinput", inputSearch: event.target.value });
    debounceInput(event.target.value, dispatch);
  };

  const handleSelectChange = (event) => {
    if (state.isLoading) return event.preventDefault();
    dispatch({ type: "update.type", typeInput: event.target.value });
  };

  const handleRepositorySelect = (index) => {
    addRepository(state.searchResults[index]);
    dispatch({
      type: "update.search.results",
      index: index,
    });
  };

  const goBackToUserSeach = () => dispatch({ type: "reset.user.repos" });

  const handleUserSelect = async (index) => {
    try {
      dispatch({ type: "reset.user.repos", show: true, isLoading: true });
      const response = await getUserRepos(
        state.userSearchResults[index].Repo.value
      );
      dispatch({
        type: "add.repos",
        data: { items: response, total_count: response.length },
        showUserRepos: true,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "set.loading", loading: false });
    }
  };

  const pageChanged = (pageNumber) =>
    dispatch({ type: "update.page", pageNumber });

  const fetchData = useCallback(async () => {
    try {
      if (state.searchInput === "") return;
      dispatch({ type: "set.loading", loading: true });
      if (state.typeInput === "user") {
        const response = await searchUsers(state.searchInput, state.pageNumber);
        dispatch({
          type: "add.users",
          data: response,
        });
      } else {
        const response = await searchRepos(state.searchInput, state.pageNumber);
        dispatch({
          type: "add.repos",
          data: response,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "set.loading", loading: false });
    }
  }, [state.searchInput, state.typeInput, state.pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <WrapperUI heading={state.showUserRepos ? "User repos" : "Search"}>
      {state.showUserRepos ? (
        <>
          <Button onClick={goBackToUserSeach}>Go Back</Button>
          <ResultsTable
            dataHeaders={state.dataHeaders}
            dataset={state.searchResults}
            showButtonOption={true}
            buttonAction={handleRepositorySelect}
            isLoading={state.isLoading}
            buttonText="Add"
            noRowsMessage="No search results"
          ></ResultsTable>
        </>
      ) : (
        <>
          <Search
            fieldValue={state.originalInput}
            handleInputChage={handleInputChage}
            handleSelectChange={handleSelectChange}
          ></Search>
          {state.typeInput === "user" ? (
            <ResultsTable
              dataHeaders={state.userDataHeaders}
              dataset={state.userSearchResults}
              showButtonOption={true}
              buttonAction={handleUserSelect}
              isLoading={state.isLoading}
              buttonText="View Repos"
              noRowsMessage="No search results"
            ></ResultsTable>
          ) : (
            <ResultsTable
              dataHeaders={state.dataHeaders}
              dataset={state.searchResults}
              showButtonOption={true}
              buttonAction={handleRepositorySelect}
              isLoading={state.isLoading}
              buttonText="Add"
              noRowsMessage="No search results"
            ></ResultsTable>
          )}
          {state.totalCount > 0 && (
            <Paginator
              selected={state.pageNumber}
              total={state.totalCount}
              pageChanged={pageChanged}
            ></Paginator>
          )}
        </>
      )}
    </WrapperUI>
  );
};

export default AddRepository;
