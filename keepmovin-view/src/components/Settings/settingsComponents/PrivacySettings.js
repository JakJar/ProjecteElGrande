import * as React from "react";
import { useEffect, useState } from "react";
import "./Slider.css"
import {useSelector} from "react-redux";

export default function PrivacySettings(props) {
    const theme = useSelector((state) => state.theme.value)
    
    const [privacyDetails, setPrivacyDetails] = useState({
        userId: localStorage.getItem('session'),
        location: false,
        followersFollowing: false,
        statistics: false,
        aboutMe: false,
        upcomingEvents: false,
        previousEvents: false,
        hostedEvents: false,
        photo: false
    })

    useEffect(async () => {
        const response = await fetch("/api/Setting/upload", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "userId": localStorage.getItem('session')

            }
        })
        const content = await response.json()
            .then(content => {
                console.log(content)
                setPrivacyDetails({
                    location: content.location,
                    followersFollowing: content.followersFollowing,
                    statistics: content.statistics,
                    aboutMe: content.aboutMe,
                    upcomingEvents: content.upcomingEvents,
                    previousEvents: content.previousEvents,
                    hostedEvents: content.hostedEvents,
                    photo: content.photo,
                    userId: localStorage.getItem('session')
                })
            })
        
    },[props.buttonState])
    
    
    function HandleSubmit(e) {
        e.preventDefault()
        fetch('/api/Setting/edit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(privacyDetails)
        }).then(response => {
            if (response.ok) {
                props.successModal.current.classList.add('open-modal__settings-validation')
            }
            else {
                props.errorModal.current.classList.add('open-modal__settings-validation')
            }
            window.scrollTo(0, 0);
        })
    }

    return (
        <form className="settings__privacy-container">
            <div className={` ${theme === 'light' ? 'privacy__header' : 'privacy__header__dark' }`}>
                <h2>Privacy</h2>
                <p> These options will allow 
                    You to set up Your privacy policy 
                    to users which are not in Your followers
                    every person which is not added to that 
                    group will be limited to these settings</p>  
            </div>
            
            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Localization</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input 
                        type="checkbox" 
                        id="localization-privacy" 
                        className="toggle" 
                        checked={privacyDetails.location}
                        onChange={e => setPrivacyDetails({...privacyDetails, location: e.target.checked})}/>
                    <label htmlFor="localization-privacy">Hide Localization</label>
                </div>
                <p>Your City and Your country will not be seen for people outside Your 
                    followers group. If You will take part in the
                    event , person who organize current event will 
                    see Your data.</p>
            </div>
            
            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Followers</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="followers-privacy"
                        className="toggle"
                        checked={privacyDetails.followersFollowing}
                        onChange={e => setPrivacyDetails({...privacyDetails, followersFollowing: e.target.checked})}/>
                    <label htmlFor="followers-privacy">Hide Followers</label>
                </div>
                <p>Anyone who does not follow 
                    You will not have access to the accounts 
                    You are following or following You.</p>
            </div>
            
            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Hide Statistics</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="statistics-privacy"
                        className="toggle"
                        checked={privacyDetails.statistics}
                        onChange={e => setPrivacyDetails({...privacyDetails, statistics: e.target.checked})}/>
                    <label htmlFor="statistics-privacy">Hide Statistics</label>
                </div>
                <p>Your statistics, including the number of 
                    events in which You participated or were the organizer, 
                    will be blurred together with the charts 
                    and the percentage results</p>
            </div>

            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>About Me</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="about-me-privacy"
                        className="toggle"
                        checked={privacyDetails.aboutMe}
                        onChange={e => setPrivacyDetails({...privacyDetails, aboutMe: e.target.checked})}/>
                    <label htmlFor="about-me-privacy">Hide AboutMe</label>
                </div>
                <p>The description box on your 
                    profile will be blurred</p>
            </div>

            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Upcoming Events</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="upcoming-privacy"
                        className="toggle"
                        checked={privacyDetails.upcomingEvents}
                        onChange={e => setPrivacyDetails({...privacyDetails, upcomingEvents: e.target.checked})}/>
                    <label htmlFor="upcoming-privacy">Hide Upcoming Events</label>
                </div>
                <p>No one other than your followers 
                    will have access to the list of 
                    events in which you will participate 
                    in the future.</p>
            </div>

            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Previous Events</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="previous-privacy"
                        className="toggle"
                        checked={privacyDetails.previousEvents}
                        onChange={e => setPrivacyDetails({...privacyDetails, previousEvents: e.target.checked})}/>
                    <label htmlFor="previous-privacy">Hide Previous Events</label>
                </div>
                <p>No one other than your followers 
                    will have access to the list of events 
                    in which you have already participated</p>
            </div>

            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Hosted Events</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="hosted-privacy"
                        className="toggle"
                        checked={privacyDetails.hostedEvents}
                        onChange={e => setPrivacyDetails({...privacyDetails, hostedEvents: e.target.checked})}/>
                    <label htmlFor="hosted-privacy">Hide Hosted Events</label>
                </div>
                <p>No one other than your followers
                    will have access to the list of events
                    which you hosted</p>
            </div>

            <div className={` ${theme === 'light' ? 'privacy-container__light' : 'privacy-container__dark' }`}>
                <h4>Photo</h4>
                <div className={`privacy-switch ${theme === 'light' ? 'privacy-switch__light' : 'privacy-switch__dark' }`}>
                    <input
                        type="checkbox"
                        id="photo-privacy"
                        className="toggle"
                        checked={privacyDetails.photo}
                        onChange={e => setPrivacyDetails({...privacyDetails, photo: e.target.checked})}/>
                    <label htmlFor="photo-privacy">Hide Photo</label>
                </div>
                <p>Your profile photo will be blured 
                    and no one who is not Your follower 
                    will not be able to see it</p>
            </div>
            
            <input type="submit"
                   name="submit"
                   id="submit-privacy-settings"
                   onClick={(e) => HandleSubmit(e)}
                   value="Save Changes"/>
        </form>

    )
}

