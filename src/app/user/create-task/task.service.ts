import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksRef!: AngularFireList<Task>;
  private dbPath = 'tasks';

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.tasksRef = this.db.list(this.dbPath);
  }

  createUid() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  getUid() {
    return JSON.parse(localStorage.getItem('user')!).uid;
  }

  getAll() {
    return this.firestore.collection(this.dbPath, ref => ref.where('uid', '==',
      this.getUid())).get();
  }

  create(task: Task): any {
    return this.firestore.collection(this.dbPath).add(task);
  }

  update(id: string)  {
    const docRef = this.firestore.collection(this.dbPath, ref => ref.where('id', '==', id));
    let itemId: string;
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        itemId = a.payload.doc.id;
        this.firestore.collection(this.dbPath).doc(itemId).update({ status: true });
      });
    });
  }

  delete(id: string) {
    const docRef = this.firestore.collection(this.dbPath, ref => ref.where('id', '==', id));
    let itemId: string;
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        itemId = a.payload.doc.id;
        this.firestore.collection(this.dbPath).doc(itemId).delete();
      });
    });
  }
}
