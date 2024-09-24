import {ChangeDetectorRef, Component} from '@angular/core';
import {Task} from "../../models/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent{
    title: String = "Things to do";
    newTaskForm: FormGroup<{newTask :FormControl<string | null>}> = new FormGroup({
        newTask: new FormControl<string | null>("")
    })

    private allTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([
        {id: 1, label: "Task 1", completed: false},
        {id: 2, label: "Task 2", completed: false},
        {id: 3, label: "Task 3", completed: false},
        {id: 4, label: "Task 4", completed: false},
    ]);
    lastId :number = this.allTasks$.value.length +1;
    public tasks: Observable<Task[]> = this.allTasks$.asObservable();

    ngOnInit(){
        this.sortList()
    }
    toggleCompletion(id: number) {
        const updatedTasks = this.allTasks$.value.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        this.allTasks$.next(updatedTasks);

        this.sortList();
    }

    sortList(): void {
        const sortedTasks = [...this.allTasks$.value].sort((a, b) => {
            if (!a.completed && b.completed) return -1;
            if (a.completed && !b.completed) return 1;
            return 0;
        });

        this.allTasks$.next(sortedTasks);
    }

    addTask():void {
        if (this.newTaskForm.value.newTask !== null && this.newTaskForm.value.newTask!.trim() !== "") {
            let newTask: Task= {
                id: this.lastId,
                label: this.newTaskForm.value.newTask!,
                completed: false
            }

            let updatedTasks: Task[] = [...this.allTasks$.value, newTask];
            this.allTasks$.next(updatedTasks);
            this.newTaskForm.get("newTask")?.setValue("");
            this.lastId++
        }

    }

    deleteTask(id: number) {
        this.allTasks$.next(this.allTasks$.value.filter(task => task.id !== id))
    }
}
