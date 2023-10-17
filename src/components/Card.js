import React from "react";
import { useState } from "react";
import "../styles/Card.css";

const Card = ({ id, title, tags, status, priority, cardstatus }) => {
  let displayImg = false;
  if (status === 'Todo' | status === 'Done' | status === 'In progress' | status === 'Cancelled' | status === 'Backlog' | status === 'Urgent' | status === 'Medium' | status === 'Low' | status === 'High' | status === 'No Priority') {
    displayImg = true;
  }
  return (
    <div className="container">
      <div className="cardHeading2" >
        <span style={{ textTransform: "uppercase", color: "darkgrey", fontSize: "14px" }}>
          {id}
        </span>

        {displayImg &&
          <div className="image">
            <img
              src={process.env.REACT_APP_IMAGE_LINK}
              alt="QuickSell"
            />
            <div className="status"></div>
          </div>
        }
      </div>

      <div className="title">
        <div>
            <span className="material-symbols-outlined" >
              {cardstatus === 'Todo' ? 'check_circle' :
                cardstatus === 'Done' ? 'check_circle' :
                  cardstatus === 'In progress' ? 'radio_button_partial' :
                    cardstatus === "Cancelled" ? 'cancel' :
                      cardstatus === "Backlog" ? 'error' : ""}
            </span>
            </div>
        <h5 >{title}</h5>
      </div>

      <div className="tags">
        <div className="tag">
          <span className="material-symbols-outlined">
            {priority === 0 ? 'more_horiz' :
              priority === 1 ? 'signal_cellular_alt_1_bar' :
                priority === 2 ? 'signal_cellular_alt_2_bar' :
                  priority === 3 ? 'signal_cellular_alt' :
                    priority === 4 ? 'priority_high' : ""}
          </span>
        </div>
        {tags?.map((element, index) => {
          return (
            <div key={index} className="tag">
              <span>●</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
