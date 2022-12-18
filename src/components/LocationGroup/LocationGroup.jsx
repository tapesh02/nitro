import { useEffect, useState } from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const LocationGroup = ({ posts, groupDropdownValue, setShowForm, setPostId, showForm }) => {
    const locationGroup = posts.reduce((group, locationgroup) => {
        (group[locationgroup.location.replace(/ +/g, "")] =
            group[locationgroup.location.replace(/ +/g, "")] || []).push(locationgroup);
        return group;
    }, {});
    const [locationGroupValues, setLocationGroupValues] = useState(locationGroup);
    const locationGroupEntries = Object.entries(locationGroupValues);

    useEffect(() => {
        setLocationGroupValues(locationGroup);
    }, [groupDropdownValue, showForm]);

    return (
        <>
            <Container style={{ marginTop: "3rem" }}>
                {locationGroupEntries.map(([location, posts]) => {
                    return (
                        <div key={location}>
                            <Accordion className="accordion">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="accordionHeader">
                                    <Typography variant="h6">{location}</Typography>
                                </AccordionSummary>

                                {posts.map(({ id, text, author, location, time }) => {
                                    return (
                                        <div key={id}>
                                            <AccordionDetails className="accordionDetails">
                                                <Typography variant="h6">
                                                    {id} {location}
                                                </Typography>
                                                <Typography>
                                                    <span>Text :</span> {text}
                                                </Typography>
                                                <Typography>
                                                    <span>Author :</span> {author}
                                                </Typography>
                                                <Typography>
                                                    <span>Time :</span>
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit",
                                                    }).format(time)}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    className="accordionBtn"
                                                    onClick={() => {
                                                        setShowForm(!showForm);
                                                        setPostId(id);
                                                    }}
                                                    startIcon={<EditIcon />}>
                                                    Edit
                                                </Button>
                                            </AccordionDetails>
                                        </div>
                                    );
                                })}
                            </Accordion>
                        </div>
                    );
                })}
            </Container>
        </>
    );
};

export default LocationGroup;
