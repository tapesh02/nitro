import { useEffect, useState } from "react";
import { Box, Container, MenuItem, InputLabel, FormControl, Select } from "@mui/material";

import sampleData from "../assets/sampleData.json";
import AuthorsGroup from "../components/AuthorsGroup/AuthorsGroup";
import LocationGroup from "../components/LocationGroup/LocationGroup";
import DefaultGroup from "../components/DefaultGroup/DefaultGroup";

import Form from "../components/Form/Form";

const getLocalData = () => {
    let _posts = localStorage.getItem("posts");
    if (_posts) {
        return JSON.parse(localStorage.getItem("posts"));
    } else {
        return sampleData;
    }
};
const App = () => {
    const [posts, setPosts] = useState(getLocalData());

    const [showForm, setShowForm] = useState(false);
    const [postId, setPostId] = useState("");

    const [groupDropdownValue, setGroupDropdownValue] = useState("All");
    const [groupData, setGroupData] = useState();

    const handleChange = (e) => {
        const value = e.target.value;
        setGroupDropdownValue(value);
    };

    const groups = [
        {
            label: "All",
            value: "All",
        },
        {
            label: "By Authors",
            value: "authors",
        },
        {
            label: "By Locations",
            value: "locations",
        },
    ];

    const groupBy = groups.map((group, index) => (
        <MenuItem key={index} value={group.value}>
            {group.label}
        </MenuItem>
    ));

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [showForm]);

    const switchgrp = () => {
        switch (groupDropdownValue) {
            case "authors":
                return (
                    <AuthorsGroup
                        posts={posts}
                        groupData={groupData}
                        setGroupData={setGroupData}
                        groupDropdownValue={groupDropdownValue}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        setPostId={setPostId}
                    />
                );

            case "locations":
                return (
                    <LocationGroup
                        posts={posts}
                        groupData={groupData}
                        setGroupData={setGroupData}
                        groupDropdownValue={groupDropdownValue}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        setPostId={setPostId}
                    />
                );

            default:
                return (
                    <DefaultGroup posts={posts} showForm={showForm} setShowForm={setShowForm} setPostId={setPostId} />
                );
        }
    };

    return (
        <div>
            {showForm && (
                <Container>
                    <Form
                        setShowForm={setShowForm}
                        showForm={showForm}
                        posts={posts}
                        postId={postId}
                        setPosts={setPosts}
                    />
                </Container>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 100 }}>
                <Container sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small" data-testid="inputLableSelectId">
                            Group By
                        </InputLabel>
                        <Select
                            data-testid="selectId"
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={groupDropdownValue}
                            label="groupby"
                            onChange={handleChange}>
                            {groupBy}
                        </Select>
                    </FormControl>
                </Container>
            </Box>
            <Box>
                <Container>
                    <Box>{switchgrp()} </Box>
                </Container>
            </Box>
        </div>
    );
};

export default App;
