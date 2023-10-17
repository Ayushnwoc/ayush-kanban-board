import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../redux/slices';
import Card from './Card';
import '../styles/HomePage.css';


const StatusColumn = ({ status, data }) => (
    <div className='row'>
        <div className='row-head'>
            <div className='left'>
                {status === 'Todo' ? (
                    <span className="material-symbols-outlined">
                        brightness_1
                    </span>
                ) : status === 'Done' ? (
                    <span className="material-symbols-outlined">
                        check_circle
                    </span>
                ) : status === 'In progress' ? (
                    <span className="material-symbols-outlined">
                        radio_button_partial
                    </span>
                ) : status === "Cancelled" ? (
                    <span className="material-symbols-outlined">
                        cancel
                    </span>
                ) : status === "Backlog" ? (
                    <span className="material-symbols-outlined">
                        error
                    </span>
                ) : status === "Urgent" ? (
                    <div className='tag' style={{height:"10px"}}>
                        <span className="material-symbols-outlined">
                            priority_high
                        </span>
                    </div>
                ) : status === "Medium" ? (
                    <div className='tag' style={{height:"10px"}}>
                        <span className="material-symbols-outlined">
                            signal_cellular_alt_2_bar
                        </span>
                    </div>
                ) : status === "Low" ? (
                    <div className='tag' style={{height:"10px"}}>
                        <span className="material-symbols-outlined">
                            signal_cellular_alt_1_bar
                        </span>
                    </div>
                ) : status === "High" ? (
                    <div className='tag' style={{height:"10px"}}>
                        <span className="material-symbols-outlined">
                            signal_cellular_alt
                        </span>
                    </div>
                ) : status === "No Priority" ? (
                    <div className='tag' style={{height:"10px"}}>
                        <span className="material-symbols-outlined">
                            more_horiz
                        </span>
                    </div>
                ) : (
                    <div className="image">
                        <img
                            src={process.env.REACT_APP_IMAGE_LINK}
                            alt="QuickSell"
                        />
                        <div className="status"></div>
                    </div>
                )}
                <h5>{status}</h5>
                <h5>{data.length}</h5>
            </div>
            <div className='right'>
                <span className="material-symbols-outlined">
                    add
                </span>
                <span className="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        {data.map(item => (
            <Card key={item.id} id={item.id} title={item.title} tags={item.tag} status={status} priority={item.priority} cardstatus={item.status} />
        ))}
    </div>
);

const HomePage = () => {
    const dispatch = useDispatch();

    const tickets = useSelector((state) => state.data);
    // console.log(tickets);

    const getNameById = (userId) => {
        const userObject = tickets.headMapping.find(user => user.id === userId);
        return userObject ? userObject.name : userId;
    };

    useEffect(() => {
        dispatch(fetchTickets());
    }, []);

    return (
        <div className='status-column'>
            {Object.entries(tickets.mainArray).map(([status, data]) => (
                <StatusColumn key={status} status={getNameById(status)} data={data} />
            ))}
        </div>
    )
}

export default HomePage;
