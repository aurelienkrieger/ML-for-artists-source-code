/**
 this Processing sketch will send its mouse
 position over OSC to the p5.js sketch in the folder "p5-basic".
 you need the library OscP5 to run it.
 */
 
import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

void setup() {
  size(500, 500);
  /* incoming port */
  oscP5 = new OscP5(this, 8000);
  /* outcoming port */
  myRemoteLocation = new NetAddress("127.0.0.1", 12000);
}


void draw() {
  background(0);
}

void oscEvent(OscMessage theOscMessage) {
  /* check if theOscMessage has the address pattern we are looking for. */
  
  if(theOscMessage.checkAddrPattern("/test")==true) {
    /* check if the typetag is the right one. */
    float value = theOscMessage.get(0).floatValue();
    println(" values: "+value); 
  } 
  println("### received an osc message. with address pattern "+theOscMessage.addrPattern());
}
