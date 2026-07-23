// Purpose: Redux slice to manage platform data (CRUD operations)
// Explanation: This slice handles adding, updating, and deleting platforms

// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for platforms
const initialState = [
  { id: 1, name: 'Twitter' },
  { id: 2, name: 'Facebook' },
  { id: 3, name: 'Instagram' }
];

// Create slice for platforms
const platformsSlice = createSlice({
  name: 'platforms',  // Name of the slice
  initialState,       // Initial state defined above
  reducers: {
    // Reducer to add a new platform
    addPlatform: (state, action) => {
      // Add new platform to state (action.payload contains platform data)
      state.push(action.payload);
    },
    // Reducer to update a platform
    updatePlatform: (state, action) => {
      // Find index of platform to update
      const index = state.findIndex(platform => platform.id === action.payload.id);
      // If platform found, update it
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Reducer to delete a platform
    deletePlatform: (state, action) => {
      // Return new state without deleted platform
      return state.filter(platform => platform.id !== action.payload);
    }
  }
});

// Export actions so components can use them
export const { addPlatform, updatePlatform, deletePlatform } = platformsSlice.actions;

// Export reducer to add to store
export default platformsSlice.reducer;
