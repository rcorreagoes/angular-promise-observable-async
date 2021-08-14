import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('btnObservable', { static: true }) btnObservable!: ElementRef;

  ngOnInit() {

  }
  
  ngAfterViewInit() {
    this.testeObservable();
  }

  setText(text: string){
    let texto = document.getElementById("texto")
    texto!.innerHTML = text
  }

  checkAuthObservable(): Observable<any> {
      this.setText('Fazendo autenticação...')
      return new Observable(observer =>{
        setTimeout(() => {
          observer.next(true)
        }, 2000)
      })
  }

  checkAuthPromise(): any {
    return new Promise((resolve, reject) => {
      this.setText('Fazendo autenticação...')
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  }

  fetchUserObservable(): any {
    return new Observable((observer) => {
      this.setText('Carregando usuário...')
      setTimeout(() => {
        observer.next({ ok: "Bem-vindo!" })
      }, 2000)
    });
  }

  fetchUserPromise(): any {
    return new Promise((resolve, reject) => {
      this.setText('Carregando usuário...')
      setTimeout(() => {
        resolve({ ok: "Bem-vindo!" })
      }, 2000)
    });
  }

  async testeAsync(){
    const isAuth = await this.checkAuthPromise()
    let result = null;
    if (isAuth) {
      result = await this.fetchUserPromise()
    }
    this.setText(result.ok)
  }

  testeObservable(){     
    let clique = fromEvent(this.btnObservable.nativeElement, 'click').pipe(
    switchMap((event:any) => this.checkAuthObservable()),
    switchMap((isAuth:any) => {
      if (isAuth) {
        return this.fetchUserObservable()
      }
    }))
    .subscribe((result:any) => {
      this.setText(result.ok)
    })    
  }

  testePromise(){
    this.checkAuthPromise()
    .then((val: any) => {
      if(val){
        return this.fetchUserPromise()
      }
    })
    .then((result:any) => {
        this.setText(result.ok)
      }
    )
  }
}