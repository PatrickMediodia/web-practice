const posts = [
    {
        title: 'Post One',
        body: 'This is post one'
    },
    {
        title: 'Post Two',
        body: 'This is post two'
    }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach(post => {
            output += `<li> ${post.title} </li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, cabllback) {
    setTimeout(() => {
        posts.push(post);
        cabllback();
    }, 2000);   
}

createPost({ title: 'Post Three', body: 'This is post three'}, getPosts);