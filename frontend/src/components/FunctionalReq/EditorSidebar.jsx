import React from 'react';
import { Link } from 'react-scroll';

const Sidebar = ({ headers }) => {
  const sidebarStyle = {
    width: '200px',
    borderRight: '1px solid black',
    height: '100%',
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const liStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={sidebarStyle}>
      <ul style={ulStyle}>
        {/* Map through headers to create a list item and Link for each */}
        {headers.map(header => (
          <li key={header.key} style={liStyle}>
            <Link to={header.key} smooth={true} offset={-70} duration={500}>
              {header.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;