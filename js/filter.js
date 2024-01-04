const filterButtons = document.querySelectorAll('button.btn')
const articleTag = Array.from(document.querySelectorAll('section.filterable-s'));
const filterBtn = document.querySelector('p.nav-p');
const filterTag = document.querySelector('nav.nav-filter');

// filter button
filterBtn.addEventListener('click', () => {
    filterTag.classList.toggle('active');
    if (filterTag.classList.contains('active')) {
        filterBtn.textContent = 'Close Filter';
    } else {
        filterBtn.textContent = 'Filter';
    }
});

function changeFilterBtnColor() {
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((btn) => {
                btn.classList.remove('active')
            })
            btn.classList.add('active')
        })
    })
}

function applyFilter() {
    filterButtons.forEach((btn, btnIndex) => {
        btn.addEventListener('click', () => {
            if (btnIndex === 0) {
                resetFilter(articleTag)
            } else if (btnIndex > filterButtons.length) {
                return
            } else {
                articleTag.forEach((item) => {
                    setDisplayBlock(item)
                })
                filterValues(articleTag, btn)
            }
        })
    })
}

function resetFilter(itemArr) {
    itemArr.forEach((item) => {
        setDisplayBlock(item)
    })
}

function filterValues(itemArr, btnData) {
    let attributeArray = []
    let btnAttribute = btnData.getAttribute('data-filter');
    for (let index = 0; index <= itemArr.length - 1; index++) {
        attributeArray.push(itemArr[index].getAttribute('data-filter'))
    }
    const result = attributeArray.filter((value) => {
        return value.trim().includes(btnAttribute)
    })
    articleTag.forEach((item) => {
        let itemAttribute = item.getAttribute('data-filter');
        if (result.includes(itemAttribute) && result.length >= 1) {
            setDisplayBlock(item)
        } else {
            setDisplayNone(item)
        }
    })
}

function setDisplayBlock(item) {
    item.style.display = 'block'
}

function setDisplayNone(item) {
    item.style.display = 'none'
}

// run on load
changeFilterBtnColor()
applyFilter()