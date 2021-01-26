import React from "react";
import Pagination from '../Pagination';
import { UserContext } from "../context/User";

describe('row actions', () => {
	const contextValue = {
		...initialState,
		pagination: jest.fn()
	}
	const setup = () => {
		const { container, getByTestId, getByText } = render(
			<UserContext.Provider value={contextValue}>
				<User />
			</UserContext.Provider>
		);
		return {
			container, getByTestId, getByText
		};
	};


	// it('should contains 5 td', () => {

	// 	const { getByTestId, getByText, container } = setup();
		
	// 	expect(container).toBeTruthy();
	// 	expect(container.getElementsByTagName('button').length).toEqual(3);

	// });
});

