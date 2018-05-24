import axios from 'axios';

const todoAPI = axios.create({
  baseURL: process.env.API_URL
});

const rootEl = document.querySelector('.root');

const templates = {
  todoList: document.querySelector('#todo-list').content,
}

async function indexPage() {
  const res = await todoAPI.get('/todos');
  const listFragment = document.importNode(templates.todoList, true);
    
  rootEl.appendChild(listFragment);
}

indexPage();