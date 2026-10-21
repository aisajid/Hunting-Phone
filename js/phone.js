// https://dummyjson.com/products/category/smartphones
// https://dummyjson.com/products/search?q=phone&utm_source=chatgpt.com
const loadPhone = async (searchText) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}`);
    const data = await response.json();
    const phones = data.products;
    // console.log(phones);
    displayPhones(phones);

}

const displayPhones = phones =>{

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl pt-8 hover:cursor-pointer`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.images[0]}" alt="product-$" class="max-w-[300px]" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.title}</h2>
            <p>${phone.description}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

}


// handle search button: 
const handleSearch = () =>{
    // console.log('search handler');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);

}

const searchField = document.getElementById('search-field');
searchField.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        handleSearch();
    }
})



loadPhone();