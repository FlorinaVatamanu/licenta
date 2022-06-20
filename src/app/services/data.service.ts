import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add food
  addFood(food : Food) {
    food.id = this.afs.createId();
    return this.afs.collection('/food').add(food);
  }

  // get all foods
  getAllFoods() {
    return this.afs.collection('/food').snapshotChanges();
  }

  // delete food
  deleteFood(food : Food) {
     this.afs.doc('/food/'+ food.id).delete();
  }

  // update food
  updateFood(food : Food) {
    this.deleteFood(food);
    this.addFood(food);
  }

}
