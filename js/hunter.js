const loadPhone = async(searchText, isShowAll) =>{
    const response = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phone = data.data;
    // console.log(phone);
    displayPhones(phone, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent ='';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is isShowAll', isShowAll)
    // display show all button if there are more than 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
         // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML =`
        <figure class=""><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body text-center">
          <h2 class=" text-2xl font-bold text-[#403F3F] ">${phone.phone_name}</h2>
          <p class=" text-lg text-[#403F3F] font-normal py-4">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button onclick="handelShowDetails('${phone.slug}')" class="bg-[#0D6EFD] px-6 py-2 rounded-lg text-white font-semibold text-base">Show Details</button>
          </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);
        toggleLoadingRing(false);

    });
};

// handel Search Button 
const handelSearch = (isShowAll) =>{
    toggleLoadingRing(true);
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// Ring or Loading
const toggleLoadingRing = (isLoading) =>{
    const loadingRing = document.getElementById('loading-ring');
    if(isLoading){
        loadingRing.classList.remove('hidden');
    }
    else{
        loadingRing.classList.add('hidden');
    }
}

// handel Show all Button 
const handelShowAll = () => {
    handelSearch(true);
}

// handel Show  Details  Button 

const handelShowDetails = async(id) => {
    // console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data
    // const showDetailPhoneName = document.getElementById('show-detail-phone-name');
    // showDetailPhoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <figure class="w-full pb-4"><img src="${phone.image}" alt="${phone.name}" class= " m-auto w-2/4"/></figure>
    <div class="w-full">
      <h2 class=" text-2xl font-bold text-[#403F3F] ">${phone.name}</h2>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Storage : </span> ${phone.mainFeatures.storage}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Display Size : </span> ${phone.mainFeatures.displaySize}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Chipset : </span> ${phone.mainFeatures.chipSet}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Memory : </span> ${phone.mainFeatures.memory}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Slug : </span> ${phone.slug}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Release data : </span> ${phone.releaseDate}</p>
      <p class=" text-sm pb-2 text-[#403F3F] font-normal "><span class="text-lg font-semibold">Brand : </span> ${phone.brand}</p>
      <p class=" text-sm pb-5 text-[#403F3F] font-normal "><span class="text-lg font-semibold">GPS : </span> ${phone.others.GPS}</p>

      <div class="card-actions justify-center">
        <button class="bg-[#0D6EFD] px-6 py-2 rounded-lg text-white font-semibold text-base">Close</button>
      </div>
    </div>
    `

    // console.log(phone);
    displayShowDetails();

}

const displayShowDetails =()=>{
    show_details_modal.showModal();
}

 loadPhone(searchText = 'phone');