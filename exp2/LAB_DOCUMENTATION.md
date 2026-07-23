# Redux Toolkit Lab Experiment Documentation

## 1. Folder Structure
```
exp2/
├── src/
│   ├── app/
│   │   └── store.js
│   ├── features/
│   │   ├── posts/
│   │   │   └── postsSlice.js
│   │   └── platforms/
│   │       └── platformsSlice.js
│   ├── components/
│   │   ├── AddPost.jsx
│   │   ├── PostList.jsx
│   │   ├── AddPlatform.jsx
│   │   └── PlatformList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── LAB_DOCUMENTATION.md (this file)
```

## 2. Installation Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```

## 3. File-by-File Explanation

### 3.1 package.json
- **Purpose**: Contains project metadata and dependencies
- **Explanation**: Lists required packages: React, Redux Toolkit, React-Redux, and Vite build tools

### 3.2 vite.config.js
- **Purpose**: Configuration file for Vite build tool
- **Explanation**: Enables React plugin for Vite

### 3.3 index.html
- **Purpose**: Root HTML file that loads React app
- **Explanation**: Contains div#root where React renders

### 3.4 src/app/store.js
- **Purpose**: Centralized Redux store configuration
- **Explanation**: Combines reducers from both slices using configureStore()

### 3.5 src/features/platforms/platformsSlice.js
- **Purpose**: Redux slice for managing platform state
- **Explanation**: Uses createSlice to define initial state and reducers for add, update, delete

### 3.6 src/features/posts/postsSlice.js
- **Purpose**: Redux slice for managing post state
- **Explanation**: Normalized state referencing platformId instead of storing platform names directly

### 3.7 src/components/AddPlatform.jsx
- **Purpose**: Form to add new platforms
- **Explanation**: Uses useState for input and useDispatch to send addPlatform action

### 3.8 src/components/PlatformList.jsx
- **Purpose**: Display, edit, delete platforms
- **Explanation**: Uses useSelector to get platforms from store

### 3.9 src/components/AddPost.jsx
- **Purpose**: Form to add new posts
- **Explanation**: Lets user select platform from dropdown

### 3.10 src/components/PostList.jsx
- **Purpose**: Display, edit, delete posts with platform names
- **Explanation**: Finds platform name using platformId from platforms state

### 3.11 src/App.jsx
- **Purpose**: Main application component
- **Explanation**: Renders all components

### 3.12 src/main.jsx
- **Purpose**: Entry point
- **Explanation**: Wraps App with Redux Provider to make store available to all components

### 3.13 src/index.css
- **Purpose**: Basic styling
- **Explanation**: Simple, clean CSS for all components

## 4. Redux Data Flow Explanation
1. **User Action**: User interacts with a component (clicks button, submits form)
2. **Dispatch Action**: Component calls useDispatch() and sends an action
3. **Reducer Handles Action**: Reducer in slice updates the state immutably
4. **Store Updates**: Central store gets updated
5. **Components Re-render**: Components using useSelector() detect state change and re-render

## 5. Key Concepts Explanation
### Store
- Centralized container holding all application state
- Single source of truth for the app

### Slice
- Bundle of reducer logic and actions for a single feature
- Created using createSlice()

### Reducer
- Pure function that takes state and action and returns new state
- Determines how state changes in response to actions

### Action
- Plain JavaScript object with 'type' property describing what happened
- May also carry payload data

### Dispatch
- Function used to send actions to the store
- Triggers the reducer to run

### useSelector
- React hook that lets components read data from the store
- Takes a selector function to extract specific state

### useDispatch
- React hook that returns dispatch function
- Used to send actions from components

### Initial State
- Starting state of the application when it loads
- Defined in each slice

### Normalized State
- State structured like a database
- Entities stored by ID, other entities reference by ID instead of nesting data
- Prevents data duplication

### createSlice
- Redux Toolkit function that simplifies creating slices
- Automatically generates action creators based on reducer names

### configureStore
- Redux Toolkit function to set up store with good defaults
- Adds middleware, enables DevTools, combines reducers

## 6. Viva Questions with Answers (30+)

**Q1: What is Redux Toolkit?**
A: Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development.

**Q2: Why use Redux Toolkit?**
A: It simplifies Redux development by reducing boilerplate code, providing useful utilities, and enforcing best practices.

**Q3: What is a slice in Redux Toolkit?**
A: A slice is a collection of reducer logic and actions for a single feature of your app, created using createSlice().

**Q4: What is createSlice()?**
A: createSlice() is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types corresponding to the reducers and state.

