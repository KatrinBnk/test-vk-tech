import {render, fireEvent, act, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "./SearchBar";

const mockStore = configureStore([]);

jest.mock("../store/repoSlice", () => ({
    setQuery: jest.fn(),
}));

describe("SearchBar Component", () => {
    let store: ReturnType<typeof mockStore>;
    let mockOnSearchEnabled: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore({});
        mockOnSearchEnabled = jest.fn();
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <SearchBar onSearchEnabled={mockOnSearchEnabled} />
            </Provider>
        );

    test("renders input, selects, and date picker", () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        expect(getByPlaceholderText("Поиск репозиториев...")).toBeInTheDocument();
        expect(getByText("Все языки")).toBeInTheDocument();
        expect(getByText("Все лицензии")).toBeInTheDocument();
        expect(getByPlaceholderText("Создано после")).toBeInTheDocument();
    });

    test("calls onSearchEnabled when input changes", () => {
        const { getByPlaceholderText } = renderComponent();
        const input = getByPlaceholderText("Поиск репозиториев...");

        act(() => {
            fireEvent.change(input, { target: { value: "Test Query" } });
        });

        expect(mockOnSearchEnabled).toHaveBeenCalledWith(true, {
            query: "Test Query",
            language: "",
            license: "",
            created: "",
        });
    });


    test("calls onSearchEnabled when language is selected", async () => {
        const { getByText } = renderComponent();
        const languageSelect = getByText("Все языки");

        fireEvent.mouseDown(languageSelect);

        const languageOption = await waitFor(() => getByText("C++"));

        fireEvent.click(languageOption);

        expect(mockOnSearchEnabled).toHaveBeenCalledWith(true, {
            query: "",
            language: "C++",
            license: "",
            created: "",
        });
    });


    test("calls onSearchEnabled when license is selected", async () => {
        const { getByText } = renderComponent();
        const licenseSelect = getByText("Все лицензии");

        fireEvent.mouseDown(licenseSelect);

        const licenseOption = await waitFor(() => getByText("MIT"));

        fireEvent.click(licenseOption);

        expect(mockOnSearchEnabled).toHaveBeenCalledWith(true, {
            query: "",
            language: "",
            license: "mit",
            created: "",
        });
    });

    test("does not allow future dates in the date picker", () => {
        const { getByPlaceholderText } = renderComponent();
        const datePicker = getByPlaceholderText("Создано после");

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const futureDateString = futureDate.toISOString().split("T")[0];

        act(() => {
            fireEvent.change(datePicker, { target: { value: futureDateString } });
        });

        expect(mockOnSearchEnabled).toHaveBeenCalledWith(false, {
            query: "",
            language: "",
            license: "",
            created: "",
        });
    });
});
