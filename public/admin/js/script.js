const buttonsStatus  = document.querySelectorAll("[button-status]"); //thuộc tính tự định nghĩa thì thêm ngoặc vuông vào
// console.log(buttonsStatus);

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