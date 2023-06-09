import csrfFetch from "./csrf.js";

// Action constants
const SET_LISTINGS = "listings/SET_LISTINGS";
const ADD_LISTING = "listings/ADD_LISTING";
const DELETE_LISTING = "listings/DELETE_LISTING";

// Action creators

const setListings = (listings) => ({
    type: SET_LISTINGS,
    listings
});

const addListing = (listing) => ({
    type: ADD_LISTING,
    listing
});

const deleteListing = (listingId) => ({
    type: DELETE_LISTING,
    listingId
});

// Selectors

export const getListings = (state) => state?.listings ? Object.values(state.listings) : [];
export const getListing = id => state => state?.listings ? state.listings[id] : null;

// Thunk actions/creators

export const fetchListings = () => async (dispatch) => {
    const res = await csrfFetch("/api/listings");
    const listings = await res.json();
    dispatch(setListings(listings));
};

export const fetchListing = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${id}`);
    const listing = await res.json();
    dispatch(addListing(listing));
};

export const createListing = (listing) => async (dispatch) => {
    const res = await csrfFetch("/api/listings", {
        method: "POST",
        body: JSON.stringify(listing),
    });
    const data = await res.json();
    dispatch(addListing(data.listing));
};

export const updateListing = (listing) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listing.id}`, {
        method: "PUT",
        body: JSON.stringify(listing),
    });
    const data = await res.json();
    dispatch(addListing(data));
};

export const removeListing = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    dispatch(deleteListing(data.listingId));
};

// Reducer
export default function listingReducer (state = {}, action) {
    switch (action.type) {
        case SET_LISTINGS:
            return action.listings;
        case ADD_LISTING:
            const listing = action.listing;
            return { ...state, [listing.id]: listing };
        case DELETE_LISTING:
            const newState = { ...state };
            delete newState[action.listingId];
            return newState;
        default:
            return state;
    }
}
