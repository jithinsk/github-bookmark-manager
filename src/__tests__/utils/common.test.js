import { debounce } from "../../utils/common";

describe("Util lib", () => {
  test("debounce function", () => {
    const mockFunction = jest.fn(() => {});
    const debounceInput = debounce(mockFunction, 1000);
    for (let index = 0; index < 5; index++) {
      debounceInput();
    }
    setTimeout(() => expect(mockFunction).toHaveBeenCalledTimes(1));
  });
});
