import React from 'react';



const VideoGrid = ({peers}) => {

  
    console.log(peers)
    

    return (
            <div className="video-wrapper"> 
                
                 {peers.map((p,i)=>
                   
                  
                    <video 
                    src={p.stream?URL.createObjectURL(p.stream):""}
                    poster={`https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fwebsite-icons%2F512%2FUser_Avatar-512.png&imgrefurl=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F176688%2Faccount_avatar_login_man_person_user_icon&docid=-wCXNU4l0iPxMM&tbnid=NBR52CQNMPtYOM%3A&vet=10ahUKEwjt8YuPntPWAhVChlQKHd0fACsQMwjWASgQMBA..i&w=512&h=512&bih=803&biw=1600&q=user%20avatar%20images&ved=0ahUKEwjt8YuPntPWAhVChlQKHd0fACsQMwjWASgQMBA&iact=mrc&uact=8`}
                    autoPlay></video>
                   
                 )}
                 
            </div>  
    );
}

export default VideoGrid;