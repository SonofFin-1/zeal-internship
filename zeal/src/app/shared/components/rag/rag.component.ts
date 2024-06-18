
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, NgIf, NgFor, NgClass } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rag',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    DecimalPipe,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './rag.component.html',
  styleUrls: ['./rag.component.css']
})
export class RagComponent {
  query: string = '';
  results_with_context: string[] = [];
  results_without_context: string[] = [];
  buttonClicked: boolean = false;
  queryActive: boolean = false;
  similar_vectors: string = '';
  response_len: string = '';
  temp: string = '';
  perspective: string = '';

  constructor(private http: HttpClient) {}

  sendQuery() {
    this.queryActive = true;
    const payload = {
      query: this.query,
      similar_vectors: this.similar_vectors,
      response_len: this.response_len,
      temp: this.temp,
      perspective: this.perspective
    };
    this.buttonClicked = true;
    this.http.post<any>('http://localhost:8000/query', payload)
      .subscribe(
        response => {
          console.log(this.query);
          this.results_with_context = response.results[0];
          this.results_without_context = response.results[1];
          console.log(this.results_with_context);
          console.log(this.results_without_context);
          this.queryActive = false;
        },
        error => {
          console.log(this.query);
          console.error('Error:', error);
          // Handle the error appropriately (e.g., display an error message to the user)
        }
      );
  }
}
