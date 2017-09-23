import React from 'react';
import { List, Icon } from 'semantic-ui-react'
const UserList = ({users,onClick}) => {
    return (
        <List>
            {users.map(user=>
            
             <List.Item  key={user}>
                <Icon name="user circle"/>
                <List.Content>
                    <List.Header as='a' onClick={onClick} >{user}</List.Header>
                </List.Content>
            </List.Item>
            )}
        </List>
    );
}

export default UserList;