<script lang="ts">
    import { id, init, tx } from "@instantdb/core";
    import { onMount } from "svelte";
  
    const APP_ID = "84f087af-f6a5-4a5f-acbc-bc4008e3a725";
  
    interface Todo {
      id: string;
      text: string;
      done: boolean;
      createdAt: number;
    }
  
    type Schema = {
      todos: Todo;
    };
  
    let todos = $state<Todo[]>([]);
    let newTodoText = $state("");
    let error = $state("");
  
    // Initialize the database
    const db = init<Schema>({ appId: APP_ID });
  
    onMount(() => {
      // Subscribe to data
      db.subscribeQuery({ todos: {} }, (resp) => {
        if (resp.error) {
          error = resp.error.message;
          return;
        }
        if (resp.data) {
          todos = resp.data.todos;
        }
      });
    });
  
    function addTodo(event: Event) {
      event.preventDefault();
  
      if (newTodoText.trim()) {
        db.transact(
          tx.todos[id()].update({
            text: newTodoText,
            done: false,
            createdAt: Date.now(),
          }),
        );
        newTodoText = "";
      }
    }
  
    function deleteTodo(todo: Todo) {
      db.transact(tx.todos[todo.id].delete());
    }
  
    function toggleDone(todo: Todo) {
      db.transact(tx.todos[todo.id].update({ done: !todo.done }));
    }
  
    function deleteCompleted() {
      const completed = todos.filter((todo) => todo.done);
      const txs = completed.map((todo) => tx.todos[todo.id].delete());
      db.transact(txs);
    }
  
    function toggleAllTodos() {
      const newVal = !todos.every((todo) => todo.done);
      db.transact(todos.map((todo) => tx.todos[todo.id].update({ done: newVal })));
    }
  </script>
  
  <div class="container">
    {#if error}
      <div class="error">{error}</div>
    {:else}
      <div class="form">
        <div role="button" tabindex="0" class="toggle-all" onclick={toggleAllTodos}>⌄</div>
        <form onsubmit={addTodo}>
          <input
            bind:value={newTodoText}
            style="width: 100%"
            placeholder="What needs to be done?"
            type="text"
            autofocus
          />
        </form>
      </div>
  
      <div class="todo-list">
        {#each todos as todo}
          <div class="todo">
            <input
              type="checkbox"
              checked={todo.done}
              onchange={() => toggleDone(todo)}
            />
            <div class="todo-text" class:done={todo.done}>
              {todo.text}
            </div>
            <span role="button" tabindex="0" class="delete" onclick={() => deleteTodo(todo)}>𝘟</span>
          </div>
        {/each}
      </div>
  
      <div class="action-bar">
        <div>Remaining todos: {todos.filter(t => !t.done).length}</div>
        <a role="button" tabindex="0" class="delete-completed" onclick={deleteCompleted}>Delete Completed</a>
      </div>
    {/if}
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      transition: background-color 0.3s ease;
    }
  
    .container {
      box-sizing: border-box;
      font-family: code, monospace;
      min-height: 100vh;
      display: flex;
      justify-content: flex-start; /* Align items to the top */
      align-items: center;
      flex-direction: column;
      padding: 20px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  
    .form {
      box-sizing: border-box;
      display: flex;
      border: 1px solid #d3d3d3;
      border-bottom-width: 0px;
      width: 350px;
    }
  
    .toggle-all {
      font-size: 30px;
      cursor: pointer;
      padding: 5px 11px;
      line-height: 0.5;
    }
  
    form {
      flex-grow: 1;
    }
  
    input {
      background-color: transparent;
      font-family: code, monospace;
      padding: 10px;
      border: none;
      outline: none;
      box-sizing: border-box;
      color: inherit;
    }
  
    input::placeholder {
      font-style: italic;
    }
  
    .todo-list {
      box-sizing: border-box;
      width: 350px;
    }
  
    .todo {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #d3d3d3;
      border-bottom-width: 0px;
    }
  
    .todo:last-child {
      border-bottom-width: 1px;
    }
  
    .todo input[type="checkbox"] {
      margin: 0 15px 0 5px;
      cursor: pointer;
    }
  
    .todo-text {
      flex-grow: 1;
      overflow: hidden;
      word-break: break-word;
    }
  
    .todo-text.done {
      text-decoration: line-through;
      color: #888;
    }
  
    .delete {
      width: 25px;
      cursor: pointer;
      color: #d3d3d3;
      text-align: center;
    }
  
    .action-bar {
      display: flex;
      justify-content: space-between;
      width: 350px;
      padding: 10px;
      border: 1px solid #d3d3d3;
      font-size: 10px;
      box-sizing: border-box;
    }
  
    .delete-completed {
      cursor: pointer;
    }
  
    .error {
      color: #ff6b6b;
      margin-bottom: 10px;
    }
  </style>