import React, { useState } from 'react'
import '../styles/NavigationBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setGrouping, setOrdering } from '../redux/slices'

const NavigationBar = () => {

  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.data);
  const [dropdown, setDropdown] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState('user');
  const [selectedOrdering, setSelectedOrdering] = useState('priority');

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
    setSelectedOrdering(stri);
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