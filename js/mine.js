//holding inputs & btn
let bookmarkBtn= document.querySelector('.bookmark-btn');
let siteName= document.getElementById('site-name');
let siteUrl= document.getElementById('site-url');
let bookmarkList=[];


//check if there is any data on localStorage before or not
if(localStorage.getItem('bookmark') !== null){
    bookmarkList= JSON.parse(localStorage.getItem('bookmark'));
    displayBookmarkData();
}
else{
    bookmarkList= []
}

//bookmark_name validation
function nameValidation() {
    let regex= /^\w{3,}(\s+\w+)*$/;
    console.log(regex.test(siteName.value));
    return regex.test(siteName.value) ? true : false;
}
//bookmark_url validation
function urlValidation() {
    let regex= /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    return regex.test(siteUrl.value) ? true : false;
}

// $(siteName).on('input', function () {
//     $(siteName).css('borderColor', '#eb1d36');
// })


// $(siteName).on('input', function () {
//     $(siteName).css('borderColor', '#eb1d36');
//     $(siteName).css('boxShadow', '0 0 5px 1px #eb1d36');    
// })
// if(nameValidation()){
//     $(siteName).css('borderColor', '#9eb23b');
//     $(siteName).css('boxShadow', '0 0 10px 1px #9eb23b')
// }
// else{
//     $(siteName).css('borderColor', '#eb1d36');  
//     if(!nameValidation()){
//         $(siteName).css('borderColor', '#9eb23b');
//     }
// }


function checkNameInput() {
    $(siteName).on({
        keydown: function () {
            $(siteName).css('borderColor', '#eb1d36');
            $(siteName).css('boxShadow', '0 0 5px 1px #eb1d36');    
            if(nameValidation()){
                $(siteName).css('borderColor', '#9eb23b');
                $(siteName).css('boxShadow', '0 0 10px 1px #9eb23b')
            }  
        },
        keyup: function () { 
            $(siteName).css('borderColor', '#eb1d36');  
            if(!nameValidation() && !urlValidation()){
                $(siteName).css('borderColor', '#9eb23b');
            }
        }
    }) 
}

//onclick on bookmarkBtn --> create new obj of bookmark-data & push it into array(bookmarkList) & localStorage
bookmarkBtn.addEventListener('click', function () {
    if(!nameValidation()) {
        console.log('false name');
        $('.name-alert').removeClass('d-none');
        $('.name-alert').text('Name must start with letters & min_length 5');
    }
    // if(urlValidation() == false) {
    //     let urlError= $('.siteUrl-container').createElement('p');
    //     $(urlError).text('Url must start with capital letter & min_length 5');
    //     $(urlError).addClass('p-3 m-3 bg-danger text-white')
    // }
    if(nameValidation() == true) {
        let bookmarkObj= {
            name: siteName.value,
            url: siteUrl.value
        }  
        bookmarkList.push(bookmarkObj);
        localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
        clearInputs();
        displayBookmarkData();      
    }
  
})
//clear data from inputs
function clearInputs() {
    siteName.value= '';
    siteUrl.value= ''
}
//display data of Bookmark object
function displayBookmarkData() {
    let cartona=``
    for (let i = 0; i < bookmarkList.length; i++) {
        cartona += `<tr>
                        <td>${i+1}</td>
                        <td>${bookmarkList[i].name}</td>
                        <td>
                            <a target="_blank" href="${bookmarkList[i].url}" class="btn visit-btn">
                                <i class="fa-solid fa-eye pe-2"></i>
                                Visit
                            </a>
                        </td>
                        <td>
                            <button onclick="deleteBtn(${i})" class="btn delete-btn">
                                <i class="fa-regular fa-trash-can pe-2"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
    }
    $('tbody').html(cartona);
}
// delete btn function
function deleteBtn(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
    displayBookmarkData();
}
// visit btn
$('.visit-btn').click(function () {
    $('.visit-btn').attr('href', $('.visit-btn').url)
})