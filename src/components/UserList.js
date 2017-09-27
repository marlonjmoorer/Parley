import React from 'react';
import { List, Icon } from 'semantic-ui-react'
const UserList = ({users,onClick}) => {
    console.log(users)
    return (
        <List divided >
            {users.map(user=>
             <List.Item  key={user.id}>
                <Icon name="user circle"/>
                <List.Content>
                    <List.Header as='a' style={{color:"white"}} >{user.id}</List.Header>
                </List.Content>
            </List.Item>
            )}
        </List>
    );
}

export default UserList;