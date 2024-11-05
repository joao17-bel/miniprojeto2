class DataEntry {
    constructor(name) {
        this.name = name;
    }
}

class DataManager {
    constructor() {
        this.data = [];
    }

    addData(name) {
        const newData = new DataEntry(name);
        this.data.push(newData);
    }

    editData(index, newName) {
        this.data[index].name = newName;
    }

    deleteData(index) {
        this.data.splice(index, 1);
    }

    getData() {
        return this.data;
    }
}

const dataManager = new DataManager();
const form = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();

    if (name) {
        dataManager.addData(name);
        nameInput.value = '';
        renderList();
    }
});

function renderList() {
    dataList.innerHTML = '';
    dataManager.getData().forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${entry.name} 
            <button class="edit" onclick="editData(${index})">Editar</button>
            <button class="delete" onclick="deleteData(${index})">Deletar</button>
        `;
        dataList.appendChild(li);
    });
}

function editData(index) {
    const newName = prompt('Digite o novo nome:', dataManager.getData()[index].name);
    if (newName) {
        dataManager.editData(index, newName);
        renderList();
    }
}

function deleteData(index) {
    if (confirm('Tem certeza que deseja deletar?')) {
        dataManager.deleteData(index);
        renderList();
    }
}