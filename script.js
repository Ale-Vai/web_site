let URL= "https://dogapi.dog/api/v2/facts?limit=100"

let Group = 'https://dogapi.dog/api/v2/groups'

let breedlist ='https://dogapi.dog/api/v2/breeds'




let menu = document.querySelector('#menu');

let navbar = document.querySelector('.header .flex .navbar')

let el = document.querySelector("#ol")

let paragraph = document.querySelector('#failed')

let div = document.querySelector('.dog-groups')

let flex = document.querySelector("#breeds .flex")

let count = 2;

menu.onclick = () =>{
    if( count %2 ==1){
        navbar.style.display = "none"
    }
    if (count % 2 == 0){
        navbar.style.display = "block";
    }
    count++;
}





async function facts (){
    for(let i = 1; i <= 10; i++){
        let promise = await fetch(URL);
        console.log(promise);
        if(promise){
            
        }
        else{
            paragraph.innerText = "Failed to Fetch"
        }
        let data = await promise.json();
        console.log(data.data[0].attributes.body)
        let br = document.createElement('br')
        let para = document.createElement("li")
        para.innerHTML = data.data[0].attributes.body
        el.append(para); 
        para.after(br);
    }
}facts();

async function Groups (){
    let response = await fetch(Group)
    console.log(response)
    let newresponse = await response.json();
    console.log(newresponse)
    console.log(newresponse.data.length)
    for ( let i = 0; i < newresponse.data.length; i++){
        console.log(newresponse.data[i].attributes.name)
        let newdiv = document.createElement('div')
        newdiv.className = "dog-items"
        let heading = document.createElement('h3');
        let orderlist = document.createElement('ol')
        orderlist.className = "dog-list"
        heading.innerText = newresponse.data[i].attributes.name;
        newdiv.prepend(heading)
        for(let j = 0; j < 5 ;j++ ){
            let breedname = newresponse.data[i].relationships.breeds.data[j].id
            let name = await fetch(`https://dogapi.dog/api/v2/breeds/${breedname}`)
            console.log(name)
            let newname = await name.json();
            console.log(newname.data.attributes.name)
            let list = document.createElement('li')
            list.innerText = newname.data.attributes.name
            orderlist.append(list);
        }
        newdiv.append(orderlist);
        div.append(newdiv)
    }
}Groups();

async function breeds (){
    let breed = await fetch(breedlist);
    console.log(breed)
    let newbreed = await breed.json();
    console.log(newbreed)
    for (let i = 0; i < 8 ; i++){
        let flexdiv = document.createElement('div')
        flexdiv.className = "flex-items"
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        p1.innerHTML = `<strong>Name:</strong> ${newbreed.data[i].attributes.name}`
        p2.innerHTML = `<strong>Description:</strong>${newbreed.data[i].attributes.description}`
        console.log(newbreed.data[i].attributes.name)
        console.log(newbreed.data[i].attributes.description)
        flexdiv.prepend(p1)
        flexdiv.append(p2)
        flex.append(flexdiv)

    }
}breeds();
