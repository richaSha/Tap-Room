import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div *ngIf="!type" >
        <button class="btn btn-info" (click)="showMenu('Employee')">Enter As a Employee</button>
        <button class="btn btn-info" (click)="showMenu('Patron')">Enter As a Patron</button>
      </div>
      <div *ngIf="type">
        <h1>{{title}}</h1>
        <div class="menu">
          <div class='menuTitle'>
            <span *ngIf="editMode">
              Select
            </span>
            <span class='type'>Type</span>
            <span class='brand'>Brand</span>
            <span class='alcohal'> Alcohal</span>
            <span class='price'>Price</span>
            <span class='price'>Pints</span>
          </div>
          <div *ngFor='let keg of kegMenu'>
            <div [class]="colorCoding(keg)">
              <span *ngIf="editMode"><p (click)="editInfo(keg)" [class]="checkboxBackground(keg)"></p></span>
              <span class='type'>{{keg.name}}</span>
              <span class='brand'>{{keg.brand}}</span>
              <span class='alcohal'>{{keg.alcohalContent}} %</span>
              <span class='price'>$ {{keg.price}} </span>
              <span class='price'>{{keg.pints}} <p class="pints"></p>
                <i *ngIf="type === 'Employee'" (click)="reducePintByone(keg)" class="glyphicon glyphicon-minus btn btn-danger btn-xs"></i>
              </span>
            </div>
          </div>
        </div>
        <div *ngIf='selectedInfo'>
          <h2> Edit Info </h2>
          <div class="form-group">
            <label>Enter Type:</label>
            <input type="text" [(ngModel)]="selectedInfo.name" [value]="selectedInfo.name">
          </div>
          <div class="form-group">
            <label>Enter Brand:</label>
            <input type="text" [(ngModel)]="selectedInfo.brand" [value]="selectedInfo.Brand">
          </div>
          <div class="form-group">
            <label>Enter Alcohal Percentage:</label>
            <input type="number" [(ngModel)]="selectedInfo.alcohalContent" [value]="selectedInfo.Alcohal">
          </div>
          <div class="form-group">
            <label>Enter Price in Dollars:</label>
            <input type="number" [(ngModel)]="selectedInfo.price" [value]="selectedInfo.price">
          </div>
          <div class="form-group">
            <label>Enter Available Pints:</label>
            <input type="number" [(ngModel)]="selectedInfo.pints" [value]="selectedInfo.pints">
          </div>
          <input type="button" class="btn btn-success" value="Edit" (click)="finishedEditing()"/>
        </div>
        <div *ngIf="type =='Employee'">
          <input type="button" class="btn btn-success" value="Edit Menu" (click)="startEditing()" *ngIf="!editMode"/>
          <input type="button" class="btn btn-success" value="Add New Item" (click)="addNewItem()" *ngIf="!editMode"/>

        </div>
        <button class="btn btn-info" (click)="goHome()">Home</button>
      </div>
    </div>
  `
})
export class AppComponent{
  type:string =null;
  title: string = 'Kegs Menu';
  kegMenu =KEGS;
  selectedInfo:Kegs = null;
  editMode: boolean =false;
  editInfo(selectedKegs: Kegs){
    this.selectedInfo = selectedKegs;
  }
  checkboxBackground(selectedKegs: Kegs){
    if(this.selectedInfo == selectedKegs){
      return 'checked';
    }else{
      return 'unChecked';
    }
  }
  finishedEditing(){
    this.selectedInfo = null;
    this.editMode = false;
  }
  startEditing(){
    this.editMode = true;
  }
  addNewItem(){

  }
  showMenu(name:string){
    this.type = name;
    console.log(this.type)
  }
  reducePintByone(keg: Kegs){
    keg.pints -= 1;
  }
  colorCoding(keg: Kegs){
    if(this.type == "Employee"){
      if(keg.pints < 10){
        return 'bg-danger';
      }else if(keg.pints < 20){
        return 'bg-warning';
      }else{
        return 'bg-info';
      }
    }else{
      if(keg.price > 10){
        return 'bg-danger';
      }else if(keg.price > 5){
        return 'bg-warning';
      }else{
        return 'bg-info';
      }
    }
  }
  goHome(){
    this.type = null;
  }
}
export class Kegs{
  public pints: number = 124;
  constructor(public name: string, public brand: string, public price: number, public alcohalContent:number){}
}
const KEGS: Kegs[] =[
   new Kegs('Bear','Guinness', 5,4.1),
   new Kegs('Bear','Orangeboom', 8,4.1),
   new Kegs('Bear','Hoegaarden', 11,4.1),
   new Kegs('Bear','Asahi Super Dry', 8,4.1),
   new Kegs('Bear','Tsingtao', 3,4.1),
   new Kegs('Bear','Estrella Damm Barcelona', 9,4.1),
   new Kegs('Bear','Peroni Nastro Azzurro', 13,4.1)
 ]
