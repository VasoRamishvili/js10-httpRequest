let maindiv = document.getElementById('wrapper');

let post = document.getElementById('postt')
let content = document.getElementById('content')
let i =document.getElementById('itag')









function ajax(url,fnc) {
    let request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('load', function() {
        let responsjs = JSON.parse(this.responseText);

        fnc(responsjs)

        // responsjs.forEach(item => {
        //     postdiv(item);
        // });
    });

    request.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    data.forEach(element => {
        postdiv(element)
    });
    

});

function postdiv(item) {
    let div = document.createElement('div');
    div.classList.add("asi")
    div.setAttribute('data-id',item.id)

    let btn =document.createElement('button')
    btn.innerText = 'Delete'
    div.appendChild(btn)
    btn.classList.add('btnn')
    btn.setAttribute('data-delete-id', item.id)

    let titleid = document.createElement('h3');
    titleid.textContent = item.id;

    let titleh2 = document.createElement('h2');
    titleh2.textContent = item.title;

    div.appendChild(titleid);
    div.appendChild(titleh2);
    maindiv.appendChild(div);

    btn.addEventListener('click',function(e){
        e.stopPropagation()
        let dltid = e.target.getAttribute('data-delete-id')
        console.log(dltid);
        let deleteurl = `https://jsonplaceholder.typicode.com/posts/${dltid}`

        fetch(deleteurl,{
            method : "DELETE"
        })
        .then((JSON) => div.remove())
        
    })
    

    div.addEventListener('click', function(){
        let connect = this.getAttribute('data-id')      
        post.classList.add('post2')

        let newurl = `https://jsonplaceholder.typicode.com/posts/${connect}`
        
        ajax(newurl, function(axaliinfo){
            
            console.log(axaliinfo);
            davigale(axaliinfo)
            
        })
    })


    
}


function davigale (item){
    content.innerHTML = " "
    let pp = document.createElement('p')
    pp.innerText = item.body;
    content.appendChild(pp)
}

i.addEventListener('click',function(){
    post.classList.remove('post2')
    
})