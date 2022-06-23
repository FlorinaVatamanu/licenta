import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food';
import { User } from '../model/user';
import { Breakfast } from '../model/breakfast';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  foodsList: Food[] = [];
  breakfastList: Breakfast[] = [];

  p:number = 1;
  active_user: string = '';
  servings: string='';

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

  breakfastObj: Breakfast = {
    idB: '',
    email: '',
    day: '',
    food_nameB: '',
    caloriesB: '',
    cantityB: '',
    unitsB: '',
    carbsB: '',
    fatB: '',
    fiberB: '',
    proteinB: '',
    sugarB: '',
    totalCarbsB: '',
    totalFatsB: '',
    totalProteinB: '',
    totalFiberB: '',
    totalSugarB: '',
    totalCalsBreakfast: ''
  };

   idB: string = '';
   email: string = '';
   day: string = '';
   food_nameB: string = '';
   caloriesB: string = '';
   cantityB: string = '';
   unitsB: string = '';
   carbsB: string = '';
   fatB: string = '';
   fiberB: string = '';
   proteinB: string = '';
   sugarB: string = '';
   totalCarbsB: string = '';
   totalFatsB: string = '';
   totalProteinB: string = '';
   totalFiberB: string = '';
   totalSugarB: string = '';
   totalCalsBreakfast: string = '';



  constructor(private auth: AuthService, private data: DataService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getAllFoods();
    this.showEmail();
    this.getAllBreakfasts();
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

  getAllBreakfasts() {

    this.data.getAllBreakfasts().subscribe(res => {

      this.breakfastList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching breakfast data.');
    })

  }

  Search() {
    if(this.food_name == ""){
      this.ngOnInit();
    }else{
      this.foodsList = this.foodsList.filter(res =>{
        return res.food_name.toLocaleLowerCase().match(this.food_name.toLocaleLowerCase());
      });
    }
  }

  key:string = 'calories';
  reverse:boolean = false;
  sort(key) {
    this.key =  key;
    this.reverse = !this.reverse;
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

  isLoggedIn() {
      return this.afAuth.authState.pipe(first()).toPromise();
  }

  async showEmail() {
       const user =await  this.isLoggedIn()
       if (user) {
          this.active_user=user.email;

        //console.log(user.email);
       } else {
         // do something else
      }
  }

  totalCalsB: number = 0;
  caloriesPortion: number = 0;
  caloriesFinal: number = 0;

  totalC: number = 0;
  carbsFinal: number = 0;

  totalP: number = 0;
  proteinsFinal: number = 0;

  totalG: number = 0;
  fatsFinal: number = 0;

  totalS: number = 0;
  sugarsFinal: number = 0;

  totalF: number = 0;
  fibersFinal: number = 0;

  addBreakfast(food: Food) {

    if (this.day == '') {
      alert('Pick a date.');
      return;
    }else if (this.servings == ''){
      alert('Write number of servings.');
      return;
    }else{
          this.breakfastObj.idB = '';
          this.breakfastObj.email = this.active_user;
          this.breakfastObj.day = this.day;
          this.breakfastObj.food_nameB = food.food_name;

          this.caloriesPortion = (Number(food.calories) * Number(this.servings))/100;
          this.caloriesFinal = Math.round((this.caloriesPortion + Number.EPSILON) * 100) / 100;
          this.breakfastObj.caloriesB = this.caloriesFinal.toString(10);

          this.breakfastObj.cantityB = this.servings;
          this.breakfastObj.unitsB = food.units;

          this.carbsFinal = (Number(food.carbs) * Number(this.servings))/100;
          this.carbsFinal = Math.round((this.carbsFinal + Number.EPSILON) * 100) / 100;
          this.breakfastObj.carbsB = this.carbsFinal.toString(10);

          this.fatsFinal = (Number(food.fat) * Number(this.servings))/100;
          this.fatsFinal = Math.round((this.fatsFinal + Number.EPSILON) * 100) / 100;
          this.breakfastObj.fatB = this.fatsFinal.toString(10);

          this.fibersFinal = (Number(food.fiber) * Number(this.servings))/100;
          this.fibersFinal = Math.round((this.fibersFinal + Number.EPSILON) * 100) / 100;
          this.breakfastObj.fiberB = this.fibersFinal.toString(10);

          this.proteinsFinal = (Number(food.protein) * Number(this.servings))/100;
          this.proteinsFinal = Math.round((this.proteinsFinal + Number.EPSILON) * 100) / 100;
          this.breakfastObj.proteinB = this.proteinsFinal.toString(10);

          this.sugarsFinal = (Number(food.sugar) * Number(this.servings))/100;
          this.sugarsFinal = Math.round((this.sugarsFinal + Number.EPSILON) * 100) / 100;
          this.breakfastObj.sugarB = this.sugarsFinal.toString(10);

          this.totalC  = this.totalC + this.carbsFinal;
          this.breakfastObj.totalCarbsB = this.totalC.toString(10);

          this.totalP  = this.totalP + this.proteinsFinal;
          this.breakfastObj.totalProteinB = this.totalP.toString(10);

          this.totalG  = this.totalG + this.fatsFinal;
          this.breakfastObj.totalFatsB = this.totalG.toString(10);

          this.totalF  = this.totalF + this.fibersFinal;
          this.breakfastObj.totalFiberB = this.totalF.toString(10);

          this.totalS = this.totalS + this.sugarsFinal;
          this.breakfastObj.totalSugarB = this.totalS.toString(10);

          this.totalCalsB = this.totalCalsB + this.caloriesFinal;
          this.breakfastObj.totalCalsBreakfast = this.totalCalsB.toString(10);

          this.data.addBreakfast(this.breakfastObj);
    }
  }

  resetTotals() {
      this.totalC = 0;
      this.totalP = 0;
      this.totalG = 0;
      this.totalF = 0;
      this.totalS = 0;
      this.totalCalsB = 0;
  }

}