**Q5: What is configureStore()?**
A: configureStore() is a function that wraps createStore to provide good defaults like Redux DevTools, middleware, and simplified configuration.

**Q6: What is normalized state?**
A: Normalized state is a way of structuring data like a database, where each type of data is stored in its own object with IDs as keys, and references between items use IDs instead of nesting.

**Q7: Why normalize state?**
A: To prevent data duplication, make updates easier, and improve performance.

**Q8: What is useSelector()?**
A: useSelector() is a React-Redux hook that reads a value from the store state and subscribes to updates.

**Q9: What is useDispatch()?**
A: useDispatch() is a React-Redux hook that returns a reference to the dispatch function from the Redux store, used to dispatch actions.

**Q10: What is the Provider component?**
A: Provider is a React-Redux component that makes the Redux store available to any nested components that need to access it.

**Q11: What is a reducer?**
A: A reducer is a pure function that takes the current state and an action, and returns a new state.

**Q12: What is an action?**
A: An action is a plain JavaScript object that has a type field and describes something that happened in the application.

**Q13: What is a payload in an action?**
A: The payload is optional additional data in an action that provides information needed to update the state.

**Q14: Can we mutate state directly in Redux Toolkit reducers?**
A: Yes! Redux Toolkit uses Immer internally, which lets you write "mutating" code that is actually converted into immutable updates.

**Q15: What is Immer?**
A: Immer is a library that allows you to work with immutable state in a more convenient way by writing code that "mutates" a draft state, and Immer produces the new immutable state for you.

**Q16: What is the purpose of the store in Redux?**
A: The store is the central place where the application state lives. It brings together actions and reducers.

**Q17: How do you access the store in a component?**
A: Using the useSelector() hook.

**Q18: How do you update the store from a component?**
A: Using the useDispatch() hook to dispatch actions.

**Q19: What is initial state?**
A: Initial state is the state of the application when it first loads, before any actions have been dispatched.

**Q20: Can we have multiple slices in Redux Toolkit?**
A: Yes, we can have multiple slices, each managing a different part of the state.

**Q21: How do you combine multiple reducers in Redux Toolkit?**
A: Using configureStore(), which automatically combines the reducers you pass into the reducer object.

**Q22: What is the difference between React state and Redux state?**
A: React state is local to a component, while Redux state is global and accessible to any component in the app.

**Q23: When should you use Redux?**
A: When you have large amounts of application state that are needed in many places, or when state updates are complex.

**Q24: What is a pure function?**
A: A pure function is a function that always returns the same result for the same inputs and has no side effects.

**Q25: Are reducers pure functions?**
A: Yes, reducers must be pure functions.

**Q26: What are side effects in Redux?**
A: Side effects are things like API calls, modifying the DOM directly, or logging. Reducers should not have side effects.

**Q27: What is createAsyncThunk()?**
A: createAsyncThunk() is a Redux Toolkit function that helps create async action creators for handling asynchronous logic like API calls.

**Q28: Did we use createAsyncThunk() in this lab?**
A: No, we didn't need asynchronous operations for this simple CRUD app with mock data.

**Q29: What is the purpose of the slice name in createSlice()?**
A: The slice name is used as a prefix for all action types generated for this slice, making them unique.

**Q30: How do you generate unique IDs for new items in Redux?**
A: We used Date.now() to generate unique timestamps as IDs in this lab.

**Q31: What is the purpose of the key prop in React lists?**
A: The key prop helps React identify which items have changed, are added, or are removed, improving performance.

**Q32: Why do we wrap our app with Provider in main.jsx?**
A: The Provider component makes the Redux store available to all components in the component tree.

**Q33: What is Redux DevTools?**
A: Redux DevTools is a browser extension that lets you time-travel debug and inspect the state and actions of your Redux app.

**Q34: Does configureStore() enable Redux DevTools by default?**
A: Yes, configureStore() automatically sets up the Redux DevTools integration.

**Q35: What middleware does configureStore() include by default?**
A: configureStore() includes redux-thunk by default, which lets you write async logic that interacts with the store.

## 7. Line-by-Line Code Explanation (Simplified)
(Please refer to comments in each individual file for detailed explanations of every line)

## 8. Objective Satisfaction
1. **Understand global state management**: Achieved via centralized store and shared state between components
2. **Implement Redux Toolkit**: Achieved via createSlice, configureStore, and React-Redux hooks
3. **Design a normalized state structure**: Achieved by posts referencing platformId instead of storing platform names directly
4. **Handle asynchronous data flow (optional)**: Not implemented in this simple lab, but can be added with createAsyncThunk() if needed
