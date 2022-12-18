import "./form.scss";

import { useEffect, useState, useRef } from "react";

const Form = ({ setShowForm, showForm, posts, postId, setPosts }) => {
    const [authorInput, setAuthorinput] = useState("");
    const [locationInput, setLocationInput] = useState("");

    const authorRef = useRef();
    const locationRef = useRef();

    const populateData = () => {
        const preFilledValues = posts.filter((post) => post.id === postId);
        setLocationInput(preFilledValues[0].location);
        setAuthorinput(preFilledValues[0].author);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    return { ...post, author: authorInput, location: locationInput };
                } else {
                    return post;
                }
            })
        );

        setShowForm(!showForm);
    };
    useEffect(() => {
        populateData();
    }, [showForm]);

    const updatePosts = (post) => {
        const updatedPosts = {
            ...JSON.parse(localStorage.getItem("posts")),
            ...post,
        };
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };
    return (
        <>
            <div className="formBg">
                <div className="mainForm">
                    <div className="fromHeader">
                        <h3 className="headerText">
                            Update Details
                            <hr />
                        </h3>
                    </div>
                    <form className="fromSection" onSubmit={handleSubmit}>
                        <div className="authorInputMain">
                            <label htmlFor="authorInputMain"> Author</label>
                            <input
                                type="text"
                                placeholder="enter author full name"
                                name="author"
                                value={authorInput}
                                ref={authorRef}
                                onChange={(e) => setAuthorinput(e.target.value)}
                            />
                        </div>
                        <div className="locationInputMain">
                            <label htmlFor="locationInputMain">Location</label>
                            <input
                                type="text"
                                placeholder="enter location"
                                name="location"
                                value={locationInput}
                                ref={locationRef}
                                onChange={(e) => setLocationInput(e.target.value)}
                            />
                        </div>

                        <div className="mainBtns">
                            <div className="innerBtns">
                                <button className="updateBtn" onClick={() => updatePosts()}>
                                    Update
                                </button>
                                <button onClick={() => setShowForm(!showForm)}>Cancle</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;
