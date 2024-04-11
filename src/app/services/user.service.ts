import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) { }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url)
    console.log(this.url);
  }
  addUser(user: User):Observable<User[]>{
    return this.http.post<User[]>(this.url,user)
  }
  deleteUser(id: number):Observable<User[]>{
    return this.http.delete<User[]>(`${this.url}/${id}`)
  }
  updateUser(user: User):Observable<User[]>{
    const updateUrl = `${this.url}/${user.id}`
    return this.http.put<User[]>(updateUrl,user)
  }
}