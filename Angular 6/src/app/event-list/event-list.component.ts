import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  alleventList: any;
  eventKeySearch :any="";
  localStorage: any;
  constructor(
    private UserService : UserService,
    private router: Router) {
      this.localStorage=window.localStorage.getItem('token');
     }

  ngOnInit() {
    
this.getAllevent(this.eventKeySearch);
  }
  onKeydown(event){
    console.log('keydown',event.target.value);

  }

  search(keyword) {
    this.eventKeySearch="";
    if(keyword.target.value !="" && keyword.target.value.length !=0){
      this.eventKeySearch = keyword.target.value;
      this.getAllevent(this.eventKeySearch);
    }else{
      this.getAllevent(this.eventKeySearch);
    }

  }
  
  getAllevent(data){
    var searchData={
      searchData : data
    }
      this.UserService.getevent(searchData).subscribe((resp:any)=>{
        if(resp.status == 200){
          this.alleventList= resp.saveData;
          // console.log(' this.alleventList=', this.alleventList);
        }else{
          console.log('data not found');
        }
      })
    
  }

  onLogout() {
    this.UserService.deleteToken();
    this.router.navigate(['/eventList']);
  }

}
