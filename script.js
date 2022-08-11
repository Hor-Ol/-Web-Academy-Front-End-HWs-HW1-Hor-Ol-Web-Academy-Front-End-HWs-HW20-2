class Circle {
  constructor(selector) {
    this.elem = document.querySelector(selector);
    this.movement = Promise.resolve(true);
  }

  moveToPosition(e) {
    let circleCurrCoord = this.elem.getBoundingClientRect();
    let clickX = e.clientX;
    let clickY = e.clientY;
    let moveX = clickX - circleCurrCoord.x;
    let moveY = clickY - circleCurrCoord.y;
    this.elem.style.transform = `translateX(${
      circleCurrCoord.x + moveX - 100
    }px) translateY(${circleCurrCoord.y + moveY - 100}px)`;
  }

  move(e) {
    this.movement = this.movement.then(
      () =>
        new Promise((resolve) => {
          this.moveToPosition(e);
          this.elem.addEventListener('transitionend', () => resolve(true), {
            once: true,
          });
        })
    );
  }
}

const circle = new Circle('#circle');

document.addEventListener('click', function (e) {
  circle.move(e);
});
