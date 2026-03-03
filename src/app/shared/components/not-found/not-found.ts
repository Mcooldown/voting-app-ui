import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found.</p>
      <a routerLink="/" class="btn btn--primary">Go Home</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      gap: 1rem;
      text-align: center;

      h1 { font-size: 5rem; font-weight: 800; color: var(--color-primary); margin: 0; }
      p  { color: var(--color-text-secondary); font-size: 1.1rem; }
    }
  `],
})
export class NotFoundComponent {}
