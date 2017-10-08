

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
   

   
    visualize(stream) {
        var {canvas,analyser,ctx}=this.state
        var { width, height } = canvas
        
        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount; // half the FFT value
        var dataArray = new Uint8Array(bufferLength);
        ctx.clearRect(0, 0, width, height)
        function draw() {

            requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, width, height);

            ctx.lineWidth = 4;
            ctx.strokeStyle = '#2185d0';

            ctx.beginPath();
            var sliceWidth = width * 1.0 / bufferLength;
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {

                var v = (dataArray[i]+1) / 128.0;
                var y = v * height / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();
        }
        draw();
       

    }
    

    componentDidMount() {
         var {stream}= this.props
         console.log(this.props)
         var canvas=  this.canvas
         var ctx= canvas.getContext('2d')
         var context= new AudioContext    
         var analyser= context.createAnalyser()
         var source=context.createMediaStreamSource(stream)
         source.connect(analyser)
         this.setState({canvas,analyser,ctx},this.visualize)
        
    }
  render() {
   
    return (
        <canvas ref={(canv)=>this.canvas=canv}  style={{ backgroundColor:"black" }}></canvas> 
    )
  }
}

export default Anaylser

