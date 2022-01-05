class Planet{
   constructor(x,y,radius){
       var options = {
           'restituition':0.5,
           'friction':0.3,
           'density':1.0
       }

   } 

   display(){
       push();
       translate(pos.x,pos.y);
       rotate(angle);
       circleMode(CENTER);
       fill(255);
       pop();   

   }
}