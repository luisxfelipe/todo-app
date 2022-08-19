import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = []
  public title: string = 'Minhas tarefas'
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.load()
  }

  add () {
    const title = this.form.controls['title'].value
    const id = this.todos.length + 1
    this.todos.push(new Todo (id, title, false))
    this.save()
    this.clear()
    this.changeMode('list')
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)

    if (index !== -1) {
      this.todos.splice(index, 1)
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true
    this.save()
  }

  markAsUndone(todo: Todo) {
    todo.done = false
    this.save()
  }

  save() {
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data)
    this.mode = 'list'
    this.form.reset()
  }

  load() {
    const data = localStorage.getItem('todos')
    if (data) {
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }
  }

  changeMode(mode: string) {
    this.mode = mode

    if (mode === 'list') {
      this.clear()
    }
  }
}
