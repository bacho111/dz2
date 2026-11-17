const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const maxWidth = parentBlock.clientWidth - childBlock.clientWidth;
const maxHeight = parentBlock.clientHeight - childBlock.clientHeight;

const moveBlock = () => {
    if (positionX < maxWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX >= maxWidth && positionY < maxHeight) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionY >= maxHeight && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX <= 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    }
};

moveBlock();

const secondsDisplay = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let seconds = 0;
let intervalId = null;

startBtn.addEventListener('click', () => {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
        seconds++;
        secondsDisplay.textContent = seconds;
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    secondsDisplay.textContent = seconds;
});

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'flex';
    tabItems[index].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent(currentIndex);

const autoSwitchTabs = () => {
    currentIndex++;
    if (currentIndex >= tabContentBlocks.length) {
        currentIndex = 0;
    }
    hideTabContent();
    showTabContent(currentIndex);
};

let sliderInterval = setInterval(autoSwitchTabs, 3000);

tabsParent.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent();
                currentIndex = index;
                showTabContent(currentIndex);

                clearInterval(sliderInterval);
                sliderInterval = setInterval(autoSwitchTabs, 3000);
            }
        });
    }
});
