import React, {Component} from 'react';

import {Redirect} from 'react-router-dom'
import {
    Container,
    Header,
    Form,
    Input,
    Grid,
    Icon
} from 'semantic-ui-react'

class Home extends Component {
    state = {
        error: "",
        redirect: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
       
        if (this.state.room) {
            console.log(this.props)
            this.setState({ redirect: <Redirect to={`room/${this.state.room}`}/>})
        } else {
            //this.setState({error: "Room is required"})
        }
    }
    render() {

        if (this.state.redirect) {
            return this.state.redirect
        }
        return (
            <div
                style={{
                margin: "160px auto",
                textAlign: "center"
                
            }}>
                <Container textAlign="center" >

                    <Grid centered >
                        
                        <Form onSubmit={this.handleSubmit}>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='users' circular color="teal" inverted/>
                                <Header.Content>
                                    Chat
                                </Header.Content>
                            </Header>
                            <Form.Field >
                                <Input  
                                    onChange={(e)=>{this.setState({room:e.target.value})}}
                                    action={{color:"teal",content:"Start" ,type:"submit" }} 
                                    placeholder="Choose a room name" 
                                    label={{ color:"teal", content: 'Ramble /' }}/>
                            </Form.Field>
                        </Form>
                        
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Home;