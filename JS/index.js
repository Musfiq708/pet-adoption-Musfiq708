const allpets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => allpetscard(data.pets))
        .catch(error => console.log("Api Failed"))
}

const allPetsCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => allPetsCategoryBtn(data.categories))
        .catch(error => console.log("Api Failed"))
}

// if this dont work remove it 

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");

    for (let btn of buttons) {
        btn.classList.remove('bg-[#0E7A811A]', 'border-[#0E7A81]', 'rounded-full')
    };
};

const loadCategoryPets = (name) => {

    const petcardContainer = document.getElementById('pet-card-container');
    petcardContainer.innerHTML = "";
    removeActiveClass();
    document.getElementById('loading-bar').classList.remove('hidden');

    const activeBtn = document.getElementById(`btn-${name}`);

    activeBtn.classList.add('bg-[#0E7A811A]', 'border-[#0E7A81]', 'rounded-full')

    setTimeout(() => {
        document.getElementById('loading-bar').classList.add('hidden');

        fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
            .then(res => res.json())
            .then(data => {

                allpetscard(data.data);

            })
            .catch(error => console.log("Api Failed"))

    }, 2000);

};

// if this dont work remove it ends
// like button work

const petLikebtns = (petID) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`)
        .then(res => res.json())
        .then(data => petimage(data.petData))
        .catch(error => console.log("Api Failed"))

    const petimage = (petData) => {
        const imageContainer = document.getElementById("card-container");
        imageContainer.classList.remove("hidden")
        const imgCard = document.createElement("div");
        imgCard.innerHTML =
            `
<img class="h-[124px] w-[124px] object-cover rounded-lg" src="${petData.image}" alt="">

        `;
        imageContainer.append(imgCard);
    };
};



// like button work end
// modal details card
const petCardDtails = (petID) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`)
        .then(res => res.json())
        .then(data => petCard(data.petData))
        .catch(error => console.log("Api Failed"))

    const petCard = (petData) => {
        const modalContainer = document.getElementById("my_modal_5");
        modalContainer.innerHTML = "";
        const modalCard = document.createElement("div");
        modalCard.innerHTML = `
<div class="modal-box lg:w-[1000px] md:w-auto w-10/12 mx-auto ">
            <img class="w-full object-cover rounded-lg mb-6" src="${petData.image}" alt="">
            <h3 class="text-2xl font-bold text-black mb-4">${petData.pet_name}</h3>
            <div class="grid grid-cols-2 mb-4">
                <div class="flex gap-2">
                    <img src="images/Frame.svg" alt="">
                    <h1 class="font-normal text-base text-[#131313B2]">Breed: ${petData.breed}</h1>
                </div>
                <div class="flex gap-2">
                    <img src="images/Frame (1).svg" alt="">
                    <h1 class="font-normal text-base text-[#131313B2]">Birth: ${petData.date_of_birth}</h1>
                </div>
                <div class="flex gap-2">
                    <img src="images/Frame (2).svg" alt="">
                    <h1 class="font-normal text-base text-[#131313B2]">Gender: ${petData.gender}</h1>
                </div>
                <div class="flex gap-2">
                    <img src="images/Frame (3).svg" alt="">
                    <h1 class="font-normal text-base text-[#131313B2]">Price :${petData.price}$</h1>
                </div>
                <div class="flex gap-2">
                    <img src="images/Frame (2).svg" alt="">
                    <h1 class="font-normal text-base text-[#131313B2]">Vaccinated status:${petData.vaccinated_status}</h1>
                </div>
            </div>
            <hr class="w-full h-px my-2 bg-[#1313131A] border-0 mb-4">
            <p class="text-base font-semibold">Details Information</p>
            <p class="font-normal text-base text-[#131313B2] mb-4">${petData.pet_details}
            </p>
            
                <form method="dialog" class="w-full mx-auto">
                    <!-- if there is a button in form, it will close the modal -->
                    <button
                        class=" py-[9px] w-full  text-lg font-bold rounded-lg border-[2px] border-[#0E7A8126] hover:bg-lime-100 hover:border-lime-500 text-[#0E7A81] ">Cancel
                    </button>
                </form>
            
        </div>

        `;
        modalContainer.append(modalCard);
    };
};
// modal details card ends

// Adopt button modal
const adoptModalFunction = (time) => {
    const modalContainer = document.getElementById("my_modal_6");
    document.getElementById("action-btn").disabled = true ;
      let value = 4;
  const countdown = document.getElementById('countdown');

  const interval = setInterval(() => {
    value--;
    countdown.setAttribute('style', `--value:${value}`);
    countdown.innerText = value;

    if (value <= 0) clearInterval(interval);
  }, 1000);
    setTimeout(() => {
        
        modalContainer.close();
    }, 4000);
}

