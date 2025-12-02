import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-2">EatMap 首頁</h1>
    <p class="text-sm text-gray-600">
      之後這裡會顯示「已吃過 / 想去吃」的店家列表。
    </p>
  `,
})
export class HomeComponent {}
