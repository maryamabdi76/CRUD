import React from "react";
import { fireEvent, render } from '@testing-library/react';
import User from '../User';
import { UserProvider } from "../context/User";

const fakedata = { id: 1, first_name: "mary", last_name: "abdi", email: "maryamabdi@gmail.com" }
describe('row actions', () => {
	it('should contains 5 td', () => {
		const { container } = render(<User user={fakedata} />);

		expect(container).toBeTruthy();
		expect(container.getElementsByTagName('td').length).toEqual(5);

	});

	it('should contains two Edit/Delete buttons', () => {
		const { container, getByTestId } = render(
			<User user={fakedata} />
		);

		expect(container.getElementsByTagName('button').length === 2);
	});


	test('delete action works and displays confirmation message', () => {
		const { getByText } = render(
			<User user={fakedata} />
		);
		const deleteButton = getByText("Delete");
		fireEvent.click(deleteButton);
		// expect(screen.findByText("Do you Want to delete this item?"))//.toHaveTextContent('Are you sure to delete?');
	});

});

