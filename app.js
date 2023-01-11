//book constructor

function Book(title,author,bookid){
    this.title=title;
    this.author=author;
    this.bookid=bookid;
    //console.log(`this bookname is ${title} of author ${author} which have an id ${bookid}.`)
}


//UI constructor
function UI(){

    //console.log('inside UI func');
}

//UI prototype of add book to list ui
UI.prototype.addbooktoui=function(bookdata){
    //console.log(bookdata);

    const list=document.getElementById('book-list');
    //create element for list
    const row=document.createElement('tr');
    //insert columns in tr 
    row.innerHTML=`
    <td>${bookdata.title}</td>
    <td>${bookdata.author}</td>
    <td>${bookdata.bookid}</td>
    <td><a href="#" class="delete" >X</a></td>`;

    list.appendChild(row);

}

//UI prototype of clearfield if inputs
UI.prototype.clearfield=function(){
    
    title.value='';
    author.value='';
    bid.value='';
}

//UI prototype of delete any book
UI.prototype.deletebook=function(target){
    if(target.className==='delete'){
        if(confirm(`Are you sure to delete book from list?`))
        {
        target.parentElement.parentElement.remove();

        //show msg
        UI.prototype.showerror(`book is deleted`,'success');
       }

    }
}

//validate function
UI.prototype.showerror=function (error, className){

    const errorDiv= document.createElement('div');
    errorDiv.className=`alert ${className}`;

    errorDiv.appendChild(document.createTextNode(error));
    
    const heading=document.querySelector('#book-form');
    const container=document.querySelector('.container');

    container.insertBefore(errorDiv,heading);

    setTimeout(clearalert,2000);
}

function clearalert(){
    
    document.querySelector('.alert').remove();
}

//Event listener of submit btn
document.getElementById('book-form').addEventListener('submit',function(e){

    //get form values..
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const bookid=document.getElementById('bid').value;

    //initiate book
    const bookdata= new Book(title,author,bookid);

    //console.log(bookdata);

    //initiate ui
    const ui= new UI();

    //validate input
    if(title===''|| author===''|| bookid===''){
        //show error
        ui.showerror('Please enter detailes of book.','error');
    }
    else{
        //add book to list & msg for done
        ui.addbooktoui(bookdata);
        ui.showerror('Book added in list','success');
    }

    ui.clearfield();

    e.preventDefault();
});

//Event listener of delete btn
document.getElementById('book-list').addEventListener('click',function(e){

    

    //initiate ui
    const ui= new UI();

    //delete book
    ui.deletebook(e.target);

    e.preventDefault();

});
