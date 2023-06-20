class Papers {


  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;
  mouseX = 0;
  mouseY = 0;
  velocityX = 0;
  velocityY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener("mousedown", (e) => {
      console.log("Mousedown");

      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }


      console.log(this.prevMouseX);
      console.log(this.prevMouseY);
    });

    document.addEventListener("mousemove", (e) => {
      console.log("MouseMove");

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velocityX = this.mouseX - this.prevMouseX;
      this.velocityY = this.mouseY - this.prevMouseY;

      if (this.holdingPaper) {
        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    window.addEventListener("mouseup", (e) => {
      console.log("MouseUp");
      this.holdingPaper = false;
    });
  }
}

let highestZ = 1;
const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Papers();
  p.init(paper);
});





const nameDiv = document.querySelector('.name');
const name = prompt("Please enter your name:");

if (name) {
  const nameHeader = document.createElement('h1');
  nameHeader.textContent = name;
  nameDiv.appendChild(nameHeader);
  nameDiv.style.fontFamily = "Arial, sans-serif"; // Change the font family as desired
} else {
  alert("Name is required!");
}
