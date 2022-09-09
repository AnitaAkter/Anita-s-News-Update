// Categories code.......///
const allCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(response => response.json())
        .then(data => categoryList(data.data.news_category))
}

const categoryList = (lists) => {
    const allCategories = document.getElementById('category');
    lists.forEach(list => {
        const { category_name, category_id } = list;
        const createLi = document.createElement('li');
        createLi.innerHTML = `
          <li class="bg-secondary  px-3 py-3 me-3 rounded">
          <a class="active text-white  fs-5 text" aria-current="page" onclick="thumbnailDetails('${category_id}')" href="#" style="text-decoration:none">${category_name}</a>
          </li>
          `
        allCategories.appendChild(createLi);
    }
    )
}




allCategories();