// Adopt button modal ends
const allpetscard = (cardss) => {

    const petcardContainer = document.getElementById('pet-card-container');
    petcardContainer.innerHTML = "";


    if (cardss.length == 0) {
        petcardContainer.classList.remove("grid");
        petcardContainer.innerHTML =
            `<div class=" lg:w-11/12 mx-auto py-20 px-20 text-center items-center flex flex-col bg-[#13131308]">
        <img src="images/error.webp" alt="">
        <h1 class="text-[32px] font-bold mb-4">No Information Available</h1>
        <p class="text-base font-normal text-[#131313B2]">It is a long established fact that a reader will be distracted by the readable content of a page when looking
            at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`;
    } else {
        petcardContainer.classList.add("grid");
        for (let card of cardss) {

            const cardlist = document.createElement("div");
            cardlist.innerHTML =
                `
    <div class="card bg-base-100  shadow-sm rounded-xl lg:w-[350px] md:w-[330px] w-[350px] mx-auto">
                    <figure class="px-5 pt-5 ">
                        <img  src="${card.image}"
                            alt="Shoes" class="rounded-lg object-cover" />
                    </figure>
                    <div class="card-body items-start text-left">
                        <h2 class="text-xl font-bold">${card.pet_name}</h2>
                        <div class="flex gap-2 font-normal text-base items-center">
                            <img src="images/Frame.svg" alt="">
                            <h1 class="text-[#131313B2]">Breed : ${card.breed ? card.breed : ` Not Registered`}</h1>
                        </div>
                        <div class="flex gap-2 font-normal text-base items-center">
                            <img src="images/Frame (1).svg" alt="">
                            <h1 class="text-[#131313B2]">Birth: ${card.date_of_birth ? card.date_of_birth : ` Not Registered`}</h1>
                        </div>
                        <div class="flex gap-2 font-normal text-base items-center">
                            <img src="images/Frame (2).svg" alt="">
                            <h1 class="text-[#131313B2]">Gender: ${card.gender ? card.gender : ` Not Registered`}</h1>
                        </div>
                        <div class="flex gap-2 font-normal text-base items-center ">
                            <img src="images/Frame (3).svg" alt="">
                            <h1 class="text-[#131313B2]">Price : ${card.price ? card.price : ` Not Registered`}$</h1>
                        </div>

                        <hr class="w-full h-px my-2 bg-[#1313131A] border-0 mb-[-15px]">

                    </div>
                    <div class="mb-3 flex justify-between mx-[20px] ">
                        <button onclick="petLikebtns(${card.petId})"
                            class=" px-[20px] py-[9px] rounded-lg border-[2px] border-[#0E7A8126] hover:bg-lime-100 hover:border-lime-500"><img
                                src="images/like.svg" alt="" class="h-7 w-7 "></button>
                        <button
                        <button onclick="my_modal_6.showModal() ; adoptModalFunction(4)"
                            class=" py-[9px] px-7 text-lg font-bold rounded-lg border-[2px] border-[#0E7A8126] hover:bg-lime-100 hover:border-lime-500 text-[#0E7A81]">Adopt</button>
                        <button 
                        id="action-btn"
                        onclick="my_modal_5.showModal() ; petCardDtails(${card.petId}) "
                            class=" py-[9px] px-7 text-lg font-bold rounded-lg border-[2px] border-[#0E7A8126] hover:bg-lime-100 hover:border-lime-500 text-[#0E7A81]">Details</button>
                    </div>
                </div>
    `;

            petcardContainer.append(cardlist);
        };
    }


};

const allPetsCategoryBtn = (catBtns) => {
    const categoryBtnContainer = document.getElementById("category-btn-container");

    for (let catBtn of catBtns) {
        const catbtnbox = document.createElement("div");
        catbtnbox.innerHTML =
            `
   <button  id=btn-${catBtn.category}
   onclick="loadCategoryPets('${catBtn.category}')" 
                class=" category-btn flex gap-4 items-center py-5  px-15 border-[3px] border-[#0E7A8126] rounded-2xl hover:rounded-full hover:bg-[#0E7A811A] hover:border-[#0E7A81] ">
                <div>
                    <img src="${catBtn.category_icon}" alt="">
                </div>
                <div>
                    <h1 class="font-bold text-2xl">${catBtn.category}</h1>
                </div>
            </button>
   `;
        categoryBtnContainer.append(catbtnbox);
    };
};


setTimeout(() => {
    document.getElementById('loading-bar').classList.add('hidden');
    document.getElementById('pet-card-container').classList.remove('hidden');

}, 3000);


allpets();
allPetsCategory();

