import React from 'react';
import {
    Grid,
    Button,
    Checkbox,
    Form,
    Header,
    Icon
} from 'semantic-ui-react'
const UsernameForm = ({roomname,OnJoin}) => {
    return (
        <div className="user-form">
            <Grid
                textAlign="center"
                columns={3}
                container
              >
                <Grid.Column textAlign="center">
                    <Form inverted 
                        onSubmit={
                            (e)=> {
                                e.preventDefault()
                                const name = e.target.name.value; 
                                OnJoin(name)
                            }

                        }>
                        <Header as='h2' inverted icon textAlign='center'>
                            <Icon name='video camera' circular color="teal" inverted/>
                            <Header.Content>
                                {roomname}
                            </Header.Content>
                        </Header>
                        <Header  as="h6" inverted >
                            Please enter a name to join as a guest
                        </Header>
                        
                        <Form.Field>
                            <label>Name</label>
                            <input name="name" placeholder='Name'/>
                        </Form.Field>
                        <Form.Field>
                            <Button type='submit'>Join</Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>

    );
}

export default UsernameForm;