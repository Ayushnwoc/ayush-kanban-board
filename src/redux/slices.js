import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tickets: [],
    byStatus: [],
    byUser: [],
    byPriority: [],
    mainArray: [],
    headMapping: [],
};

//reducers
const data = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
        setByStatus: (state, action) => {
            state.byStatus = action.payload;
        },
        setByPriority: (state, action) => {
            state.byPriority = action.payload;
        },
        setByUser: (state, action) => {
            state.byUser = action.payload;
        },
        setMainArray: (state, action) => {
            state.mainArray = action.payload;
        },
        setHeadMapping: (state, action) => {
            state.headMapping = action.payload;
        },
    },
});

export default data.reducer;

// actions
const {
    setTickets,
    setByStatus,
    setByUser,
    setByPriority,
    setMainArray,
    setHeadMapping,
} = data.actions;

export const fetchTickets = () => async (dispatch) => {
    try {
        let response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();
        const datai = data.tickets;

        // Grouping by status
        const groupedByStatus = {};
        datai.forEach(item => {
            const { status } = item;
            if (!groupedByStatus[status]) {
                groupedByStatus[status] = [item];
            } else {
                groupedByStatus[status].push(item);
            }
        });

        // Grouping by priority
        const groupedByPriority = {};
        datai.forEach(item => {
            const { priority } = item;
            if (!groupedByPriority[priority]) {
                groupedByPriority[priority] = [item];
            } else {
                groupedByPriority[priority].push(item);
            }
        });

        // Grouping by userId
        const groupedByUserId = {};
        datai.forEach(item => {
            const { userId } = item;
            if (!groupedByUserId[userId]) {
                groupedByUserId[userId] = [item];
            } else {
                groupedByUserId[userId].push(item);
            }
        });
        dispatch(setTickets(data));
        dispatch(setByStatus(groupedByStatus));
        dispatch(setByPriority(groupedByPriority));
        dispatch(setByUser(groupedByUserId));

        // logic for localstorage data
        let mainArray = groupedByUserId;
        if (localStorage.getItem('grouping') === 'status') {
            dispatch(setMainArray(groupedByStatus));
            mainArray = groupedByStatus;
        }
        else if (localStorage.getItem('grouping') === 'priority') {
            dispatch(setMainArray(groupedByPriority));
            mainArray = groupedByPriority;
        }
        else {
            dispatch(setMainArray(groupedByUserId));
        }

        const sortedMainArray = {};
        for (const category in mainArray) {
            if (mainArray.hasOwnProperty(category)) {
                const sortedArray = [...mainArray[category]];
                sortedArray.sort((a, b) => {
                    if (localStorage.getItem('ordering') === 'title') {
                        return a.title.localeCompare(b.title);
                    } else {
                        return b.priority - a.priority;
                    }
                });
                sortedMainArray[category] = sortedArray;
            }
        }
        dispatch(setMainArray(sortedMainArray));



        const userObjects = [];
        data.users.forEach(user => {
            userObjects.push({ id: user.id, name: user.name });
        });
        userObjects.push({ id: '0', name: "No Priority" });
        userObjects.push({ id: '1', name: "Low" });
        userObjects.push({ id: '2', name: "Medium" });
        userObjects.push({ id: '3', name: "High" });
        userObjects.push({ id: '4', name: "Urgent" });

        dispatch(setHeadMapping(userObjects));
    }
    catch (error) {
        console.log(error);
    }
};

export const setGrouping = (mainArray, sortBy) => async (dispatch) => {
    const sortedMainArray = {};
    for (const category in mainArray) {
        if (mainArray.hasOwnProperty(category)) {
            const sortedArray = [...mainArray[category]];
            sortedArray.sort((a, b) => {
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                } else if (sortBy === 'priority') {
                    return b.priority - a.priority;
                }
                return 0;
            });
            sortedMainArray[category] = sortedArray;
        }
    }
    dispatch(setMainArray(sortedMainArray));
}