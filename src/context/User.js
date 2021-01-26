import React, { createContext, useEffect, useReducer } from 'react';
import AppReducer from "../AppReducer";
import axios from 'axios';
import users from '../API';

const UserContext = createContext({})

const UserProvider = ({ children }) => {
    const initialState = {
        visibleModal: false,
        search: "",
        searchResult: [],
        data: [],
        currentUser: { first_name: "", last_name: "", email: "" },
        pagination: { current: 1, pageSize: 6, total: 1 }
    }
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        const loadData = async (param = 1) => {
            await axios({
                url: users.getUsers.url + "page=" + param + "&per_page=100",
                method: users.getUsers.method,
            }).then(result => {
                dispatch({
                    type: "SET",
                    payload: {
                        ...state,
                        data: result.data.data,
                        searchResult: result.data.data,
                        pagination: { ...state.pagination, total: result.data.total }
                    }
                })
            });
        }
        loadData();
    }, []);

    const search = (value) => {
        dispatch({
            type: "SEARCH",
            payload: value
        });
    }
    const currentPage = (pager) => {
        dispatch({
            type: "CURRENT_PAGE",
            payload: pager
        });
    }
    const add = (user) => {
        dispatch({
            type: "ADD",
            payload: user
        });
    }
    const edit = (user) => {
        dispatch({
            type: "EDIT",
            payload: user
        });
    }
    const remove = (id) => {
        dispatch({
            type: "REMOVE",
            payload: id
        });
    }
    const showModal = (user = []) => {
        dispatch({
            type: "SHOW_MODAL",
            payload: user
        });
    }
    const hideModal = () => {
        dispatch({
            type: "HIDE_MODAL"
        });
    }

    return (
        <UserContext.Provider value={{ state, search, currentPage, add, edit, remove, showModal, hideModal }}>
            {children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider }

