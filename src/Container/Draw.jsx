import React, { createRef, useEffect , useState } from "react";
function Draw({sizeRef, canvasRef}) {
    const [height, setheight] = useState();
    const [width, setwidth] = useState();
    let canvas;
    let pos = { drawable: false, X: -1, Y: -1 };
    let ctx; 
    useEffect(() => {
        canvas = canvasRef.current; ctx = canvas.getContext("2d");
        
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw); canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
        setheight(sizeRef.current.offsetHeight);
        setwidth(sizeRef.current.offsetWidth);
        console.log(window.innerwidth);
    }, []);
    function initDraw(event) {
        ctx.strokeStyle = "red"
        ctx.beginPath();
        pos = { drawable: true, ...getPosition(event) };
        ctx.moveTo(pos.X, pos.Y);
    }
    function draw(event) {
        if (pos.drawable) {
            pos = { ...pos, ...getPosition(event) };
            ctx.lineTo(pos.X, pos.Y); ctx.stroke();
        }
    }
    function finishDraw() { pos = { drawable: false, X: -1, Y: -1 }; }
    function getPosition(event) {
        return { X: event.offsetX, Y: event.offsetY };
    }
    return (<> <canvas ref={canvasRef} id = "canvers" className = {"canvers"} width={width} height={height} /> </>);
} export default Draw;