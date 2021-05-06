import { Component, OnInit, ViewChild } from '@angular/core';
import { DesafioService } from 'src/app/services/desafio.service';
import { Post } from 'src/app/post/post';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Album } from 'src/app/album/album';
import { Todos } from 'src/app/todos/todos';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Postagens
  posts: Post[] = [];
  idCountPosts: number = 101;
  displayedColumnsPost: string[] = ['id', 'title', 'body', 'opt'];
  dataSourcePosts = new MatTableDataSource<Post>();
  addPost = new FormGroup({
    title: new FormControl(),
    body: new FormControl()
  });

  // Albuns
  albuns: Album[] = [];
  idCountAlbuns: number = 101;
  displayedColumnsAlbum: string[] = ['id', 'title', 'opt'];
  dataSourceAlbuns = new MatTableDataSource<Album>();
  addAlbum = new FormGroup({
    title: new FormControl()
  });

  // To-Do's
  todos: Todos[] = [];
  idCountTodos: number = 201;
  displayedColumnsTodo: string[] = ['id', 'title', 'completed', 'opt'];
  dataSourceTodos = new MatTableDataSource<Todos>();
  addTodo = new FormGroup({
    title: new FormControl(),
    completed: new FormControl()
  });

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public desafioService: DesafioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrievePosts();
    this.retrieveAlbuns();
    this.retrieveTodos();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // Postagens

  retrievePosts() {
    this.desafioService.getAllPosts().subscribe((data: Post[]) => {
      this.posts = data;
      this.dataSourcePosts = new MatTableDataSource<Post>(this.posts);
      this.dataSourcePosts.paginator = this.paginator;
      console.log(this.posts);
    });
  }

  submitPost() {
    console.log(this.addPost.value);
    this.desafioService.createPost(this.addPost.value).subscribe(res => {
      this.addPost.value.id = this.idCountPosts;
      this.idCountPosts++;

      this.posts.unshift(this.addPost.value);

      this.dataSourcePosts = new MatTableDataSource<Post>(this.posts);
      this.dataSourcePosts.paginator = this.paginator;
      this.openSnackBar("Postagem criada com sucesso!", "X");
      console.log('Postagem criada com sucesso!');
      this.addPost = new FormGroup({
        title: new FormControl(),
        body: new FormControl()
      });
    });
  }

  deletePost(id) {
    this.desafioService.deletePost(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      this.dataSourcePosts = new MatTableDataSource<Post>(this.posts);
      this.dataSourcePosts.paginator = this.paginator;

      this.openSnackBar("Postagem excluida com sucesso!", "X");
      console.log('Postagem excluida com sucesso!');
    });
  }


  // Albuns

  retrieveAlbuns() {
    this.desafioService.getAllAlbuns().subscribe((data: Album[]) => {
      this.albuns = data;
      this.dataSourceAlbuns = new MatTableDataSource<Album>(this.albuns);
      this.dataSourceAlbuns.paginator = this.paginator;
      console.log(this.albuns);
    });
  }

  submitAlbum() {
    console.log(this.addAlbum.value);
    this.desafioService.createAlbum(this.addAlbum.value).subscribe(res => {
      this.addAlbum.value.id = this.idCountAlbuns;
      this.idCountAlbuns++;

      this.albuns.unshift(this.addAlbum.value);

      this.dataSourceAlbuns = new MatTableDataSource<Album>(this.albuns);
      this.dataSourceAlbuns.paginator = this.paginator;
      this.openSnackBar("Album criado com sucesso!", "X");
      console.log('Album criado com sucesso!');
      this.addAlbum = new FormGroup({
        title: new FormControl(),
        body: new FormControl()
      });
    });
  }

  deleteAlbum(id) {
    this.desafioService.deleteAlbum(id).subscribe(res => {
      this.albuns = this.albuns.filter(item => item.id !== id);
      this.dataSourceAlbuns = new MatTableDataSource<Album>(this.albuns);
      this.dataSourceAlbuns.paginator = this.paginator;

      this.openSnackBar("Album excluido com sucesso!", "X");
      console.log('Album excluido com sucesso!');
    });
  }


  // To-Do's

  retrieveTodos() {
    this.desafioService.getAllTodos().subscribe((data: Todos[]) => {
      this.todos = data;
      this.dataSourceTodos = new MatTableDataSource<Todos>(this.todos);
      this.dataSourceTodos.paginator = this.paginator;
      console.log(this.todos);
    });
  }

  submitTodo() {
    console.log(this.addTodo.value);
    this.desafioService.createTodo(this.addTodo.value).subscribe(res => {
      this.addTodo.value.id = this.idCountTodos;
      this.idCountTodos++;

      this.todos.unshift(this.addTodo.value);

      this.dataSourceTodos = new MatTableDataSource<Todos>(this.todos);
      this.dataSourceTodos.paginator = this.paginator;
      this.openSnackBar("To-Do criada com sucesso!", "X");
      console.log('To-Do criada com sucesso!');
      this.addTodo = new FormGroup({
        title: new FormControl(),
        completed: new FormControl()
      });
    });
  }

  deleteTodo(id) {
    this.desafioService.deleteTodo(id).subscribe(res => {
      this.todos = this.todos.filter(item => item.id !== id);
      this.dataSourceTodos = new MatTableDataSource<Todos>(this.todos);
      this.dataSourceTodos.paginator = this.paginator;

      this.openSnackBar("To-Do excluida com sucesso!", "X");
      console.log('To-Do excluida com sucesso!');
    });
  }


}
