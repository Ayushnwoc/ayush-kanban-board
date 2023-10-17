import React, { useState } from 'react'
import '../styles/NavigationBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setGrouping} from '../redux/slices'

const getOrdering = () => {
  if (localStorage.getItem('ordering') === null) {
    return 'priority';
  } else {
    return localStorage.getItem('ordering');
  }
};

const getGrouping = () => {
  if (localStorage.getItem('grouping') === null) {
    return 'user';
  } else {
    return localStorage.getItem('grouping');
  }
};

const NavigationBar = () => {

  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.data);
  const [dropdown, setDropdown] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState(getGrouping());
  const [selectedOrdering, setSelectedOrdering] = useState(getOrdering());

  const handleDisplayClick = () => {
    setDropdown(!dropdown);
  }

  const handleOptionChange = (str , stri) => {
    // setGrouping(str);
    if (str === 'status') {
      dispatch(setGrouping(tickets.byStatus , stri));
    }
    else if (str === 'priority') {
      dispatch(setGrouping(tickets.byPriority , stri));
    }
    else {
      dispatch(setGrouping(tickets.byUser , stri));
    }
    setSelectedGrouping(str);
    localStorage.setItem('grouping', str);
    console.log(stri);
    setSelectedOrdering(stri);
    localStorage.setItem('ordering', stri);
    handleDisplayClick();
  }



  return (
    <div className='navbar'>
      <div className="dropdown-container">
        <button className="dropdown-btn" onClick={handleDisplayClick}>
          <span className="material-symbols-outlined">
            tune
          </span>
          {" "}
          Display
          {" "}
          <span className="material-symbols-outlined">
            expand_more
          </span>
        </button>
        {dropdown &&
          <div className="dropdown-content">
            <div className="options-container">
              <div className="option">
                <span className='optionFlex'>Grouping:</span>
                <select onChange={(e) => handleOptionChange(e.target.value , selectedOrdering)} value={selectedGrouping}>
                  <option value="user" >User</option>
                  <option value="status" >Status</option>
                  <option value="priority" >Priority</option>
                </select>
              </div>
              <div className="option">
                <span className='optionFlex'>Ordering:</span>
                <select onChange={(e) => handleOptionChange(selectedGrouping , e.target.value)} value={selectedOrdering}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default NavigationBar