import React from 'react'
import {Header}from 'semantic-ui-react'
export default () => {
  return (
    <div className="loading-container">

        <Header inverted as='h2' textAlign='center'>
          
            <div className="loader"></div>
            <br/>
            <Header.Content>
               Joining ...
            </Header.Content>
        </Header>
        
    </div>
  )
}
