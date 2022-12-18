import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const DefaultGroup = ({ posts, setShowForm, setPostId, showForm }) => {
    return (
        <>
            <Container style={{ marginTop: "3rem" }} data-testid="accordionId">
                {posts?.map(({ id, author, location, time, text }) => {
                    return (
                        <div key={id}>
                            <Accordion className="accordion">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="accordionHeader">
                                    <Typography variant="h6">
                                        {id} {author}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className="accordionDetails">
                                    <Typography variant="h6">
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        }).format(time)}
                                    </Typography>
                                    <Typography>
                                        <span>Text :</span> {text}
                                    </Typography>
                                    <Typography>
                                        <span>Author :</span> {author}
                                    </Typography>
                                    <Typography>
                                        <span>Location :</span> {location}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        className="accordionBtn"
                                        data-testid="accordionBtn"
                                        onClick={() => {
                                            setShowForm(!showForm);
                                            setPostId(id);
                                        }}
                                        startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    );
                })}
            </Container>
        </>
    );
};

export default DefaultGroup;
