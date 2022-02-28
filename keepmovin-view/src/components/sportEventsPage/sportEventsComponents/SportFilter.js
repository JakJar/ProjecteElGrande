﻿import React, {useState, useEffect, useRef} from 'react';
import "./Filter.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./SportFilter.css";
import {ExpandFilter} from "./Filter";
import Sport from "./Sport";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {clearSport, updateSport} from "../../../features/Sport";


function SportFilter() {

    const dispatch = useDispatch();
    
    const [sports, setSports] = useState([])
    
    const [sportSearch, setSportSearch] = useState("")
    
    useEffect(() => {
        axios
            .get(`/api/sports/${sportSearch}`)
            .then(response => {
                setSports(response.data)
            })
    }, [sportSearch])
    
    
    
    function CheckAllSports() {
        let allSports = document.querySelectorAll(".sport");
            allSports.forEach(sport => {
                if (!sport.children[0].classList.contains("check-icon__toggle")) {
                    sport.children[0].classList.toggle("check-icon__toggle")
                }
            })
        dispatch(updateSport(sports))
    }
    
    function UncheckAllSports() {
        let allSports = document.querySelectorAll(".sport");
        allSports.forEach(sport => {
            if (sport.children[0].classList.contains("check-icon__toggle")) {
                sport.children[0].classList.toggle("check-icon__toggle")
            }
        })
        dispatch(clearSport())
    }
    
    return (
        <div className="filter-parent">
            <div onClick={ExpandFilter} className="filter">
                <div className="filter-type">Sport</div>
                <ExpandMoreIcon className="expand-icon"/>
            </div>
            <div className="filter-sport-expanded-container filter-box">
                <div className="search-bar-sport-filter">
                    <input type="text" className="search-txt-sport-filter" placeholder="Search.."
                           required value={sportSearch}
                           onChange={(e) => {
                               setSportSearch(e.target.value)
                           }}
                           
                    />
                </div>
                <div className="expanded-header">Sports:</div>
                <div className="check-hide-container">
                    <div onClick={CheckAllSports} className="check-hide-all-sports sport-item">Choose All</div>
                    <div onClick={UncheckAllSports} className="check-hide-all-sports sport-item hide-btn">Hide All</div>
                </div>
                {sports.map((sport) =>
                (<Sport key={sport.sportId} sportSelected={sport} id={sport.sportId} type={sport.name}/>))}
            </div>
        </div>
    )
}

export default SportFilter;