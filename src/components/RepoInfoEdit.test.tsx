import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepoInfoEdit from "./RepoInfoEdit";
import { updateRepo } from "../store/repoSlice";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
jest.mock("../store/repoSlice", () => ({
    updateRepo: jest.fn((repo) => ({ type: "UPDATE_REPO", payload: repo })),
}));


describe("RepoInfoEdit", () => {
    let store: any;
    let mockOnClose: jest.Mock;
    let mockSetIsEditing: jest.Mock;

    const repo = {
        id: 1,
        name: "Test Repo",
        description: "Test Description",
        owner: {
            login: "Unknown",
            type: "User",
        },
        html_url: "url", // Ссылка
        stargazers_count: 12,
        topics: [],
        forks: 0
    };

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore({});
        mockOnClose = jest.fn();
        mockSetIsEditing = jest.fn();
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <RepoInfoEdit
                    repo={repo}
                    onClose={mockOnClose}
                    setIsEditing={mockSetIsEditing}
                />
            </Provider>
        );

    test("renders the component with initial values", () => {
        const { getByLabelText } = renderComponent();

        expect(getByLabelText("Название:")).toHaveValue(repo.name);
        expect(getByLabelText("Описание:")).toHaveValue(repo.description);
    });

    test("updates name and description fields", () => {
        const { getByLabelText } = renderComponent();

        const nameInput = getByLabelText("Название:");
        const descriptionInput = getByLabelText("Описание:");

        fireEvent.change(nameInput, { target: { value: "Updated Name" } });
        fireEvent.change(descriptionInput, { target: { value: "Updated Description" } });

        expect(nameInput).toHaveValue("Updated Name");
        expect(descriptionInput).toHaveValue("Updated Description");
    });

    test("calls onClose and dispatches updateRepo when 'Сохранить' is clicked", () => {
        const { getByText, getByLabelText } = renderComponent();

        fireEvent.change(getByLabelText("Название:"), { target: { value: "Updated Name" } });
        fireEvent.change(getByLabelText("Описание:"), { target: { value: "Updated Description" } });

        fireEvent.click(getByText("Сохранить"));

        expect(updateRepo).toHaveBeenCalledWith({
            ...repo,
            name: "Updated Name",
            description: "Updated Description",
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("does not allow empty fields when 'Сохранить' is clicked", () => {
        const { getByText, getByLabelText } = renderComponent();

        // Задаем пустые значения полей
        fireEvent.change(getByLabelText("Название:"), { target: { value: "" } });
        fireEvent.change(getByLabelText("Описание:"), { target: { value: "" } });

        // Подменяем alert
        window.alert = jest.fn();

        // Кликаем "Сохранить"
        fireEvent.click(getByText("Сохранить"));

        // Проверяем, что alert вызван
        expect(window.alert).toHaveBeenCalledWith("Редактируемые поля не могут быть пустым.");

        // Проверяем, что updateRepo и onClose не вызываются
        expect(updateRepo).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });


    test("resets fields and calls setIsEditing(false) when 'Отмена' is clicked", () => {
        const { getByText, getByLabelText } = renderComponent();

        fireEvent.change(getByLabelText("Название:"), { target: { value: "Temporary Name" } });
        fireEvent.change(getByLabelText("Описание:"), { target: { value: "Temporary Description" } });

        fireEvent.click(getByText("Отмена"));

        expect(getByLabelText("Название:")).toHaveValue(repo.name);
        expect(getByLabelText("Описание:")).toHaveValue(repo.description);
        expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    });
});
