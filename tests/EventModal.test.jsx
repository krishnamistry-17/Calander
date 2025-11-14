import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventModal from "../src/components/EventModal.jsx";

describe("EventModal", () => {
  test("calls onSubmit with normalized date and form values", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockResolvedValue();
    const onClose = jest.fn();

    const initialDate = new Date(2025, 10, 13);

    render(
      <EventModal
        open
        onClose={onClose}
        mode="create"
        initialDate={initialDate}
        initialEvent={null}
        onSubmit={onSubmit}
      />
    );

    const titleInput = screen.getByPlaceholderText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "My Event");

    const saveBtn = screen.getByRole("button", { name: /save/i });
    await user.click(saveBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];
    expect(payload).toMatchObject({
      title: "My Event",
      selectedDate: "2025-11-13",
    });
  });
});
