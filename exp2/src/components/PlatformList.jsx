// Purpose: Component to display list of platforms
// Explanation: Uses useSelector to get platforms from store

import { useSelector } from 'react-redux';

function PlatformList() {
  // Get platforms from store
  const platforms = useSelector(state => state.platforms);

  return (
    <div className="platform-list">
      <h3>Available Platforms</h3>
      <ul>
        {platforms.map(platform => (
          <li key={platform.id}>
            {platform.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformList;
