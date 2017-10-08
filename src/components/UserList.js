import React from 'react';
import {List, Icon, Header,Button} from 'semantic-ui-react'



const UserList = ({users, onClick,audioContext}) => {
    console.log(users)
    return (
       <div className="userList-container">
           <Header color="blue" inverted >Users</Header>
           <div className="userList">
                 
                <List verticalAlign='middle'>
                    {users.map((user,i) => <List.Item key={i}>
                        <List.Content floated='right'>
                          {/*   <Icon size="large" name='microphone' color="red"/> */}
                            <Button size="tiny" circular icon='microphone' color="red" onClick={()=>onClick(user.username)} />
                        </List.Content>
                        
                        
                        <List.Content verticalAlign='middle'>
                            
                            <List.Header
                                as='a'
                                style={{
                                color: "white"
                            }}>
                               {user.username}
                            </List.Header>
                           
                        </List.Content>

                    </List.Item>)}
                </List>
            </div>
       </div>
            
       

    );
}

export default UserList;