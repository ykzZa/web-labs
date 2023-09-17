document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('myTable');
    const form = document.getElementById('myForm');
    const submitBtn = document.getElementById('submitBtn');


    function generateTable() {
        const tbody = table.querySelector('tbody');
        let cellCount = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 6; j++) {
                const cell = document.createElement('td');
                cell.textContent = cellCount;
                cellCount++;
                cell.addEventListener('mouseenter', setRandomColor);
                cell.addEventListener('click', setSelectedColor);
                cell.addEventListener('dblclick', setRowColor);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    }

    function setRandomColor(event) {
        const cell = event.target;
        cell.style.backgroundColor = generateRandomColor();
    }

    function generateRandomColor() {
        let color = '#' + Math.floor(Math.random()*16777215).toString(16);
        return color;
    }

    function setSelectedColor(event) {
        const cell = event.target;
        const colorInput = document.getElementById('color');
        cell.style.backgroundColor = colorInput.value;
    }

    function setRowColor(event) {
        const cell = event.target;
        const row = cell.parentNode;
        const cells = row.querySelectorAll('td');
        let cellId = parseInt(cell.textContent)
        while(cellId > 6) {
            cellId -= 6
        }
        for (let i = cellId - 1; i <= cells.length; i += 2) {
            cells[i].style.backgroundColor = cell.style.backgroundColor;
        }
    }

    submitBtn.addEventListener('click', function () {
        validateForm();
    });

    function validateForm() {
        const inputs = form.querySelectorAll('input');
        let valid = true;

        inputs.forEach(input => {
            const patternName = input.getAttribute('name');
            const pattern = patterns[patternName];
            const value = input.value;
            const regex = new RegExp(pattern);
            if (!regex.test(value)) {
                console.log(regex.test(value))
                valid = false;
                input.style.border = '2px solid red';
            } else {
                input.style.border = '';
                input.style.border = '2px solid green';
            }
        });

        if (valid) {
            displayFormData();
        }
    }

function displayFormData() {
    const formData = new FormData(form);
    const dataContainer = document.getElementById('dataContainer'); 
    dataContainer.innerHTML = '';
    for (const [key, value] of formData.entries()) {
        const dataItem = document.createElement('p');
        dataItem.textContent = `${key}: ${value}`;
        dataContainer.appendChild(dataItem);
    }
}

    const patterns = {
        name: /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє]+\s[A-Za-zА-Яа-яЁёҐґІіЇїЄє]\.[A-Za-zА-Яа-яЁёҐґІіЇїЄє]\./,
        group: /[A-Za-zА-Яа-яҐґІіЇїЄє]+\-(\d{2})$/,
        phone: /^\d{3}\-\d{3}\-\d{2}\-(\d{2})$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/,
        address: /^(с\.|м\.|c\.)\s[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s\-]+$/,
    };

    generateTable();
});
