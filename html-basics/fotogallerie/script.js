let images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg',]

let index = 0;

function render() {

    let content = document.getElementById('content');
    for (let i = 0; i < images.length; i++) {

        const img = images[i];
        content.innerHTML += /*html*/ `<div id="img-container" class="image-container" onclick="showImage(${i})">
        <img src="/img/${img}" alt="">
    </div>`;
    }
}


function showImage(i) {

    let mainContainer = document.getElementById('main-container');
    if (mainContainer) {
        document.body.removeChild(mainContainer);
    }
    index = i;

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('single-image-container');

    imgContainer.innerHTML = /*html*/ `<div id="s-img" class="s-img-container">
    <a href="/index.html" class="back-btn" >Back</a><button id="prev-btn" class="change-img-btn-l" onclick="prevImg()">PREV</button><img id="img"
        src="/img/${images[i]}" alt=""><button id="next-btn" class="change-img-btn-r" onclick="nextImg()">NEXT</button>
</div>`
    document.body.appendChild(imgContainer);
}


function prevImg() {

    let img = document.getElementById('img');
    if (index > 0) {
        img.src = `/img/${images[index - 1]}`;
        index = index - 1;
    }
}


function nextImg() {

    let img = document.getElementById('img');
    if (index < images.length - 1) {
        img.src = `/img/${images[index + 1]}`;
        index++;
    }
}
