import axios from 'axios';

const todoAPI = axios.create({
  baseURL: process.env.API_URL
});

const rootEl = document.querySelector('.root');

const templates = {
  todoList: document.querySelector('#todo-list').content,
  todoItem: document.querySelector('#todo-item').content,
}

function render(fragment) {
  rootEl.textContent = '';
  rootEl.appendChild(fragment);
}

async function indexPage() {
  const res = await todoAPI.get('/todos');
  const listFragment = document.importNode(templates.todoList, true);

  listFragment.querySelector('.todo-list__form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      body: e.target.elements.body.value
    }
    const res = await todoAPI.post(`/todos`, payload)
    indexPage();
  })

  res.data.forEach(todo => {
    const itemFragment = document.importNode(templates.todoItem, true);
    itemFragment.querySelector('.todo-item__body').textContent = todo.body;
    listFragment.appendChild(itemFragment);
  })

  render(listFragment);
}

indexPage();