import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  template: `
    <h1 class="text-xl font-bold mb-2">頁面不存在</h1>
    <p class="text-sm text-gray-600">
      抱歉，這個路徑沒有對應的頁面。
    </p>
    <a
      routerLink="/"
      class="text-blue-600 underline text-sm mt-2 inline-block"
    >
      回到首頁
    </a>
  `,
})
export class NotFoundComponent {}
