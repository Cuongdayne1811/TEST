const buttonsStatus  = document.querySelectorAll("[button-status]"); //thuộc tính tự định nghĩa thì thêm ngoặc vuông vào

if(buttonsStatus.length > 0){
    let url = new URL(window.location.href);
    // console.log(url);
    buttonsStatus.forEach((button)=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status);
            }else{
                url.searchParams.delete("status");
            }
            // console.log(url.href);
            //chuyển hướng sang trang mới
            window.location.href = url.href;
        })
    });
}

//Form Search
const formSearch = document.querySelector("#form-search");
// console.log(formSearch);
let url = new URL(window.location.href);
formSearch.addEventListener("submit",(event)=>{
    const keyword = event.target.keyword.value;
    if(keyword){
        url.searchParams.set("keyword",keyword);
    }else{
        url.searchParams.delete("keyword");
    }
    console.log(url);
    window.location.href = url.href;
    //preventDefault để tránh trường hợp khi submit bị load lại trang 
    event.preventDefault();
    // console.log(event.target.keyword.value);
});


//pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
// console.log(buttonPagination);
if(buttonPagination){
    buttonPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page",page);
            window.location.href = url.href;
                })
    })
}


//end pagination 


//SHOW ALERT 
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close_alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
        
    },time);
     // Kiểm tra xem `closeAlert` có giá trị hay không

    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    });
}



//END SHOW ALERT


//UPLOAD IMAGE
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        console.log(e);
    })
}
//END UPLOAD IMAGE
