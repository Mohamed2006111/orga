let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create'
let tmp;


function totalprice()
{
if(price.value != ''){
    let result = +price.value + +taxes.value + +ads.value - discount.value

    total.innerHTML = result
    total.style.background = 'green'
}else{
    total.innerHTML = ''
    total.style.background = '#ff0000'
}
       
}
let datapro = []
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = []
}


submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        price:price.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != ''&& price.value != ''&&category.value != ''&& newpro.count < 100){
 if( mood === 'create'){
          if(newpro.count > 1){
            for(i = 0; i <newpro.count ; i++){
                datapro.push(newpro)
            }
        }else{
            datapro.push(newpro)
        }
     
    }else{
        datapro[tmp] = newpro
        mood = 'create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }


    cleardata()
    }

   
 

    
    localStorage.setItem ('product' ,JSON.stringify(datapro))
    console.log(datapro)
   
    getdata()
}
function cleardata(){
    title.value = '';
    price.value ='';
    taxes.value ='';  
    ads.value ='';
    discount.value ='';
    category.value ='';
    count.value ='';
    

}
function getdata(){
    totalprice()
let table = ' '
for(i = 0 ; i < datapro.length ; i++){
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick='update(${i})' id="update">Update</button></td>
    <td><button onclick="deletepro(${i})" id="delete">Delete</button></td>
</tr>
    `
}


document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById('deleteall')
if(datapro.length > 0 ){
    btndelete.innerHTML =`
    <button onclick='deleteall()'>Delete All(${datapro.length})</button>
`}else{
    btndelete.innerHTML = ''
}
}

getdata()
function deletepro(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    getdata()
}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    getdata()
}
function update(i){
    
    title.value =datapro[i].title
    price.value =datapro[i].price
    taxes.value =datapro[i].taxes
    ads.value =datapro[i].ads
    discount.value =datapro[i].discount
    totalprice();
    count.style.display = 'none'
    submit.innerHTML = 'Update'
    category.value =datapro[i].category
    mood = 'update'
  tmp = i
scroll({
    top:0,
    behavior: 'smooth'
    
})


   
}

let searchmood = 'title'

function getsearchmode(id){
 let search = document.getElementById('search')
    if(id === 'search title'){
        searchmood = 'title'
        search.placeholder = 'search by title'
    }else{
        searchmood = 'category'
        search.placeholder = 'search by category'

    }
   
    search.focus()
    search.value = ''
    getdata()

}

function searchdata(value){
    let table = ''
   if(searchmood == 'title'){
for(let i = 0 ; i < datapro.length ; i++){
    if(datapro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick='update(${i})' id="update">Update</button></td>
        <td><button onclick="deletepro(${i})" id="delete">Delete</button></td>
    </tr>
        `

    }
}











   }else{for(let i = 0 ; i < datapro.length ; i++){
    if(datapro[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick='update(${i})' id="update">Update</button></td>
        <td><button onclick="deletepro(${i})" id="delete">Delete</button></td>
    </tr>
        `
    }
    }

   }
   document.getElementById('tbody').innerHTML = table;
}
