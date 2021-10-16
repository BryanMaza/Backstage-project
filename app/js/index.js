let colors = [" #00c1b5", "#ff651a", "#ffbe00", "#1d3fbb", "#e30512"];
let cont = 0;
let isScrolling = false;
let app = document.querySelector(".App");
let items = document.querySelectorAll(".book");
let issues = document.querySelectorAll(".issue");
let frameStarts = [];

const changeBgColorMobile = () => {
  let top = window.pageYOffset || document.documentElement.scrollTop;
  items = document.querySelectorAll(".book");
  if (window.innerWidth < 1024) {
    items.forEach((item, index) => {
      if (
        top >= item.offsetTop - item.offsetHeight / 5 &&
        top <= item.offsetTop + item.offsetHeight / 3
      ) {
        changeColor(index);
        cont = index;
      }
    });
  }
};

const addAnimationScrollDesktop = (e) => {
  items = document.querySelectorAll(".book");
  issues = document.querySelectorAll(".issue");

  if (!isScrolling && window.innerWidth >= 1024) {
    if (e.deltaY < 0 && cont > 0) {
      slide(items, frameStarts[cont - 1]);
      changeColor(cont - 1);
      cont--;
    } else if (e.deltaY > 0 && cont < 4) {
      slide(items, frameStarts[cont + 1]);
      changeColor(cont + 1);
      cont++;
    }
    showcurrentIssue(issues, cont);
  }

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 600);
};

const changeColor = (value) => {
  app.style.backgroundColor = colors[value];
};

const showcurrentIssue = (array, cont) => {
  array.forEach((item) => {
    item.classList.remove("active");
  });
  array[cont].classList.add("active");
};

const slide = (items, position) => {
  items.forEach((item) => {
    item.style.transform = `translate3d(0px, -${position}px, 0px)`;
  });
};

const handlerIssues = () => {
  let issues = document.querySelectorAll(".issue");
  let items = document.querySelectorAll(".book");

  items.forEach((item, index) => {
    frameStarts[index] = item.offsetTop;
  });

  issues.forEach((issue, index) => {
    issue.addEventListener("click", () => {
      if (index <= cont) {
        changeColor(index);
        slide(items, frameStarts[index]);
        cont = index;
      } else {
        changeColor(index);
        slide(items, frameStarts[index]);
        cont = index;
      }
      showcurrentIssue(issues, cont);
    });
  });
};

const removeTransitionsBooks = (items) => {
  items.forEach((item) => {
    item.classList.add("normal");
  });
  changeColor(0);
};

const addTransitionsBooks = (items) => {
  items.forEach((item) => {
    item.classList.remove("normal");
  });
};

const init = () => {
  if (document.readyState === "complete") {
    window.addEventListener("scroll", changeBgColorMobile, false);
    app = document.querySelector(".App");
    app.addEventListener("mousewheel", addAnimationScrollDesktop, false);
    handlerIssues();

    window.onresize = () => {
      items.forEach((item, index) => {
        frameStarts[index] = item.offsetTop;
      });
      if (window.innerWidth < 1024) {
        removeTransitionsBooks(items);
      } else {
        addTransitionsBooks(items);
        slide(items, frameStarts[cont]);
        changeColor(cont);
      }
    };
  }
};

document.addEventListener("readystatechange", init);
