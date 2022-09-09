//.......... Categories Js.......///
const allCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => categoryList(data.data.news_category))
}

const categoryList = (lists) => {
    const allCategories = document.getElementById('category');
    lists.forEach(list => {
        const { category_name, category_id } = list;
        const createLi = document.createElement('li');
        createLi.innerHTML = `
          <li class="bg-secondary border border-dark px-3 py-3 me-3 rounded">
          <a class="active text-white  fs-5 text" aria-current="page" onclick="thumbnailDetails('${category_id}')" href="#" style="text-decoration:none">${category_name}</a>
          </li>
          `
        allCategories.appendChild(createLi);
    }
    )
}

//..........Thumbnail's Js.........// 

const thumbnailDetails = (category_id) => {
    spinnerLoad(true)

    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then((data) => {
            spinnerLoad(false)
            let localData = data.data

            localData.sort((a, b) => b.total_view - a.total_view)


            allThumbnailDetails(localData);
        })
        .catch((error) => {
            spinnerLoad(false)
            console.log(error)
        })
}

// .......Spinner's Js.....//
const spinnerLoad = isLoading => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

const allThumbnailDetails = (allInfo) => {

    const thumbnailDetails = document.getElementById('thumbnail-info');
    const searchedItem = document.getElementById('searched-item')
    const searchedresult = allInfo.length;
    if (searchedresult <= 0) {
        searchedItem.innerText = 'No Data found'
    }
    else {
        searchedItem.innerText = searchedresult + ' ' + 'Result founded'
    }

    thumbnailDetails.textContent = '';
    allInfo.forEach(data => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.classList.add('h-100');
        createDiv.innerHTML = `
          <div class="card mb-3 rounded border-none" style="width: 100%; height: 200px;">
          <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.image_url}" class="rounded p-2" alt="..." style="width: 100%; height: 200px;">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">${data.title.length > 40 ? data.title.slice(0, 50) + '...' : data.title}</h5>
            <p class="card-text">${data.details.length > 100 ? data.details.slice(0, 100) + '...' : data.details}</p>
            <div class="card-footer mt-5">
            <small class=" d-flex">
            <div class="container mt-3">
              <div class="row">
                  <div class="col">
                  <div class="d-flex">
                      <img src="${data.author.img}" class="rounded-circle" alt="..." style="width: 30px; height: 30px; ">
                      <p>${data.author.name.length > 6 ? data.author.name.slice(0, 6) + '...' : data.author.name}</p>
                      </div>
                   </div>
                  <div class="col d-flex">
                  <i class="fa-solid fa-eye me-1 mt-2"></i> 
                      <p class="mt-1">${data.total_view}</p>
                   </div>
                  <div class="col">
                  <button class="rounded bg-secondary" >
                  <i class="fa fa-solid fa-arrow-right " onclick="writerDetails('${data._id}')" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#exampleModal" ></i>
                  </button>
                  </div>
              </div>
          </div>
            </small>
            </div>

          </div>
        </div>
      </div>
    </div>
      `
        thumbnailDetails.appendChild(createDiv);
        spinnerLoad(false);
    }
    )
}

const writerDetails = (writerId) => {
    const url = `https://openapi.programming-hero.com/api/news/${writerId}`
    fetch(url)
        .then(res => res.json())
        .then(modalData => postModalOfWriter(modalData.data))

        .catch((error) => console.log(error));
}

const postModalOfWriter = (writerDetailModal) => {
    const modalId = document.getElementById('modal');
    modalId.textContent = '';
    writerDetailModal.forEach(modalData => {
        const { author, rating, details, thumbnail_url, total_view } = modalData;
        const { name, published_date } = author;
        const createModalDiv = document.createElement('div');
        createModalDiv.classList.add('modal-content');
        createModalDiv.classList.add('text-center');
        createModalDiv.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Details of Writer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <img src="${thumbnail_url ? thumbnail_url : 'No Data Found'}" alt="">
          <p>Author Name: ${name ? name : 'No data Found'}</p>
          <p>Published date: ${published_date ? published_date : 'No Data Found'}</p>
          <p>Details:${details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
          <p> Rating: ${rating.number}</p>
          <p>Total View:${total_view}</p>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        
            `
        modalId.appendChild(createModalDiv);
    })
}

writerDetails();
allCategories();
thumbnailDetails('08');