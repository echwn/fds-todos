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
  const itemFragment = document.importNode(templates.todoItem, true);

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
    const bodyEl = itemFragment.querySelector('.todo-item__body');
    bodyEl.textContent = todo.body;
    const removeBtnEl = itemFragment.querySelector('.todo-item__remove-btn');
    const completeBtnEl = itemFragment.querySelector('.todo-item__complete-btn');
    itemFragment.querySelector('.todo-item__remove-btn').addEventListener('click', async e => {
      bodyEl.remove();
      removeBtnEl.remove();
      completeBtnEl.remove();
      const res = await todoAPI.delete(`/todos/${todo.id}`)
    })
    
   completeBtnEl.addEventListener('click', async e => {
      bodyEl.classList.add('todo-item__body--complete');
    })

    listFragment.appendChild(itemFragment);
  })

  render(listFragment);
}

indexPage();