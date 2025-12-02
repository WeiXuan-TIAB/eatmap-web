import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-place-detail',
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-2">店家詳細頁</h1>
    <p class="text-sm text-gray-600">
      之後這裡會顯示店家資訊、嵌入地圖、評分、照片
      或推薦來源連結，以及標籤與分類（已吃過 / 想去）。
    </p>
  `,
})
export class PlaceDetailComponent {}
