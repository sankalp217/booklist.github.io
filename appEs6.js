//class of Book
class Book {
constructor(title,author,bookid){
        this.title=title;
        this.author=author;
        this.bookid=bookid;
    }
}

//class of UI
class UI {

    addbooktoui(bookdata){

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

    clearfield(){
         
    title.value='';
    author.value='';
    bid.value='';

    }

    deletebook(target){

        if(target.className==='delete'){
            if(confirm(`Are you sure to delete book from list?`))
            {
            target.parentElement.parentElement.remove();
    
            //show msg
            UI.prototype.showerror(`book is deleted`,'success');
           }
    
        }

    }

    showerror(error, className){

        const errorDiv= document.createElement('div');
        errorDiv.className=`alert ${className}`;

        errorDiv.appendChild(document.createTextNode(error));
        
        const heading=document.querySelector('#book-form');
        const container=document.querySelector('.container');

        container.insertBefore(errorDiv,heading);

        setTimeout(clearalert,2000);

    }

}

function clearalert(){
    
    document.querySelector('.alert').remove();
}


//class of localStorage
class store{

    static getbooks(){

        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        } else{
            books=JSON.parse(localStorage.getItem('books'));
        }

        return books;

        // books.forEach(function(bookdata){

        //     const list=document.getElementById('book-list');
        //     //create element for list
        //     const row=document.createElement('tr');
        //     //insert columns in tr 
        //     row.innerHTML=`
        //     <td>${bookdata.title}</td>
        //     <td>${bookdata.author}</td>
        //     <td>${bookdata.bookid}</td>
        //     <td><a href="#" class="delete" >X</a></td>`;

        //     list.appendChild(row);
    
        // });
     
    }

    static addbooks(bookdata){

        // let books;
        // if (localStorage.getItem('books') === null){
        //     books = [];
        // } else{
        //     books=JSON.parse(localStorage.getItem('books'));
        // }

        const books= store.getbooks();

        books.push(bookdata);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static displaybooks(){

        const books= store.getbooks();

        books.forEach(function(bookdata){

            const ui= new UI();
            ui.addbooktoui(bookdata);
        });

    }

    static removebooks(bookid){
        //console.log(bid);

        const books= store.getbooks();

        books.forEach(function(bookdata,index){
            if(bookdata.bookid === bookid){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));


    }
}

//DOM load event
document.addEventListener('DOMContentLoaded',store.displaybooks);

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
        ui.showerror('Please enter detailes of book.','warning');
    }
    else{
        //add book to list & msg for done
        ui.addbooktoui(bookdata);

        //add book to local storage
        store.addbooks(bookdata);

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

    //remove from local storage
    store.removebooks(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();

});
