import { useEffect, useState } from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const AuthorsGroup = ({ posts, groupDropdownValue, setShowForm, setPostId, showForm }) => {
    const authorGroup = posts.reduce((group, authorgroup) => {
        (group[authorgroup.author.replace(/ +/g, "")] = group[authorgroup.author.replace(/ +/g, "")] || []).push(
            authorgroup
        );
        return group;
    }, {});

    const [authorGroupValues, setAuthorGroupValues] = useState(authorGroup);

    const authorGroupEntries = Object.entries(authorGroupValues);

    useEffect(() => {
        setAuthorGroupValues(authorGroup);
    }, [groupDropdownValue, showForm]);

    return (
        <>
            <Container style={{ marginTop: "3rem" }}>
                {authorGroupEntries.map(([author, posts]) => {
                    return (
                        <Container key={author}>
                            <Accordion className="accordion">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="accordionHeader">
                                    <Typography variant="h6">{author}</Typography>
                                </AccordionSummary>

                                {posts.map(({ id, text, author, location, time }) => {
                                    return (
                                        <div key={id}>
                                            <AccordionDetails className="accordionDetails">
                                                <Typography variant="h6">
                                                    {id} {author}
                                                </Typography>
                                                <Typography>
                                                    <span>Text :</span> {text}
                                                </Typography>
                                                <Typography>
                                                    <span>Location :</span> {location}
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
                        </Container>
                    );
                })}
            </Container>
        </>
    );
};

export default AuthorsGroup;
