const cns = document.getElementById('game')
const ctx = cns.getContext('2d')
const winnerCheck = (us,cs) => {
    if (us>=5)
    {
        drawText('User has been winner',cns.width/2,100,'#fff')
        
    }else if(cs>=5)
    {
        drawText('Computer has been winner',cns.width/2,100,'#fff')
    }
}
const drawRect = (x,y,w,h,color) => {
    ctx.fillStyle=color
    ctx.fillRect(x,y,w,h)
}
const drawCircleF = (x,y,r,color) => {
    ctx.fillStyle=color
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI,false)
    ctx.closePath()
    ctx.fill()
}
const drawCircleS = (x,y,r,w,color) => {
    ctx.strokeStyle=color
    ctx.lineWidth=w
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.closePath()
    ctx.stroke()
}
const drawText = (text,x,y,color) =>{
    ctx.fillStyle=color
    ctx.font='25px sans-serif'
    ctx.fillText(text,x,y)
}
const user = {
    x: 20,
    y: cns.height/2-50,
    w:10,
    h:100,
    color : '#fff',
    score:0
}
const comp = {
    x: cns.width-30,
    y: cns.height/2-50,
    w:10,
    h:100,
    color : '#fff',
    score:0
}
const ball = {
    x: cns.width/2,
    y: cns.height/2,
    r:13,
    color : '#a51890',
    speed : 10,
    velocityX : 3,
    velocityY : 4,
    stop : true
}
const movePaddle = (e) => {
    let rect = cns.getBoundingClientRect()
    user.y = e.clientY - rect.top - user.h/2
    ball.stop=false
}
cns.addEventListener('mousemove',movePaddle)
const collision = (b,p) => {
b.top = b.y-b.r
b.bottom = b.y+b.r
b.left = b.x-b.r
b.right = b.x+b.r

p.top = p.y
p.bottom = p.y+p.h
p.left = p.x
p.right = p.x+p.w

return (b.top < p.bottom && b.bottom>p.top && b.left<p.right && b.right>p.left)
}
const resetBall = () => {
    ball.x = cns.width/2
    ball.y = cns.height/2
    ball.speed=10
    ball.velocityX=3
    ball.velocityY=4
    ball.stop=true
}
const update = () => {
    if(!ball.stop){
    ball.x += ball.velocityX
    ball.y += ball.velocityY
    }
    if(ball.y+ball.r > cns.height || ball.y-ball.r<0){
        ball.velocityY = -ball.velocityY
    }
    let conLvl = 0.1
    comp.y += (ball.y-(comp.y+comp.h/2))*conLvl 
    let player = (ball.x < cns.width/2) ? user : comp
    if(collision(ball,player)){
        let intersectY = ball.y - (player.y+player.h/2)
        intersectY /= player.h/2
        let maxBounceRate = Math.PI/3
        let bounceAngle = intersectY * maxBounceRate
        let direction = (ball.x<cns.width/2) ? 1 : -1

        ball.velocityX = direction * ball.speed * Math.cos(bounceAngle)
        ball.velocityY = ball.speed * Math.sin(bounceAngle)
        ball.speed+=0.5
    }
    if(ball.x>cns.width){
        user.score++
        resetBall()
    }else if(ball.x<0){
        comp.score++
        resetBall()
    }
}
const render = () =>{
    drawRect(0,0,cns.width,cns.height,'#008374')
    drawRect(cns.width/2-2,0,4,cns.height,'#fff')
    drawCircleF(cns.width/2,cns.height/2,10,'#fff')
    drawCircleS(cns.width/2,cns.height/2,50,4,'#fff')
    drawText(user.score,cns.width/4,100,'#fff')
    drawText(comp.score,3*cns.width/4,100,'#fff')
    drawRect(user.x,user.y,user.w,user.h,user.color)
    drawRect(comp.x,comp.y,comp.w,comp.h,comp.color)
    drawCircleF(ball.x,ball.y,ball.r,ball.color)
    winnerCheck(user.score,comp.score)
}


const game = () => {
    update()
    render()
}
setInterval(game,1000/50)