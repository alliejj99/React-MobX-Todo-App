import { action, computed, makeObservable, observable } from "mobx";

interface TodoItem {
  // 배열에 할당할 객체 데이터들의 value 타입을 지정합니다.
  id: number;
  title: string;
  completed: boolean;
}

export default class TodoStore {
  // 값을 할당받을 초기 값, 배열 생성
  /*
   * todos : [{
   *  id: 0;
   *  title: '';
   *  completed: false;
   * }]
   */
  todos: TodoItem[] = [];

  constructor() {
    makeObservable({
      todos: observable, // 변하지않는 state
      addTodo: action, // action (함수)
      toggelTodo: action,
      status: computed, //
    });
  }

  addTodo(title: string) {
    // 일정을 추가하는 action함수입니다.
    // 처음에는 저장된 일정이 없으므로 0인 아이디를 +1합니다.
    // title 값은 e.target.value로 받아와서 그대로 받습니다.
    // 이제 막 등록한 일정으로 바로 해결한 일정이 아니기에 completed는 false입니다.
    const item: TodoItem = {
      id: getId(),
      title,
      completed: false,
    };
    this.todos.push(item);
  }

  toggelTodo(id: number) {
    // seter state에 저장된 배열의 데이터의 id값과 받아온 id의 값이 같다면
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      // 저장된 배열 todos에 index값을 찾지 못하여 -1을 반환하면 다음을 실행합니다.
      this.todos[index].completed = !this.todos[index].completed;
      // => 성공여부를 toggle합니다.
    }
  }

  get status() {
    let completed = 0,
      remaining = 0;
    this.todos.forEach((todo) => {
      if (todo.completed) {
        completed++;
      } else {
        remaining++;
      }
    });
    return { completed, remaining };
  }
}

let id = 0;
function getId() {
  return id++;
}
