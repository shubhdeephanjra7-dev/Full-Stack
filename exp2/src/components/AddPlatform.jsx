// Purpose: Component to add a new platform
// Explanation: Uses useDispatch to send addPlatform action to store

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlatform } from '../features/platforms/platformsSlice';

function AddPlatform() {
  // State for input field
  const [platformName, setPlatformName] = useState('');
  // Get dispatch function
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // If input is not empty
    if (platformName.trim()) {
      // Dispatch addPlatform action with new platform data
      dispatch(addPlatform({
        id: Date.now(), // Generate unique ID using timestamp
        name: platformName
      }));
      // Clear input field
      setPlatformName('');
    }
  };

  return (
    <div className="add-platform">
      <h3>Add New Platform</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter platform name"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />
        <button type="submit">Add Platform</button>
      </form>
    </div>
  );
}

export default AddPlatform;
