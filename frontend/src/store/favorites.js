import csrfFetch from "./csrf.js";

// Action constants
const SET_FAVORITE = "listings/SET_FAVORITE";
const ADD_FAVORITE = "listings/ADD_FAVORITE";
const DELETE_FAVORITE = "listings/DELETE_FAVORITE";

// Action creators

const setFavorite = (favorite) => ({
    type: SET_FAVORITE,
    favorite
});

const addFavorite = (favorite) => ({
    type: ADD_FAVORITE,
    favorite
});

const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    favoriteId
});

// Selectors
export const getFavorite = id => state => state?.favorites ? state.favorites[id] : null;

// Thunk actions/creators

export const fetchFavorite = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/favorites/${id}`);
    const favorite = await res.json();
    dispatch(addFavorite(favorite));
};

export const createFavorite = (favorite) => async (dispatch) => {
    const res = await csrfFetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify(favorite),
    });
    const data = await res.json();
    dispatch(addFavorite(data.favorite));
};

export const removeFavorite = (favoriteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    dispatch(deleteFavorite(data.favoriteId));
};

// Reducer
export default function favoriteReducer (state = {}, action) {
    switch (action.type) {
        case SET_FAVORITE:
            return action.favorite;
        case ADD_FAVORITE:
            const favorite = action.favorite;
            return { ...state, [favorite.id]: favorite };
        case DELETE_FAVORITE:
            const newState = { ...state };
            delete newState[action.favoriteId];
            return newState;
        default:
            return state;
    }
}