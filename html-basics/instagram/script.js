let posts = [
    {
        'author': 'Velizar',
        'image': '1.jpg',
        'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, cumque ab. Ipsa sint itaque.',
        'location': 'Lippstadt',
        'liked': false,
        'likes': 421,
        'comments': [],
    },
    {
        'author': 'Boris',
        'image': '2.jpg',
        'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, cumque ab. Ipsa sint itaque.',
        'location': 'Berlin',
        'liked': false,
        'likes': 232,
        'comments': [],
    },
    {
        'author': 'Vivian',
        'image': '3.jpg',
        'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, cumque ab. Ipsa sint itaque.',
        'location': 'München',
        'liked': false,
        'likes': 312,
        'comments': [],
    },
    {
        'author': 'Marcel',
        'image': '4.jpg',
        'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, cumque ab. Ipsa sint itaque.',
        'location': 'Dortmund',
        'liked': false,
        'likes': 211,
        'comments': [],
    },
    {
        'author': 'Daniela',
        'image': '5.jpg',
        'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, cumque ab. Ipsa sint itaque.',
        'location': 'Hamm',
        'liked': false,
        'likes': 122,
        'comments': [],
    },
];


function render() {
    displayPosts();
}


function displayPosts() {

    let mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';
    loadFromLocalStorage();
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        mainContainer.appendChild(generateHtml(element, i));
        displayComments(element, i);
    }
}


function generateHtml(element, index) {

    let post = document.createElement('div');
    post.classList.add('post-container');

    post.innerHTML += /*html*/`<div class="author-container"><h5>${element.author}</h5></div><div class="location">${element.location}</div><div class="img-container"><img src="./img/${element.image}" alt=""></div><div class="links-container"><div class="buttons-container"><button class="like-btn" onclick="like(${element.liked},${index})"><i id="like-btn-icon${index}"  class="far fa-heart ${element.liked ? 'liked' : 'unliked'}"></i></button><button class="comment-btn"><i class="far fa-comment"></i></button><button class="share-btn"><i class="fas fa-location-arrow"></i></button></div><div class="buttons-container"><button class="save-btn"><i class="far fa-bookmark"></i></button></div></div><div class="likes">${element.likes} <span>likes</span></div><div class="description-container"><p>${element.description}</p></div><div id="post-comments${index}" class="comments-container"></div><div class="form-container"><input id="comment-input${index}" class="add-comment" placeholder="Add comment..." type="text"><button class="add-comment-btn" onclick="addComment(${index})">Add</button></div>`;
    return post;
}


function addComment(index) {

    let commentInput = document.getElementById(`comment-input${index}`).value;
    if (!commentInput == "") {
        let post = posts[index];
        post.comments.push(commentInput);
        saveInLocalStorage();
        displayPosts();
    }
}


function displayComments(element, index) {

    let postCommentsContainer = document.getElementById(`post-comments${index}`);
    for (let i = 0; i < element['comments'].length; i++) {
        const comment = element['comments'][i];
        let comentAsText = comment.toString()
        postCommentsContainer.innerHTML += `<div class="comment-container"><p>${comentAsText}</p></div>`
    }
}


function saveInLocalStorage() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);
}


function loadFromLocalStorage() {
    let postsAsText = localStorage.getItem('posts');
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


function like(liked, index) {
    if (!liked) {
        posts[index].liked = true;
        posts[index].likes++;
    } else {
        posts[index].liked = false;
        posts[index].likes--;
    }
    saveInLocalStorage();
    displayPosts();
}