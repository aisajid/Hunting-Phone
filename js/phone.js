// https://dummyjson.com/products/category/smartphones
// https://dummyjson.com/products/search?q=phone&utm_source=chatgpt.com
const loadPhone = async (searchText, isShowAll) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}`);
    const data = await response.json();
    const phones = data.products;
    // console.log(phones);
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const noDataFound = document.getElementById('no-data-found');
    if(phones.length === 0){
       noDataFound.classList.remove('hidden');
    }
    else{
        noDataFound.classList.add('hidden');
    }
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log('isShowAll: ',isShowAll);

    // display only first 10 phones
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl pt-8 hover:cursor-pointer`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.images[0]}" alt="product-$" class="max-w-[300px]" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.title}</h2>
            <p>${phone.description}</p>
            <div class="flex items-center justify-between p-5">
            <h4 class="text-xl text-red-500 font-medium">Price: $${phone.price}</h4>
            <h4 class="text-xl text-red-500 font-medium">rating: ${phone.rating}/5</h4>
        
            </div>
            <div class="justify-center px-5">
                <button onclick="handleShowDetails('${phone.id}')" class="btn btn-primary w-full">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle show details 
const handleShowDetails = async (id) => {
    // console.log("Click show Details for id : ", id);
    // load single phone data: 
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await res.json();
    showPhoneDetails(data);

}
const showPhoneDetails = phone => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.title;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img id="show-details-img" src="${phone.images[0]}" alt="products">
    <p class="py-4 text-xl">${phone.description}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Availability: </span> ${phone?.availabilityStatus}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Available Quantity:</span> ${phone?.stock}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Brand:</span> ${phone?.brand}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Category:</span> ${phone?.category}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Dimension: </span> <span>${phone?.dimensions?.width} x ${phone?.dimensions?.height} x ${phone?.dimensions?.depth}</span></p>
    <p class="py-4 text-xl"><span class="font-semibold">Price:</span> $${phone.price}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Rating:</span> ${phone.rating} out of 5</p>
    <p class="py-4 text-xl"><span class="font-semibold">Warranty:</span> ${phone?.warrantyInformation}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Shipping:</span> ${phone?.shippingInformation}</p>
    <p class="py-4 text-xl"><span class="font-semibold">Return Policy:</span> ${phone?.returnPolicy}</p>
    <div class="p-5">
    `
    const reviewsContainer = document.getElementById('reviews-container');
   let count =1;
    for(const review of phone.reviews){
         const div = document.createElement('div');
         div.innerHTML = `
         <br>
          <p class="text-lg font-normal"><span class="font-bold">Reviewer No.</span> ${count}:</p>
          <p class="text-lg font-normal"><span class="font-bold">Name:</span> <span>${review?.reviewerName}</span></p>
          <p class="text-lg font-normal"><span class="font-bold">Email:</span> <span>${review?.reviewerEmail}</span></p>
          <p class="text-lg font-normal"><span class="font-bold">Rating:</span> <span>${review?.rating}</span></p>
          <p class="text-lg font-normal"><span class="font-bold">Comments:</span> <span>${review?.comment}</span></p>
          <p class="text-lg font-normal"><span class="font-bold">Date:</span> <span>${review?.date}</span></p> <br>
         `;
         reviewsContainer.appendChild(div);
         count++;
    }
 
    // show the modal
    show_details_modal.showModal()
}


// handle search button: 
const handleSearch = (isShowAll) => {
    // console.log('search handler');
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);

}


// enter key handler:
const searchField = document.getElementById('search-field');
searchField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
})



// spinner toggle
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all:
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();

