import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-place-form',
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-2">新增店家</h1>
    <p class="text-sm text-gray-600 mb-4">
      之後會在這裡貼上 Google Maps 網址，選擇「已吃過 / 想去吃」，填寫評分、
      評語、推薦品項或推薦來源連結，並幫店家加上固定標籤。
    </p>
  `,
})
export class PlaceFormComponent {}
