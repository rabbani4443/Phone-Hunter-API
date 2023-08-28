const loadPhone = async(searchText) =>{
    const response = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phone = data.data;
    console.log(phone);
    displayPhones(phone);
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent ='';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display show all button if there are more than 12 phones
    phones = phones.slice(0, 12);

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
            <button class="bg-[#0D6EFD] px-6 py-2 rounded-lg text-white font-semibold text-base">Show Details</button>
          </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);

    });
};

const handelSearch = () =>{
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    // console.log(searchText);
    loadPhone(searchText);
}

 loadPhone(searchText = 'phone');