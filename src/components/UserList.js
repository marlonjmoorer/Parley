import React from 'react';
import {List, Icon, Header} from 'semantic-ui-react'
const UserList = ({users, onClick}) => {
    console.log(users)
    return (
        <div className="userList" >
            <Header color="blue" inverted>Callers</Header>
            <div className="userList">
                <List verticalAlign='middle'>
                    {users.map(user => <List.Item key={user.id}>
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
                                {user.id}
                            </List.Header>
                        </List.Content>

                    </List.Item>)}
                </List>
            </div>
        </div>

    );
}

export default UserList;