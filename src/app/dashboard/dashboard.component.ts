import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  foodsList: Food[] = [];

  foodObj: Food = {
    id: '',
    food_name: '',
    calories: '',
    cantity: '',
    units: '',
    carbs: '',
    fat: '',
    fiber: '',
    protein: '',
    sugar: ''
  };
  id: string = '';
  food_name: string = '';
  calories: string = '';
  cantity: string = '';
  units: string = '';
  carbs: string = '';
  fat: string = '';
  fiber: string = '';
  protein: string = '';
  sugar: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllFoods();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllFoods() {

    this.data.getAllFoods().subscribe(res => {

      this.foodsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching foods data.');
    })

  }

  resetForm() {
    this.id = '';
    this.food_name = '';
    this.calories = '';
    this.cantity = '';
    this.units = '';
    this.carbs = '';
    this.fat = '';
    this.fiber = '';
    this.protein = '';
    this.sugar = '';
  }

  addFood() {
    if (this.food_name == '' ||  this.calories == '' || this.cantity == '' || this.units == '' || this.carbs == '' || this.fat == '' || this.fiber == '' || this.protein == '' || this.sugar == '' ) {
      alert('Fill all input fields.');
      return;
    }

      this.foodObj.id = '';
      this.foodObj.food_name = this.food_name;
      this.foodObj.calories = this.calories;
      this.foodObj.cantity = this.cantity;
      this.foodObj.units = this.units;
      this.foodObj.carbs = this.carbs;
      this.foodObj.fat = this.fat;
      this.foodObj.fiber = this.fiber;
      this.foodObj.protein = this.protein;
      this.foodObj.sugar = this.sugar;

      this.data.addFood(this.foodObj);
      this.resetForm();

  }

  updateFood(food: Food) {
    if (this.food_name == '' ||  this.calories == '' || this.cantity == '' || this.units == '' || this.carbs == '' || this.fat == '' || this.fiber == '' || this.protein == '' || this.sugar == '' ) {
      alert('Fill all input fields.');
      return;
    }
      this.data.deleteFood(food);

      this.foodObj.id = '';
      this.foodObj.food_name = this.food_name;
      this.foodObj.calories = this.calories;
      this.foodObj.cantity = this.cantity;
      this.foodObj.units = this.units;
      this.foodObj.carbs = this.carbs;
      this.foodObj.fat = this.fat;
      this.foodObj.fiber = this.fiber;
      this.foodObj.protein = this.protein;
      this.foodObj.sugar = this.sugar;

      this.data.addFood(this.foodObj);
      this.resetForm();
  }

  deleteFood(food: Food) {
    if (window.confirm('Are you sure you want to delete ' + food.food_name + ' ?')) {
      this.data.deleteFood(food);
    }
  }

}
