/*import React from 'react'

 const Anaylser = ({stream}) => {

    console.log(stream)
    var canvas,analyser, ctx
    var init=()=>{
        console.log(stream)
        canvas= document.querySelector('canvas')
        ctx= canvas.getContext('2d')
        var context= new AudioContext()     
        analyser= context.createAnalyser()
        var source=context.createMediaStreamSource(stream)
        source.connect(analyser)
       // analyser.connect(context.destination)
        looper()
    }

    var looper=()=>{
        window.requestAnimationFrame(looper)
        var fbc_array= new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(fbc_array)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle='#00CCFF'
        var barz=150,x,width, height
        for (var i = 0; i < barz; i++) {
            x=i*3;
            width=7
            height= -(fbc_array[i]/1.1)
            ctx.fillRect(x,canvas.height,width,height)   
        }
    }

    
  return (
    <canvas o ={()=>alert("")} style={{ backgroundColor:"grey" }}></canvas> 
  )
}

export default Anaylser */

import React, { Component } from 'react'

export class Anaylser extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            canvas:null,
            analyser:null,
            ctx:null
        }
    }
   
   
    
    
    init=()=>{
        
      
    }

    looper=()=>{

        var {canvas,analyser,ctx}=this.state
        window.requestAnimationFrame(this.looper)
        var fbc_array= new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(fbc_array)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle='#00CCFF'
        var barz=150,x,width, height
        for (var i = 0; i < barz; i++) {
            x=i*3;
            width=7
            height= -(fbc_array[i]/1.1)
            ctx.fillRect(x,canvas.height,width,height)   
        }
    }

    componentDidMount() {
         var {stream}= this.props
         var canvas= document.querySelector('canvas')
         var ctx= canvas.getContext('2d')
         var context= new AudioContext()      
         var analyser= context.createAnalyser()
         var source=context.createMediaStreamSource(stream)
         source.connect(analyser)
         this.setState({canvas,analyser,ctx},this.looper)
        
    }
  render() {
   
    return (
        <canvas  style={{ backgroundColor:"grey" }}></canvas> 
    )
  }
}

export default Anaylser

