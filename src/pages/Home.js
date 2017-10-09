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
        redirect: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
       
        if (this.state.room) {
            console.log(this.props)
            this.setState({ redirect:true})
        } else {
            //this.setState({error: "Room is required"})
        }
    }
    render() {
        
        if (this.state.redirect) {
            return <Redirect to={`room/${this.state.room}`}/>
        }
        return (
            <div className="home">
                <Container textAlign="center"  >

                    <Grid centered >
                        
                        <Form onSubmit={this.handleSubmit}>
                            <Header as='h2' inverted icon textAlign='center'>
                                <Icon name='users' circular color="blue" inverted/>
                                <Header.Content >
                                   Parley
                                </Header.Content>
                            </Header>
                            <Form.Field >
                                <Input  
                                    onChange={(e)=>{this.setState({room:e.target.value})}}
                                    action={{color:"blue",content:"Start" ,type:"submit" }} 
                                    placeholder="Choose a room name" 
                                    label={{ color:"blue", content: 'Parley /' }}/>
                            </Form.Field>
                        </Form>
                        
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Home;