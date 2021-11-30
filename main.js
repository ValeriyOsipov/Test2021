function getData(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let responseObject = JSON.parse(this.responseText);
            let arrayOfUsers = responseObject.results;
            drawList(arrayOfUsers);
        }
    }
}

function initialize(){
    window.addEventListener('load', (e) => {
        addSort();
        getData();
    })
}

function drawList(arrayOfUsers){
    let mainContent = document.querySelector('.main-content')
    for (let i = 0; i < arrayOfUsers.length; i = i + 1) {
        let user = arrayOfUsers[i];
        let listItem = createListItem(i, user);
        mainContent.appendChild(listItem);
    }
}

function createListItem(index, user){
    let name = user.name;
    let picture = user.picture;
    let listItem = document.createElement('div');
    listItem.classList.add(`user${index}`,'preview');
    listItem.addEventListener('click', () => {
        showProfile(user);
    });
    let previewPhoto = document.createElement('div');
    previewPhoto.classList.add('preview-photo');
    previewPhoto.style.backgroundImage = `url("${picture.medium}")`;
    listItem.appendChild(previewPhoto);
    let previewFullName = document.createElement('div');
    previewFullName.classList.add('preview-full-name');
    let previewTitle = document.createElement('p');
    previewTitle.innerText = `${capitalize(name.title)}. `
    let previewName = document.createElement('p');
    previewName.classList.add('preview-name');
    previewName.innerText = `${capitalize(name.first)} ${capitalize(name.last)}`
    previewFullName.appendChild(previewTitle);
    previewFullName.appendChild(previewName);
    listItem.appendChild(previewFullName);
    return listItem;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showProfile(user){
    let profile = createProfile(user);
    document.body.appendChild(profile);
    let shadow = document.createElement('div');
    shadow.classList.add('shadow');
    shadow.addEventListener('click', () => {
        hideProfile();
    });
    document.body.appendChild(shadow);
}

function createProfile(user){
    let name = user.name;
    let picture = user.picture;
    let location = user.location;
    let email = user.email;
    let phone = user.phone;
    let profile = document.createElement('div');
    profile.classList.add('profile');
    let profilePhoto = document.createElement('div');
    profilePhoto.classList.add('profile-photo');
    profilePhoto.style.backgroundImage = `url("${picture.large}")`;
    let profileName = document.createElement('div');
    profileName.classList.add('profile-name');
    profileName.innerText = `${capitalize(name.title)}. ${capitalize(name.first)} ${capitalize(name.last)}`;
    let profileLocation = document.createElement('div');
    profileLocation.classList.add('profile-location');
    profileLocation.innerText = `Location: ${capitalize(location.state)}, ${capitalize(location.city)},
     ${location.street}`;
    let profileEmail = document.createElement('div');
    profileEmail.classList.add('profile-email');
    profileEmail.innerText = `Email: ${email}`;
    let profilePhone = document.createElement('div');
    profilePhone.classList.add('profile-phone');
    profilePhone.innerText = `Phone: ${phone}`;
    profile.appendChild(profilePhoto);
    profile.appendChild(profileName);
    profile.appendChild(profileLocation);
    profile.appendChild(profileEmail);
    profile.appendChild(profilePhone);
    return profile;
}

function hideProfile(){
    let profile = document.querySelector('.profile');
    let shadow = document.querySelector('.shadow');
    document.body.removeChild(profile);
    document.body.removeChild(shadow);
}

function addSort(){
    let select = document.querySelector('.sortSelect');
    select.addEventListener('change', () => {
        if (select.selectedIndex) {
            selectSort(select)
        };
    });
}

function selectSort(select){
    if (select.value == "AZ"){
        sortList("Asc");
    };
    if (select.value == "ZA"){
        sortList("Desc");
    };
}

function sortList(order){
    let switching, sortElements;
    switching = true;
    while (switching){
        switching = false;
        sortElements = [...document.querySelectorAll('.preview-name')];
        for (let i = 0; i < (sortElements.length - 1); i = i + 1){
            if (((order == "Asc") && (sortElements[i].innerText > sortElements[i+1].innerText)) ||
            ((order == "Desc") && (sortElements[i].innerText < sortElements[i+1].innerText))) {
                let userPreview = sortElements[i].parentNode.parentNode;
                userPreview.parentElement.insertBefore(sortElements[i+1].parentNode.parentNode, userPreview);
                switching = true;
                break;
            }
        }
    }
}

initialize();