import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import snowboard from './assets/snowboard.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CreateIcon from '@mui/icons-material/Create';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import EventAxios from '../../services/eventAxios';
import { useNavigate } from 'react-router-dom';
import Comments from '../Comments/Comments'
import { Button, Form } from 'react-bootstrap';
import CommentAxios from '../../services/comments.services';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context'

function Event({ event, updateEvent }) {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const eventInstance = new EventAxios()
    const commentInstance = new CommentAxios()
    const [newComment, setNewComment] = useState({
        eventId: event._id,
        author: user._id
    });

    const updateNewComment = (eventHTML) => {
        const { name, value } = eventHTML.target;
        setNewComment({ ...newComment, [name]: value });
    };

    function deleteEvent(id) {
        console.log("Deleted------->", id)
        eventInstance
            .deleteEvent(id)
            .then(() => navigate("/events"))
            .catch((err) => console.log(err))
    }

    function postComment() {
        commentInstance
            .createComment(newComment)
            .then((newComment) => {
                console.log("soy el nuevo------->", newComment)
                updateEvent()
            })
    }

    function addToFavourites() {

    }

    let comments = false

    function commentEvent() {
        comments ? comments = false : comments = true
        console.log('despues de darle al boton ------>', comments)
    }

    function updateOneEvent(id) {
        navigate(`/event/update/${id}`)
    }
    return (<>
        <Card sx={{ maxWidth: 645 }}>
            <CardMedia
                component="img"
                height="140"
                image={snowboard}
                alt="image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.description}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => deleteEvent(event._id)}> <DeleteIcon /></IconButton>

                <IconButton onClick={() => updateOneEvent(event._id)}> <CreateIcon /></IconButton>
                <IconButton onClick={commentEvent}> <ChatBubbleIcon /></IconButton>


                {/* aqui abajo hay que hacer la llamada al back */}

                <Button>Join this event!</Button>
            </CardActions>
        </Card>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><strong>Make your comment</strong></Form.Label>
            <Form.Control as="textarea" onChange={updateNewComment} name='body' rows={4} placeholder="Description of event" />
            <Button onClick={postComment}>Post comment</Button>
        </Form.Group>

        <Comments comments={event.comments} />
    </>
    )
}
export default Event
