import React from 'react';
import {List, Icon, Header} from 'semantic-ui-react'
const UserList = ({users, onClick}) => {
    console.log(users)
    return (
       <div className="userList-container">
           <Header color="blue" inverted >Conversation</Header>
           <div className="userList">
                 
                <List verticalAlign='middle'>
                    {users.map((user,i) => <List.Item key={i}>
                        <List.Content floated='right'>
                            <Icon size="large" name='microphone' color="red"/>
                        </List.Content>
                        <Icon name="user circle" size="large"/>
                        <List.Content verticalAlign='middle'>
                            <List.Header
                                as='a'
                                style={{
                                color: "white"
                            }}>
                               dasdbhkahjdahjkfhajkfhajk
                            </List.Header>
                        </List.Content>

                    </List.Item>)}
                </List>
            </div>
       </div>
            
       

    );
}

export default UserList;